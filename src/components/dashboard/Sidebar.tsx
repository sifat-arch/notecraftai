"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  Plus,
  Layers,
  FolderOpen,
  Users,
  FileText,
  Archive,
  Settings,
  HelpCircle,
  ArrowRight,
  FileQuestion,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const mainNav = [
  {
    label: "Notes",
    href: "/dashboard/notes",
    icon: Layers,
    isActive: (p: string) => p.startsWith("/dashboard/notes"),
  },
  {
    label: "Library",
    href: "/dashboard",
    icon: FolderOpen,
    isActive: (p: string) => p === "/dashboard",
  },
  {
    label: "Shared",
    href: "/dashboard/ask",
    icon: Users,
    isActive: (p: string) => p.startsWith("/dashboard/ask"),
  },
  {
    label: "Templates",
    href: "/dashboard/create",
    icon: FileText,
    isActive: (p: string) => p.startsWith("/dashboard/create"),
  },
  {
    label: "Archive",
    href: "/dashboard/notes",
    icon: Archive,
    isActive: () => false,
  },
  {
    label: "Quiz",
    href: "/dashboard/quiz",
    icon: FileQuestion,
    isActive: () => false,
  },
];

const footerNav = [
  { label: "Settings", href: "#", icon: Settings },
  { label: "Support", href: "#", icon: HelpCircle },
];

const STORAGE_USED = 85;

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-violet-200/60 text-violet-800"
            : "text-slate-600 hover:bg-violet-100/50 hover:text-violet-700",
        )}
      >
        <Icon
          className={cn(
            "size-[18px] shrink-0",
            isActive ? "text-violet-700" : "text-slate-500",
          )}
        />
        {label}
      </Link>
    </motion.div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  const displayName = isLoaded
    ? [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User"
    : "Loading...";

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-screen w-72 shrink-0 flex-col border-r border-violet-100 bg-[#F5F3FF] p-6"
    >
      {/* User profile */}
      <div className="flex items-center gap-3">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-violet-200">
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.imageUrl}
              alt={displayName}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-violet-200 text-sm font-semibold text-violet-700">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">
            {displayName}
          </p>
          <p className="truncate text-xs text-slate-500">Premium Workspace</p>
        </div>
      </div>

      {/* New Note CTA */}
      <Link href="/dashboard/create" className="mt-6 block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2.5 rounded-xl bg-violet-700 py-3 text-sm font-semibold text-white shadow-md shadow-violet-500/25 transition-colors hover:bg-violet-800"
        >
          <span className="flex size-5 items-center justify-center rounded-full border border-white/40">
            <Plus className="size-3.5" strokeWidth={2.5} />
          </span>
          New Note
        </motion.div>
      </Link>

      {/* Main navigation */}
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {mainNav.map((item) => (
          <NavLink
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive(pathname)}
          />
        ))}
      </nav>

      {/* Storage card + footer */}
      <div className="mt-auto space-y-4">
        <div className="rounded-2xl border border-violet-100/80 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wide text-violet-700">
              PRO STORAGE
            </span>
            <span className="text-xs text-slate-400">{STORAGE_USED}% Used</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${STORAGE_USED}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-violet-700"
            />
          </div>
          <Link
            href="/#pricing"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-800 transition-colors hover:text-violet-700"
          >
            Upgrade Plan
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <Separator className="bg-violet-200/60" />

        <div className="flex flex-col gap-1">
          {footerNav.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={false}
            />
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
