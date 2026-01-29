"use client";

type OverlapTextProps = {
  text: string;
  className?: string;
};

export default function OverlapBackText({ text, className = "" }: OverlapTextProps) {
  return (
    <div
      className={`overlap-text overlap-front ${className}`}
      aria-label={text}
    >
      {[...text].map((char, i) => (
        <span key={i} style={{ ["--i" as any]: i }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
