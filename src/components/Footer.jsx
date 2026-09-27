import Link from "next/link";
import { products, companyLinks, socialLinks } from "../constants/site";

const linkClass =
  "inline-flex min-h-[36px] items-center text-[14px] text-dg-ink-3 transition-colors duration-200 hover:text-dg-ink";

const Column = ({ title, children }) => (
  <div>
    <h2 className="text-[13px] font-semibold text-dg-ink">{title}</h2>
    <ul className="mt-3 space-y-0.5">{children}</ul>
  </div>
);

const External = ({ href, children }) => (
  <li>
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  </li>
);

const Internal = ({ href, children }) => (
  <li>
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  </li>
);

const Footer = () => (
  <footer id="Contact" className="dg-site w-full border-t border-dg-line bg-dg-surface-2 text-dg-ink-3">
    <div className="mx-auto w-full max-w-dg-content px-dg-gutter pb-10 pt-14 sm:pt-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)] md:gap-8">
        <div className="max-w-[300px]">
          <Link href="/" aria-label="DigitalGeeks home" className="inline-flex min-h-[44px] items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/digitalgeeks-wordmark-sm.png" alt="" width={280} height={77} loading="lazy" className="h-9 w-auto" />
          </Link>
          <p className="mt-3 text-[14px] leading-relaxed">
            The company behind Swipee, ZimSensei and PreciAgro.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 md:col-span-4 md:contents">
          <Column title="Products">
            {products.map((p) => (
              <External key={p.id} href={p.href}>
                {p.name}
              </External>
            ))}
          </Column>

          <Column title="Company">
            {companyLinks
              .filter((l) => l.href !== "/services")
              .map((l) => (
                <Internal key={l.href} href={l.href}>
                  {l.name === "About DigitalGeeks" ? "About" : l.name}
                </Internal>
              ))}
            <External href="https://publuu.com/flip-book/181271/445916/page/1">Brand guidelines</External>
          </Column>

          <Column title="Services and contact">
            <Internal href="/services">Services</Internal>
            <Internal href="/contact">Contact us</Internal>
          </Column>

          <Column title="Follow DigitalGeeks">
            {socialLinks.map((s) => (
              <External key={s.name} href={s.href}>
                {s.name}
              </External>
            ))}
          </Column>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-2 border-t border-dg-line pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} DigitalGeeks. All rights reserved.</p>
        <p>Poland · Operates globally</p>
      </div>
    </div>
  </footer>
);

export default Footer;
