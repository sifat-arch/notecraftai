"use client"

import { PenLine, Cpu, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    step: "01",
    title: "Write",
    description:
      "Capture lectures, readings, and ideas in our rich-text editor. Format with headings, lists, and highlights effortlessly.",
    icon: PenLine,
    color: "from-violet-600 to-violet-700",
  },
  {
    step: "02",
    title: "Process",
    description:
      "One click sends your notes to AI. Get instant summaries, key concepts extracted, and flashcards auto-generated.",
    icon: Cpu,
    color: "from-indigo-600 to-indigo-700",
  },
  {
    step: "03",
    title: "Study",
    description:
      "Review with smart flashcards and condensed summaries. Retain more in less time with AI-optimized study materials.",
    icon: GraduationCap,
    color: "from-violet-700 to-indigo-600",
  },
]

export default function Workflow() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Three steps to smarter studying
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From raw notes to exam-ready materials in minutes, not hours.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-violet-200 via-indigo-300 to-violet-200 lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  <div className="relative mx-auto mb-6 flex size-16 items-center justify-center">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-10`}
                    />
                    <div
                      className={`relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg shadow-violet-500/20`}
                    >
                      <Icon className="size-6 text-white" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-violet-700 ring-2 ring-violet-100">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
