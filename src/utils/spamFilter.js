const VOWELS = /[aeiou]/gi;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const submissionsByIp = new Map();

function lettersOnly(value) {
  return String(value || "").toLowerCase().replace(/[^a-z]/g, "");
}

function vowelRatio(value) {
  const letters = lettersOnly(value);
  if (!letters.length) return 1;
  return (letters.match(VOWELS) || []).length / letters.length;
}

function looksLikeRandomToken(value) {
  const token = String(value || "").trim();
  if (!/^[A-Za-z]{10,48}$/.test(token)) return false;

  const isTitleCase = /^[A-Z][a-z]+$/.test(token);
  const isUniformCase = /^[A-Z]+$/.test(token) || /^[a-z]+$/.test(token);
  if (isTitleCase || isUniformCase) return vowelRatio(token) < 0.15;

  return /[a-z]/.test(token) && /[A-Z]/.test(token) && vowelRatio(token) < 0.38;
}

function looksLikeGeneratedName(value) {
  const name = String(value || "").trim();
  return /^[A-Za-z]{4,16}$/.test(name) && vowelRatio(name) < 0.2;
}

export function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(ip) {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    submissionsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return false;
}

export function classifyContactSubmission({ firstName, lastName, company, email, message, website }) {
  if (String(website || "").trim()) {
    return "spam";
  }

  const trimmedMessage = String(message || "").trim();
  if (looksLikeRandomToken(trimmedMessage)) {
    return "spam";
  }

  const words = trimmedMessage.split(/\s+/).filter(Boolean);
  const randomWordCount = words.filter(looksLikeRandomToken).length;
  if (words.length > 0 && randomWordCount / words.length >= 0.7 && trimmedMessage.length >= 12) {
    return "spam";
  }

  const generatedNames = looksLikeGeneratedName(firstName) && looksLikeGeneratedName(lastName);
  if (generatedNames && vowelRatio(`${firstName} ${lastName} ${company} ${trimmedMessage}`) < 0.22) {
    return "spam";
  }

  const localPart = String(email || "").split("@")[0] || "";
  const dottedNoise = localPart.split(".").length >= 4 && /\d/.test(localPart);
  if (dottedNoise && (generatedNames || looksLikeRandomToken(trimmedMessage))) {
    return "spam";
  }

  return "ok";
}

export function classifyInboundEmail({ from = "", subject = "", text = "", html = "" } = {}) {
  const fromValue = String(from).toLowerCase();
  const subjectValue = String(subject);
  const body = `${text || ""}\n${html || ""}`;

  const isDmarc =
    /dmarc/i.test(subjectValue) ||
    /aggregate report/i.test(subjectValue) ||
    fromValue.includes("dmarc") ||
    fromValue.includes("postmaster@amazonses.com") ||
    fromValue.includes("noreply-dmarc") ||
    /<feedback-report type="dmarc"|dmarc_aggregate|rua=mailto:/i.test(body);

  if (isDmarc) return "dmarc";

  const inquiryMatch = body.match(/Message:\s*([^\n<]+)/i);
  const inquiryMessage = inquiryMatch?.[1]?.trim() || "";
  const isContactFormEcho =
    /new (contact )?inquiry/i.test(subjectValue) &&
    fromValue.includes("contact@digitalgeeks.tech");

  if (isContactFormEcho && classifyContactSubmission({
    firstName: (body.match(/Name:\s*([^\n<]+)/i)?.[1] || "").trim().split(/\s+/)[0] || "",
    lastName: (body.match(/Name:\s*([^\n<]+)/i)?.[1] || "").trim().split(/\s+/).slice(1).join(" "),
    company: (body.match(/Company:\s*([^\n<]+)/i)?.[1] || "").trim(),
    email: (body.match(/Email:\s*([^\n<]+)/i)?.[1] || "").trim(),
    message: inquiryMessage,
  }) === "spam") {
    return "spam";
  }

  return "inbox";
}
