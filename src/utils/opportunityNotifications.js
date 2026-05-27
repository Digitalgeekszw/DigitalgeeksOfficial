import StudentEmailSubscriber from "../models/StudentEmailSubscriber";
import { sendNewOpportunityEmail } from "./email";

export async function notifyOpportunitySubscribers(job, customMessage = "") {
  const subscribers = await StudentEmailSubscriber.find({ subscribed: true }).select("email name").lean();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalgeeks.tech";
  const jobUrl = `${appUrl}/careers/${job._id}`;

  const results = await Promise.allSettled(subscribers.map((subscriber) => sendNewOpportunityEmail({
    to: subscriber.email,
    name: subscriber.name,
    job,
    jobUrl,
    customMessage,
  })));

  const sentAt = new Date();
  const sentEmails = subscribers
    .filter((_, index) => results[index].status === "fulfilled")
    .map((subscriber) => subscriber.email);

  if (sentEmails.length > 0) {
    await StudentEmailSubscriber.updateMany(
      { email: { $in: sentEmails } },
      { $set: { lastOpportunityEmailAt: sentAt } }
    );
  }

  return {
    attempted: subscribers.length,
    sent: sentEmails.length,
    failed: subscribers.length - sentEmails.length,
  };
}
