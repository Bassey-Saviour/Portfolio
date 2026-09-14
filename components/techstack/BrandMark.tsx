import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiMysql,
  SiFigma,
  SiCisco,
} from "react-icons/si";

// Authentic Canva vector icon (excluded from react-icons due to Canva trademark policy)
function CanvaIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.834 16.71c-1.42 1.34-3.414 1.76-5.26 1.11-2.48-.87-3.9-3.32-3.48-5.96.4-2.52 2.5-4.43 5.04-4.59 1.63-.1 3.2.49 4.31 1.64.44.46.39 1.2-.1 1.62-.48.4-1.2.35-1.63-.12-.76-.8-1.84-1.2-2.94-1.1-1.74.15-3.17 1.47-3.44 3.2-.34 2.1 1.1 3.96 3.1 4.26 1.42.21 2.85-.29 3.82-1.33.48-.51 1.29-.53 1.79-.05.51.48.53 1.28.05 1.79l-.26.23z" />
    </svg>
  );
}

interface BrandMarkProps {
  type: string;
  color: string;
}

export default function BrandMark({ type, color }: BrandMarkProps) {
  if (type === "react") {
    return (
      <SiReact
        className="h-6 w-6 transition-transform duration-500 group-hover:rotate-180"
        style={{ color }}
      />
    );
  }
  if (type === "next") {
    return (
      <SiNextdotjs
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "tailwind") {
    return (
      <SiTailwindcss
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "python") {
    return (
      <SiPython
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ color }}
      />
    );
  }
  if (type === "git") {
    return (
      <SiGit
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
        style={{ color }}
      />
    );
  }
  if (type === "mysql") {
    return (
      <SiMysql
        className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "figma") {
    return (
      <SiFigma
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "canva") {
    return (
      <CanvaIcon
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  if (type === "cisco") {
    return (
      <SiCisco
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      />
    );
  }
  return null;
}
