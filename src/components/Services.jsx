"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  MdOutlineCode,
  MdOutlinePhoneAndroid,
  MdOutlineCloud,
  MdOutlineSmartToy,
  MdOutlineSecurity,
  MdOutlineBarChart,
  MdOutlineDesignServices,
  MdOutlineHub,
  MdOutlineRocketLaunch,
  MdOutlineStorefront,
  MdOutlineLayers,
  MdOutlineSupport,
} from "react-icons/md";

// ─── Data ────────────────────────────────────────────────────────────────────

const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "engineering", label: "Engineering" },
  { id: "cloud", label: "Cloud & Infra" },
  { id: "intelligence", label: "AI & Data" },
  { id: "design", label: "Product & Design" },
  { id: "growth", label: "Growth" },
];

const services = [
  {
    id: 1,
    category: "engineering",
    icon: MdOutlineCode,
    title: "Custom Software Development",
    description:
      "End-to-end engineering of web platforms, internal tools, and enterprise systems — built for scale, security, and longevity using modern stacks.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    highlight: true,
  },
  {
    id: 2,
    category: "engineering",
    icon: MdOutlinePhoneAndroid,
    title: "Mobile Application Engineering",
    description:
      "Native and cross-platform iOS & Android apps with fluid UX, offline-first architecture, and deep platform integrations.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    highlight: false,
  },
  {
    id: 3,
    category: "engineering",
    icon: MdOutlineLayers,
    title: "API & Systems Integration",
    description:
      "Seamlessly connect your existing tools, platforms, and third-party services through robust REST, GraphQL, and gRPC APIs.",
    tags: ["REST", "GraphQL", "gRPC", "Webhooks"],
    highlight: false,
  },
  {
    id: 4,
    category: "cloud",
    icon: MdOutlineCloud,
    title: "Cloud Infrastructure & DevOps",
    description:
      "Design, deploy, and manage cloud-native infrastructure on AWS, GCP, or Azure — with full CI/CD, IaC, and zero-downtime deployments.",
    tags: ["AWS", "GCP", "Terraform", "Docker", "Kubernetes"],
    highlight: true,
  },
  {
    id: 5,
    category: "cloud",
    icon: MdOutlineSecurity,
    title: "Cybersecurity & Compliance",
    description:
      "Penetration testing, security audits, vulnerability assessments, and compliance frameworks to protect your business and customers.",
    tags: ["OWASP", "ISO 27001", "GDPR", "SOC 2"],
    highlight: false,
  },
  {
    id: 6,
    category: "cloud",
    icon: MdOutlineHub,
    title: "Microservices Architecture",
    description:
      "Decompose monolithic systems into resilient, independently deployable microservices for maximum developer velocity and fault isolation.",
    tags: ["Event-Driven", "Kafka", "Redis", "Service Mesh"],
    highlight: false,
  },
  {
    id: 7,
    category: "intelligence",
    icon: MdOutlineSmartToy,
    title: "AI & Machine Learning Solutions",
    description:
      "From LLM integrations and RAG pipelines to custom computer vision and NLP models — we build intelligent systems that create real business value.",
    tags: ["LLMs", "RAG", "TensorFlow", "PyTorch"],
    highlight: true,
  },
  {
    id: 8,
    category: "intelligence",
    icon: MdOutlineBarChart,
    title: "Data Engineering & Analytics",
    description:
      "Build robust data pipelines, warehouses, and BI dashboards that turn raw data into decisions — in real-time or batch.",
    tags: ["BigQuery", "dbt", "Airflow", "Looker"],
    highlight: false,
  },
  {
    id: 9,
    category: "design",
    icon: MdOutlineDesignServices,
    title: "Product Design & UX Research",
    description:
      "User research, wireframing, prototyping, and pixel-perfect UI design systems that align business goals with user needs.",
    tags: ["Figma", "Design Systems", "Usability Testing"],
    highlight: false,
  },
  {
    id: 10,
    category: "design",
    icon: MdOutlineRocketLaunch,
    title: "MVP & Startup Launchpad",
    description:
      "Fast-track your idea to a fundable, scalable product. We scope, design, and ship your MVP in 6–10 weeks with a dedicated sprint team.",
    tags: ["Discovery", "Sprint Teams", "Go-to-Market"],
    highlight: true,
  },
  {
    id: 11,
    category: "growth",
    icon: MdOutlineStorefront,
    title: "E-Commerce & Digital Commerce",
    description:
      "High-converting storefronts, headless commerce architectures, payment integrations, and inventory systems for modern retail.",
    tags: ["Shopify", "Stripe", "Headless", "Custom"],
    highlight: false,
  },
  {
    id: 12,
    category: "growth",
    icon: MdOutlineSupport,
    title: "Managed Tech Support & Retainers",
    description:
      "Ongoing engineering support, performance monitoring, SLA-backed maintenance, and on-demand feature development for your live products.",
    tags: ["SLA", "Monitoring", "24/7 Support", "Retainers"],
    highlight: false,
  },
];

