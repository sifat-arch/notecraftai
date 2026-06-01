"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Medical Student, UCLA",
    avatar: "SC",
    rating: 5,
    content:
      "NotecraftAI cut my study prep time in half. The AI summaries are shockingly accurate, and the flashcards it generates are exactly what I need for exams.",
  },
  {
    name: "Marcus Johnson",
    role: "Computer Science, MIT",
    avatar: "MJ",
    rating: 5,
    content:
      "I've tried every note app out there. NotecraftAI is the first one that actually understands my notes and turns them into something useful. Game changer.",
  },
  {
    name: "Emily Rodriguez",
    role: "High School Teacher",
    avatar: "ER",
    rating: 5,
    content:
      "I recommend NotecraftAI to all my AP students. The one-click summary feature helps them review complex topics quickly before tests.",
  },
  {
    name: "David Park",
    role: "Law Student, Columbia",
    avatar: "DP",
    rating: 5,
    content:
      "Case briefs used to take me hours. Now I write my notes during class and let NotecraftAI distill them into concise summaries I can review on the go.",
  },
  {
    name: "Aisha Patel",
    role: "Biology Major, Stanford",
    avatar: "AP",
    rating: 5,
    content:
      "The flashcard generation is incredible. It picks out the most important concepts from my lecture notes automatically. My GPA went up this semester.",
  },
  {
    name: "James Wilson",
    role: "PhD Candidate, Oxford",
    avatar: "JW",
    rating: 5,
    content:
      "As a researcher, I need to synthesize hundreds of papers. NotecraftAI helps me organize and summarize my reading notes efficiently.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Loved by students everywhere
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Join thousands of learners who study smarter with NotecraftAI.
          </p>
        </motion.div>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="mb-6 break-inside-avoid rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
