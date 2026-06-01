"use client"

import { motion } from "framer-motion"

const companies = [
  { name: "Stanford", initials: "SU" },
  { name: "MIT OpenCourse", initials: "MIT" },
  { name: "Coursera", initials: "CO" },
  { name: "Khan Academy", initials: "KA" },
  { name: "Duolingo", initials: "DU" },
  { name: "Notion", initials: "NO" },
]

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-slate-400"
        >
          Trusted by students & educators worldwide
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center gap-2.5 opacity-50 grayscale transition-all hover:opacity-70"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-slate-200 text-xs font-bold text-slate-500">
                {company.initials}
              </div>
              <span className="text-sm font-semibold text-slate-500">
                {company.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