// ─── Service Card ─────────────────────────────────────────────────────────────

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`group relative flex flex-col p-8 rounded-[1.75rem] border transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] hover:-translate-y-1 ${
        service.highlight
          ? "bg-gradient-to-br from-blue-600 to-indigo-600 border-transparent text-white"
          : "bg-white border-slate-200/70 hover:border-slate-300"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-7 transition-all duration-500 ${
          service.highlight
            ? "bg-white/15 text-white group-hover:bg-white/25"
            : "bg-slate-50 text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-y-1"
        }`}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Title + Description */}
      <h3
        className={`font-poppins font-semibold text-[20px] leading-tight tracking-tight mb-3 ${
          service.highlight ? "text-white" : "text-slate-900"
        }`}
      >
        {service.title}
      </h3>
      <p
        className={`font-poppins font-normal text-[15px] leading-relaxed mb-7 flex-1 ${
          service.highlight ? "text-blue-100" : "text-slate-500"
        }`}
      >
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className={`text-[12px] font-medium px-3 py-1 rounded-full ${
              service.highlight
                ? "bg-white/15 text-blue-50"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="Services" className="w-full bg-white">

      {/* ── Section Header ────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 pt-16 pb-10 text-center">
        <h2 className="font-poppins font-extrabold text-[32px] ss:text-[36px] sm:text-[48px] text-slate-900 leading-tight tracking-tight mb-4">
          Our <span className="text-blue-600">Services</span>
        </h2>
        <p className="font-poppins text-slate-500 text-[18px] max-w-2xl mx-auto leading-relaxed">
          Engineering without compromise. Comprehensive digital solutions designed to accelerate your business growth and transform your vision into reality.
        </p>
      </div>

      {/* ── Category Filters ─────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 pb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-poppins font-medium text-[14px] px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Service Cards Grid ───────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-16 pb-24">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Process Strip ────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-y border-slate-100 py-20 mb-10">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h3 className="font-poppins font-bold text-[34px] sm:text-[44px] text-slate-900 tracking-tight">
              How we work
            </h3>
            <p className="font-poppins text-slate-500 text-[18px] mt-4 max-w-xl mx-auto leading-relaxed">
              A clear, transparent process from first conversation to live product.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We deep-dive into your goals, users, and constraints to define scope and success metrics." },
              { step: "02", title: "Architecture & Design", desc: "System design, tech selection, UX prototyping, and stakeholder alignment before a single line of code." },
              { step: "03", title: "Build & Iterate", desc: "Agile sprints with continuous demos, fast feedback loops, and transparent progress tracking." },
              { step: "04", title: "Launch & Scale", desc: "Production deployment, monitoring, performance tuning, and ongoing support as you grow." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col text-center items-center sm:text-left sm:items-start"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-poppins font-bold text-[24px] mb-5 border border-blue-100 shadow-sm">
                  {item.step}
                </div>
                <h4 className="font-poppins font-semibold text-slate-900 text-[20px] mb-3">
                  {item.title}
                </h4>
                <p className="font-poppins text-slate-500 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Services;
