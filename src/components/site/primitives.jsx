import Link from "next/link";

export const Container = ({ as: Tag = "div", className = "", children, ...props }) => (
  <Tag className={`mx-auto w-full max-w-dg-content px-dg-gutter ${className}`} {...props}>
    {children}
  </Tag>
);

// Small uppercase product/section label that sits above a headline.
export const Eyebrow = ({ children, className = "", icon, iconAlt = "" }) => (
  <p className={`flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-[-0.01em] ${className}`}>
    {icon && (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={icon} alt={iconAlt} width={24} height={24} className="h-6 w-6 rounded-md" />
    )}
    {children}
  </p>
);

const Arrow = ({ external }) =>
  external ? (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-dg group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-dg group-hover:translate-x-0.5">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

const variants = {
  primary:
    "bg-dg-blue-strong text-white hover:bg-[#0b56bd] px-6",
  "primary-dark":
    "bg-white text-dg-ink hover:bg-dg-on-dark px-6",
  secondary:
    "text-dg-blue-strong hover:text-[#0b56bd] px-1",
  "secondary-dark":
    "text-dg-blue-soft hover:text-white px-1",
  outline:
    "border border-dg-line text-dg-ink hover:border-dg-ink-3 px-6",
  // Colours supplied by the caller, e.g. a product's own accent.
  plain: "px-6",
};

/**
 * A link styled as an action. External links open in a new tab and say so to
 * assistive technology.
 */
export const ActionLink = ({ href, variant = "primary", external = false, className = "", children, ...props }) => {
  const classes = `group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full font-sans text-[16px] font-medium transition-colors duration-200 ease-dg ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {variant.startsWith("secondary") || external ? <Arrow external={external} /> : null}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {content}
      </a>
    );
  }
  // Hash links to homepage sections are plain anchors so they always scroll.
  if (href.startsWith("#") || href.startsWith("/#")) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
};
