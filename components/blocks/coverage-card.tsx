import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CoverageCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  className?: string;
};

export function CoverageCard({
  icon: Icon,
  title,
  description,
  href,
  linkText = "Learn more",
  className,
}: CoverageCardProps) {
  const content = (
    <>
      <Icon
        className="h-8 w-8 text-primary transition-colors"
        strokeWidth={1.5}
      />
      <div className="mt-5 flex flex-1 flex-col gap-2">
        <h3 className="text-[20px] font-semibold leading-[1.3] text-foreground">
          {title}
        </h3>
        <p className="text-[16px] leading-[1.6] text-gray-700">{description}</p>
      </div>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary transition-colors group-hover:text-primary-dark">
          {linkText}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </span>
      )}
    </>
  );

  const baseClasses = cn(
    "group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-150 lg:p-8",
    href &&
      "hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm focus-visible:-translate-y-0.5 focus-visible:border-gray-300 focus-visible:shadow-sm focus-visible:outline-none",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
