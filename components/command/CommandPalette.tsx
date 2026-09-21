"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { IconGithub, IconLinkedin, IconCheck } from "../Icons";

export interface CommandItem {
  id: string;
  category: "NAVIGATE" | "ACTIONS" | "PROJECTS";
  label: string;
  keywords?: string[];
  icon: React.ReactNode;
  perform: (helpers: {
    close: () => void;
    showToast: (msg: string) => void;
  }) => void;
}

// Global dispatcher helper so any component or button can open the command palette
export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  }
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global keyboard shortcuts (Cmd+K, Ctrl+K, Escape) and custom event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Handle body scroll locking and autofocus
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      setQuery("");
      setActiveId(null);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
      setToastMessage(null);
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Clean, minimal command set
  const commands: CommandItem[] = useMemo(
    () => [
      // NAVIGATE
      {
        id: "nav-home",
        category: "NAVIGATE",
        label: "Home",
        keywords: ["home", "top", "hero", "overview", "start"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("hero");
          close();
        },
      },
      {
        id: "nav-about",
        category: "NAVIGATE",
        label: "About",
        keywords: ["about", "bio", "philosophy", "story", "education", "degree"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("about");
          close();
        },
      },
      {
        id: "nav-work",
        category: "NAVIGATE",
        label: "Selected work",
        keywords: ["work", "projects", "portfolio", "showcase", "case studies", "selected work"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("work");
          close();
        },
      },
      {
        id: "nav-skills",
        category: "NAVIGATE",
        label: "Focus & capabilities",
        keywords: ["skills", "focus", "capabilities", "frontend", "backend", "architecture"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("skills");
          close();
        },
      },
      {
        id: "nav-tools",
        category: "NAVIGATE",
        label: "Tech stack",
        keywords: ["tools", "tech", "stack", "react", "nextjs", "python", "figma"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("tools");
          close();
        },
      },
      {
        id: "nav-experience",
        category: "NAVIGATE",
        label: "Experience",
        keywords: ["experience", "roles", "jobs", "timeline", "history", "totalenergies", "gdg"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("experience");
          close();
        },
      },
      {
        id: "nav-contact",
        category: "NAVIGATE",
        label: "Contact",
        keywords: ["contact", "email", "touch", "reach", "message", "hire"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("contact");
          close();
        },
      },

      // PROJECTS (searchable projects)
      {
        id: "proj-bayesvest",
        category: "PROJECTS",
        label: "BayesVest",
        keywords: ["bayesvest", "fintech", "finance", "quantitative", "algorithm"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M7 7h10v10" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("work");
          close();
        },
      },
      {
        id: "proj-totalenergies",
        category: "PROJECTS",
        label: "TotalEnergies EP Nigeria",
        keywords: ["totalenergies", "network", "infrastructure", "enterprise", "cisco"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("work");
          close();
        },
      },
      {
        id: "proj-gdg",
        category: "PROJECTS",
        label: "GDG Babcock Community",
        keywords: ["gdg", "babcock", "community", "google", "brand", "design"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("work");
          close();
        },
      },
      {
        id: "proj-devfest",
        category: "PROJECTS",
        label: "DevFest Lagos 2024",
        keywords: ["devfest", "lagos", "conference", "identity", "brand"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 17L17 7M7 7h10v10" />
          </svg>
        ),
        perform: ({ close }) => {
          scrollToElement("work");
          close();
        },
      },

      // ACTIONS
      {
        id: "act-copy-email",
        category: "ACTIONS",
        label: "Copy email address",
        keywords: ["email", "copy", "mail", "contact", "address", "reach", "hire"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        perform: ({ showToast }) => {
          navigator.clipboard.writeText("basseysaviour230@gmail.com");
          showToast("Copied basseysaviour230@gmail.com");
        },
      },
      {
        id: "act-download-cv",
        category: "ACTIONS",
        label: "Download CV",
        keywords: ["cv", "resume", "download", "pdf"],
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        ),
        perform: ({ close, showToast }) => {
          scrollToElement("contact");
          showToast("Navigated to CV / Contact");
          close();
        },
      },
      {
        id: "act-github",
        category: "ACTIONS",
        label: "GitHub profile",
        keywords: ["github", "git", "code", "repo", "source"],
        icon: <IconGithub className="w-4 h-4" />,
        perform: ({ close }) => {
          window.open("https://github.com/Bassey-Saviour", "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "act-linkedin",
        category: "ACTIONS",
        label: "LinkedIn profile",
        keywords: ["linkedin", "connect", "network", "profile"],
        icon: <IconLinkedin className="w-4 h-4" />,
        perform: ({ close }) => {
          window.open("https://www.linkedin.com/in/saviour-bassey1/", "_blank", "noopener,noreferrer");
          close();
        },
      },
    ],
    []
  );

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default view when no search: show NAVIGATE and ACTIONS (hide PROJECTS to keep it super clean like reference)
      return commands.filter((cmd) => cmd.category !== "PROJECTS");
    }

    return commands.filter((cmd) => {
      const labelMatch = cmd.label.toLowerCase().includes(q);
      const catMatch = cmd.category.toLowerCase().includes(q);
      const kwMatch = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return labelMatch || catMatch || kwMatch;
    });
  }, [query, commands]);

  // Group commands by category for display
  const groupedCategories = useMemo(() => {
    const groups: { [key: string]: CommandItem[] } = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCommands.length === 0) return;

    const currentIndex = filteredCommands.findIndex((cmd) => cmd.id === activeId);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % filteredCommands.length;
      const nextId = filteredCommands[nextIndex].id;
      setActiveId(nextId);
      scrollItemIntoView(nextIndex);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        currentIndex <= 0 ? filteredCommands.length - 1 : currentIndex - 1;
      const prevId = filteredCommands[prevIndex].id;
      setActiveId(prevId);
      scrollItemIntoView(prevIndex);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const targetCmd =
        (activeId ? filteredCommands.find((c) => c.id === activeId) : null) ||
        filteredCommands[0];

      if (targetCmd) {
        targetCmd.perform({ close: () => setIsOpen(false), showToast });
      }
    }
  };

  const scrollItemIntoView = (index: number) => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll<HTMLButtonElement>("[data-command-item]");
    if (items[index]) {
      items[index].scrollIntoView({ block: "nearest" });
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-28 bg-black/75 backdrop-blur-md pointer-events-auto"
      onClick={() => setIsOpen(false)}
    >
      {/* Sleek, compact command modal (max-w-[440px]) */}
      <div
        className="command-dialog-enter relative w-full max-w-[440px] rounded-xl border border-white/[0.12] bg-[#121018]/95 shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_24px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3 border-b border-white/[0.08] bg-[#171420]/50">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Where to?"
            style={{ outline: "none", boxShadow: "none" }}
            className="w-full bg-transparent text-[13px] sm:text-sm font-normal text-[#F2E9DC] placeholder-[#B8A996]/45 placeholder:text-xs border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 tracking-normal shadow-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[10px] font-mono text-[#B8A996]/60 hover:text-[#F2E9DC] px-1 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Toast confirmation */}
        {toastMessage && (
          <div className="mx-3 mt-2 py-1.5 px-2.5 rounded-lg bg-[#E8963C]/15 border border-[#E8963C]/30 flex items-center gap-2 text-[11px] font-mono text-[#F2E9DC]">
            <IconCheck className="w-3.5 h-3.5 text-[#E8963C] shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        )}

        {/* Command List */}
        <div
          ref={listRef}
          className="max-h-[290px] overflow-y-auto p-1.5 overscroll-contain no-scrollbar"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-8 px-4 text-center">
              <p className="text-xs text-[#B8A996]">
                No commands matching &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            Object.entries(groupedCategories).map(([category, items]) => (
              <div key={category} className="mb-1.5 last:mb-0">
                <div className="px-2.5 pt-2 pb-1 text-[10px] font-mono font-medium tracking-widest text-[#B8A996]/45 uppercase">
                  {category}
                </div>

                <div className="space-y-0.5">
                  {items.map((cmd) => {
                    const isHoveredOrActive = activeId === cmd.id;

                    return (
                      <button
                        key={cmd.id}
                        data-command-item
                        type="button"
                        onClick={() =>
                          cmd.perform({ close: () => setIsOpen(false), showToast })
                        }
                        onMouseEnter={() => setActiveId(cmd.id)}
                        onMouseLeave={() => setActiveId(null)}
                        className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2.5 transition-colors duration-100 cursor-pointer ${isHoveredOrActive
                          ? "bg-[#221c30] text-[#F2E9DC]"
                          : "text-[#B8A996] hover:bg-[#1a1725] hover:text-[#F2E9DC]"
                          }`}
                      >
                        <span
                          className={`shrink-0 transition-colors ${isHoveredOrActive ? "text-[#E8963C]" : "text-[#B8A996]/70"
                            }`}
                        >
                          {cmd.icon}
                        </span>
                        <span className="text-[13px] font-normal tracking-tight truncate">
                          {cmd.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Minimal Footer */}
        <div className="px-3.5 py-2 bg-[#0c0a10]/80 border-t border-white/[0.06] flex items-center gap-4 text-[9.5px] font-mono tracking-wider text-[#B8A996]/45 select-none">
          <span>↑↓ NAVIGATE</span>
          <span>↵ SELECT</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
