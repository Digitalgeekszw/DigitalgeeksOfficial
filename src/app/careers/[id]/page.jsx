import React from "react";
import connectDB from "../../../lib/mongodb";
import Job from "../../../models/Job";
import JobDetailsClient from "./JobDetailsClient";
import { Navbar, Footer } from "../../../components";
import styles from "../../../style";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

async function getJob(id) {
  try {
    await connectDB();
    // Try finding by _id (hex string) or whatever ID format is used
    const job = await Job.findById(id).lean();
    if (job) {
      // Convert MongoDB _id to string for client component
      job._id = job._id.toString();
      if (job.createdAt) job.createdAt = job.createdAt.toString();
      if (job.updatedAt) job.updatedAt = job.updatedAt.toString();
    }
    return job;
  } catch (error) {
    console.error("Error fetching job in server component:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: "Job Not Found | DigitalGeeks Careers",
    };
  }

  return {
    title: `${job.title} | DigitalGeeks Careers`,
    description: job.description,
    openGraph: {
      title: job.title,
      description: job.description,
      type: "website",
      url: `https://digitalgeeks.tech/careers/${id}`,
      siteName: "DigitalGeeks",
    },
    twitter: {
      card: "summary_large_image",
      title: job.title,
      description: job.description,
    },
  };
}

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-2xl text-[#202124] mb-4">Job Not Found</h1>
          <p className="text-[#5f6368] mb-6">The career opportunity you're looking for might have been filled or removed.</p>
          <Link href="/careers" className="text-[#1a73e8] hover:underline font-roboto font-medium text-lg flex items-center">
            <FiArrowLeft className="mr-2" />
            Back to Careers
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <JobDetailsClient job={job} />;
}
