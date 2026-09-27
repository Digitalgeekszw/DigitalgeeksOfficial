"use client";

import { useContent } from "../../hooks/useContent";
import { productScreenKeys } from "../../constants/site";

const Step = ({ n, label, className = "", children }) => (
  <li className={`flex flex-col rounded-dg-lg bg-white p-6 sm:p-7 ${className}`}>
    <p className="text-[13px] font-medium text-dg-ink-3">
      <span className="tabular-nums">{n}</span> · {label}
    </p>
    <div className="mt-4 flex-1">{children}</div>
  </li>
);

const Connector = () => (
  <li aria-hidden="true" className="hidden items-center justify-center text-dg-ink-3 md:flex">
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M5 12h13M13 6.5 18.5 12 13 17.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </li>
);

/**
 * A real ZimSensei feedback screen when an admin has uploaded one; otherwise
 * a clearly labelled, typeset example of the answer → feedback → next step
 * flow described on zimsensei.com.
 */
export default function ZimSenseiVisual() {
  const { content } = useContent();
  const screen = content[productScreenKeys.zimsenseiFeedback];

  if (screen) {
    return (
      <figure>
        <div className="mx-auto max-w-[960px] overflow-hidden rounded-dg-lg bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={screen} alt="ZimSensei marking a student answer with examiner-style feedback" width={1600} height={1000} loading="lazy" decoding="async" className="h-auto w-full" />
        </div>
      </figure>
    );
  }

  return (
    <figure>
      <ol className="grid gap-3 md:grid-cols-[1fr_auto_1.35fr_auto_1fr] md:gap-4">
        <Step n="1" label="Your answer">
          <p className="text-[15px] font-medium text-dg-ink">Define osmosis.</p>
          <p className="text-[13px] text-dg-ink-3">2 marks</p>
          <p className="mt-4 rounded-dg-sm bg-dg-surface-2 p-4 text-[16px] leading-relaxed text-dg-ink-2">
            Water moves from a dilute solution to a more concentrated one.
          </p>
        </Step>

        <Connector />

        <Step n="2" label="Feedback" className="ring-2 ring-[#007a55]/70">
          <p className="font-display text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-dg-ink">
            1<span className="text-dg-ink-3">/2</span>
          </p>
          <ul className="mt-5 space-y-4 text-[16px] leading-relaxed">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#007a55] text-[12px] font-bold text-white">✓</span>
              <span className="text-dg-ink-2">
                <span className="sr-only">Earned: </span>Movement of water from a dilute to a concentrated solution.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dg-orange text-[12px] font-bold text-dg-ink">!</span>
              <span className="text-dg-ink-2">
                <span className="sr-only">Missed: </span>Say the water crosses a <strong className="font-semibold text-dg-ink">partially permeable membrane</strong>. Examiners look for that term for the second mark.
              </span>
            </li>
          </ul>
        </Step>

        <Connector />

        <Step n="3" label="What to work on next">
          <p className="font-display text-[20px] font-semibold leading-snug tracking-[-0.01em] text-dg-ink">
            Transport in cells
          </p>
          <p className="mt-2 text-[16px] leading-relaxed text-dg-ink-2">
            Revise how diffusion and osmosis differ, then try three more questions on the topic.
          </p>
        </Step>
      </ol>
      <figcaption className="mt-4 text-[13px] text-dg-ink-3">
        Illustrative example of how ZimSensei marks an answer. Not a screenshot.
      </figcaption>
    </figure>
  );
}
