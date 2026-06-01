"use client"

import {
  Sparkles,
  FileText,
  Layers,
  Search,
  Share2,
  Cloud,
  type LucideIcon,
} from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface Feature {
  title: string
  description: string
  icon: LucideIcon
  className?: string
  visual?: React.ReactNode
}

function EditorVisual() {
  return (
    <div className="mt-6 space-y-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex gap-2 border-b border-slate-100 pb-3">
        {["B", "I", "U", "H1"].map((tool) => (
          <span
            key={tool}
            className="flex size-7 items-center justify-center rounded-md bg-slate-50 text-xs font-medium text-slate-500"
          >
            {tool}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-2 w-full rounded bg-slate-100" />
        <div className="h-2 w-4/5 rounded bg-slate-100" />
        <div className="h-2 w-3/5 rounded bg-slate-100" />
      </div>
    </div>
  )
}

function FlashcardVisual() {
  return (
    <div className="mt-4 flex justify-center">
      <div className="relative w-40">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl border border-slate-200 bg-slate-50" />
        <div className="relative rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">
            Question
          </p>
          <p className="mt-1 text-xs font-medium text-slate-700">
            What is mitosis?
          </p>
        </div>
      </div>
    </div>
  )
}

function SearchVisual() {
  return (
    <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
        <Search className="size-3.5 text-slate-400" />
        <span className="text-xs text-slate-400">Search all notes...</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {["Cell membrane", "Photosynthesis"].map((result) => (
          <div key={result} className="rounded-md px-2 py-1.5 text-xs text-slate-600 hover:bg-violet-50">
            {result}
          </div>
        ))}
      </div>
    </div>
  )
}

const features: Feature[] = [
  {
    title: "Pro Rich-Text Editor",
    description:
      "Write beautifully formatted notes with headings, lists, bold, italic, and more — all in a distraction-free editor built for deep focus.",
    icon: FileText,
    className: "lg:col-span-2 lg:row-span-2",
    visual: <EditorVisual />,
  },
  {
    title: "One-Click AI Summary",
    description:
      "Instantly distill long notes into concise, exam-ready summaries with a single click powered by advanced AI.",
    icon: Sparkles,
    className: "lg:col-span-1",
  },
  {
    title: "Automated Flashcards",
    description:
      "Turn any note into smart flashcards automatically. Review with spaced repetition to lock in knowledge.",
    icon: Layers,
    className: "lg:col-span-1",
    visual: <FlashcardVisual />,
  },
  {
    title: "Smart Search",
    description:
      "Find anything across all your notes instantly with semantic AI-powered search that understands context.",
    icon: Search,
    className: "lg:col-span-1",
    visual: <SearchVisual />,
  },
  {
    title: "Export & Share",
    description:
      "Export notes as PDF, Markdown, or share study sets with classmates in one click.",
    icon: Share2,
    className: "lg:col-span-1",
  },
  {
    title: "Cloud Sync",
    description:
      "Access your notes anywhere. Real-time sync across all your devices, always backed up and secure.",
    icon: Cloud,
    className: "lg:col-span-1",
  },
]

export default function BentoFeatures() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to study smarter
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            NotecraftAI combines a powerful editor with AI tools designed
            specifically for students and lifelong learners.
          </p>
        </motion.div>

        <div className="mt-16 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5",
                  feature.className
                )}
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-indigo-600 shadow-md shadow-violet-500/20">
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
                {feature.visual}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
