import crypto from "crypto";
import { cookies } from "next/headers";
import ApplicantAccount from "../models/ApplicantAccount";

const COOKIE_NAME = "applicant_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

function getSecret() {
  return process.env.APPLICANT_AUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.ADMIN_PASSWORD || "digitalgeeks-applicant-session";
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!password || !storedHash || !storedHash.includes(":")) return false;
  const [salt, originalHash] = storedHash.split(":");
  const testHash = crypto.pbkdf2Sync(password, salt, 120000, 64, "sha512").toString("hex");
  return crypto.timingSafeEqual(Buffer.from(originalHash, "hex"), Buffer.from(testHash, "hex"));
}

export function createSessionToken(accountId) {
  const value = `${accountId}.${Date.now()}`;
  return `${value}.${sign(value)}`;
}

export function parseSessionToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const value = `${parts[0]}.${parts[1]}`;
  const expected = sign(value);
  if (expected.length !== parts[2].length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts[2]))) return null;
  return { accountId: parts[0] };
}

export async function setApplicantSession(accountId) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(accountId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearApplicantSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export async function getApplicantFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = parseSessionToken(token);
  if (!session?.accountId) return null;

  const account = await ApplicantAccount.findById(session.accountId).select("-passwordHash").lean();
  if (!account) return null;
  return {
    ...account,
    _id: account._id.toString(),
  };
}
