"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

function LaptopMockup() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-violet-600/30 via-indigo-500/20 to-violet-400/10 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-violet-500/10">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex h-7 w-48 items-center justify-center rounded-md bg-white text-xs text-slate-400 ring-1 ring-slate-200">
            app.notecraftai.com
          </div>
        </div>
        <div className="grid grid-cols-[180px_1fr] bg-white">
          <div className="border-r border-slate-100 bg-slate-50/50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              My Notes
            </p>
            <div className="space-y-2">
              {["Biology 101", "History Essay", "AI Concepts"].map((note, i) => (
                <div
                  key={note}
                  className={`rounded-lg px-2.5 py-2 text-xs ${
                    i === 0
                      ? "bg-violet-100 font-medium text-violet-800"
                      : "text-slate-500"
                  }`}
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Biology 101 — Cell Structure
              </h3>
              <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-medium text-violet-700">
                AI Ready
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="h-2 w-full rounded-full bg-slate-100" />
              <div className="h-2 w-5/6 rounded-full bg-slate-100" />
              <div className="h-2 w-4/6 rounded-full bg-slate-100" />
              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50/50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">
                  AI Summary
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Cells are the fundamental units of life, enclosed by membranes
                  and containing organelles that perform specialized functions...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-3 h-3 w-32 rounded-b-xl bg-slate-200/80" />
      <div className="mx-auto h-1.5 w-48 rounded-full bg-slate-200/60" />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/40 via-transparent to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700">
                AI-Powered Note Taking
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Turn Notes Into{" "}
              <span className="bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
                Knowledge
              </span>{" "}
              Instantly
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 lg:mx-0 mx-auto"
            >
              NotecraftAI transforms your raw notes into AI summaries, flashcards,
              and study guides — so you spend less time organizing and more time
              learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center"
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 gap-2 bg-violet-700 px-8 text-base text-white shadow-xl shadow-violet-500/25 hover:bg-violet-800"
                >
                  Start for Free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 border-slate-200 px-8 text-base text-slate-700 hover:bg-slate-50"
              >
                <Play className="size-4 fill-current" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-sm text-slate-500"
            >
              No credit card required · Free forever plan available
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <LaptopMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
