"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileCode2, Sparkles, Layers } from "lucide-react"

import { cn } from "@/lib/utils"

const markdownContent = `# Cell Biology Notes

## Cell Structure
The **cell** is the basic unit of life. All organisms are composed of one or more cells.

### Key Organelles
- **Nucleus** — contains genetic material (DNA)
- **Mitochondria** — powerhouse of the cell
- **Ribosomes** — protein synthesis
- **Cell Membrane** — controls what enters/exits

## Cell Division
Cells reproduce through **mitosis** (somatic cells) or **meiosis** (gametes).

> Mitosis produces two identical daughter cells.`

const summaryContent = {
  title: "AI Summary",
  content: `**Cell Biology Overview**

Cells are the fundamental units of all living organisms. Key structures include the nucleus (DNA storage), mitochondria (energy production), ribosomes (protein synthesis), and the cell membrane (selective barrier).

**Cell Division:** Mitosis creates two identical daughter cells for growth and repair, while meiosis produces gametes with half the chromosome count for reproduction.

**Key Takeaway:** Understanding organelle functions and division processes is essential for biology exams.`,
}

const flashcards = [
  {
    front: "What is the basic unit of life?",
    back: "The cell — all organisms are composed of one or more cells.",
  },
  {
    front: "What is the function of mitochondria?",
    back: "Mitochondria are the powerhouse of the cell, producing ATP energy.",
  },
  {
    front: "What does mitosis produce?",
    back: "Two genetically identical daughter cells from one parent cell.",
  },
  {
    front: "What controls what enters and exits a cell?",
    back: "The cell membrane (plasma membrane).",
  },
]

type Tab = "summary" | "flashcards"

const tabs: { id: Tab; label: string; icon: typeof Sparkles }[] = [
  { id: "summary", label: "Summary", icon: Sparkles },
  { id: "flashcards", label: "Flashcards", icon: Layers },
]

export default function AiDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("summary")

  return (
    <section id="demo" className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            Live Demo
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            See AI transform your notes
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Paste your raw notes on the left and watch NotecraftAI generate
            summaries and flashcards in seconds.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <FileCode2 className="size-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-600">
                Raw Markdown
              </span>
            </div>
            <pre className="max-h-[420px] overflow-auto p-5 font-mono text-xs leading-relaxed text-slate-600">
              {markdownContent}
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="flex border-b border-slate-100 bg-slate-50 p-1.5">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive ? "text-violet-700" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="size-4" />
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="relative min-h-[380px] p-5">
              <AnimatePresence mode="wait">
                {activeTab === "summary" ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-violet-100">
                        <Sparkles className="size-3.5 text-violet-700" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        {summaryContent.title}
                      </span>
                      <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                        Generated in 1.2s
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none text-slate-600">
                      {summaryContent.content.split("\n\n").map((paragraph, i) => (
                        <p key={i} className="mb-3 leading-relaxed">
                          {paragraph.split("**").map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="font-semibold text-slate-800">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="flashcards"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-100">
                        <Layers className="size-3.5 text-indigo-700" />
                      </div>
                      <span className="text-sm font-semibold text-slate-900">
                        4 Flashcards Generated
                      </span>
                    </div>
                    {flashcards.map((card, index) => (
                      <motion.div
                        key={card.front}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                          Q{index + 1}
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {card.front}
                        </p>
                        <p className="mt-2 border-t border-slate-100 pt-2 text-sm text-slate-600">
                          {card.back}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
