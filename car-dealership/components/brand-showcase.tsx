"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function BrandShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Our Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are proud to be an authorized dealer for these premium automotive brands. Explore our selection of new
            and used vehicles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Nissan Brand */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: inView ? 0 : -100, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/nissan-showcase.png"
                alt="Nissan Vehicles"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <Image src="/nissan-logo.png" alt="Nissan Logo" width={160} height={80} className="object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Nissan</h3>
              <p className="text-gray-600 mb-8 text-center">
                Discover Nissan's innovative lineup of sedans, SUVs, trucks, and crossovers. Known for reliability,
                technology, and value, Nissan offers vehicles for every lifestyle.
              </p>
              <div className="flex justify-center">
                <Button asChild className="bg-blue-500 hover:bg-blue-600">
                  <Link href="/brands/nissan">Explore Nissan Models</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Mazda Brand */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-[250px] overflow-hidden">
              <Image
                src="/mazda-showcase.png"
                alt="Mazda Vehicles"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <Image src="/mazda-logo.png" alt="Mazda Logo" width={160} height={80} className="object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Mazda</h3>
              <p className="text-gray-600 mb-8 text-center">
                Experience Mazda's blend of sophisticated design, exhilarating driving dynamics, and premium
                craftsmanship. From sedans to SUVs, Mazda delivers vehicles that inspire.
              </p>
              <div className="flex justify-center">
                <Button asChild className="bg-blue-500 hover:bg-blue-600">
                  <Link href="/brands/mazda">Explore Mazda Models</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
