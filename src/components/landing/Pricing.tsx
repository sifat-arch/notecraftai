"use client"

import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out NotecraftAI and light study sessions.",
    features: [
      "Up to 10 notes",
      "5 AI summaries per month",
      "Basic rich-text editor",
      "10 flashcards per note",
      "Cloud sync on 1 device",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Everything you need for serious students and power learners.",
    features: [
      "Unlimited notes",
      "Unlimited AI summaries",
      "Advanced rich-text editor",
      "Unlimited flashcards",
      "Priority AI processing",
      "Export to PDF & Markdown",
      "Cloud sync on all devices",
      "Email support",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "For study groups, classrooms, and collaborative learning.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared note libraries",
      "Admin dashboard",
      "Team analytics",
      "Priority support",
      "Custom integrations",
      "SSO authentication",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-violet-700">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Start free and upgrade when you&apos;re ready. No hidden fees, cancel
            anytime.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                plan.highlighted
                  ? "border-violet-500 bg-gradient-to-b from-violet-50/80 to-white shadow-xl shadow-violet-500/10 ring-1 ring-violet-500/20"
                  : "border-slate-200 bg-slate-50/50"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-700 to-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-500/30">
                    <Sparkles className="size-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <h3
                  className={cn(
                    "text-lg font-semibold",
                    plan.highlighted ? "text-violet-900" : "text-slate-900"
                  )}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "text-4xl font-bold tracking-tight",
                      plan.highlighted ? "text-violet-700" : "text-slate-900"
                    )}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-slate-500">/{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-3 text-sm text-slate-600"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.highlighted ? "text-violet-600" : "text-slate-400"
                      )}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <Link href="/dashboard" className="mt-8 block">
                <Button
                  className={cn(
                    "h-11 w-full text-sm font-semibold",
                    plan.highlighted
                      ? "bg-violet-700 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-800"
                      : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                  )}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
