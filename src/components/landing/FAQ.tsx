"use client"

import { motion } from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is NotecraftAI?",
    answer:
      "NotecraftAI is an AI-powered note-taking platform designed for students and learners. It combines a rich-text editor with intelligent tools that automatically generate summaries, flashcards, and study guides from your notes.",
  },
  {
    question: "How does the AI summary feature work?",
    answer:
      "Simply write or paste your notes, then click the 'Generate Summary' button. Our AI analyzes your content, identifies key concepts, and produces a concise, exam-ready summary in seconds. You can regenerate or edit summaries at any time.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. All notes are encrypted in transit and at rest. We never sell your data or use your notes to train AI models without explicit consent. Your notes belong to you, and you can export or delete them at any time.",
  },
  {
    question: "Can I use NotecraftAI for free?",
    answer:
      "Yes! Our Free plan includes up to 10 notes, 5 AI summaries per month, and basic flashcard generation. It's perfect for trying out the platform. Upgrade to Pro when you need unlimited access.",
  },
  {
    question: "What file formats can I export?",
    answer:
      "Pro and Team plans support exporting notes as PDF and Markdown. You can also copy summaries and flashcards directly to your clipboard or share them via a link with classmates.",
  },
  {
    question: "Does NotecraftAI work offline?",
    answer:
      "NotecraftAI requires an internet connection for AI features like summaries and flashcard generation. However, you can write and edit notes offline — they'll sync automatically when you're back online.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your Pro or Team subscription at any time from your account settings. You'll retain access until the end of your billing period, and your notes will always remain accessible on the Free plan.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about NotecraftAI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-slate-200 bg-white px-6 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
