"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function MarqueeSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const brands = [
    "Nissan",
    "Mazda",
    "Quality",
    "Innovation",
    "Service",
    "Excellence",
    "Performance",
    "Reliability",
    "Style",
    "Technology",
  ]

  return (
    <section ref={ref} className="py-10 bg-blue-500 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex"
      >
        <div className="animate-marquee whitespace-nowrap py-4">
          {brands.map((brand, index) => (
            <span key={index} className="text-4xl font-bold mx-8">
              {brand}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee whitespace-nowrap py-4" style={{ animationDelay: "15s" }}>
          {brands.map((brand, index) => (
            <span key={index} className="text-4xl font-bold mx-8">
              {brand}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
