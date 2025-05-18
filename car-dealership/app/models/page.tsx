"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

export default function ModelsPage() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Brand data
  const brands = [
    {
      id: "mazda",
      name: "Mazda",
      logo: "/mazda-logo.png",
      image: "/mazda-showcase.png",
      description:
        "Mazda's performance vehicles combine elegant design with engaging driving dynamics. From the iconic rotary-powered RX-7 and RX-8 to the nimble MX-5 Miata and versatile CX lineup, Mazda delivers vehicles that provide pure driving pleasure.",
      models: [
        "RX-7 FD3S",
        "RX-8",
        "MX-5 Miata (NA)",
        "MX-5 Miata (ND)",
        "Mazda 3",
        "Mazda 6",
        "CX-3",
        "CX-30",
        "CX-5",
        "CX-9",
      ],
    },
    {
      id: "nissan",
      name: "Nissan",
      logo: "/nissan-logo.png",
      image: "/nissan-showcase.png",
      description:
        "Nissan offers a range of high-performance vehicles known for their innovative technology and exceptional engineering. From the legendary GT-R to the versatile Z series, Nissan's performance lineup delivers thrilling driving experiences with cutting-edge technology.",
      models: [
        "GT-R R34",
        "GT-R R35",
        "Silvia S15",
        "370Z",
        "350Z",
        "Skyline R33",
        "Skyline R32",
        "Fairlady Z (Z32)",
        "Maxima",
        "Altima",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/multi-car-blueprint.png" alt="Models" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Our <span className="text-blue-400">Brands</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">Explore our collection of premium Mazda and Nissan vehicles</p>
        </div>
      </section>

      {/* Brands Section */}
      <section ref={ref} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
              Our <span className="text-blue-400">Brands</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Select a brand below to explore our comprehensive collection of premium vehicles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden group hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={brand.image || "/placeholder.svg?height=200&width=400&query=car showroom"}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

                  {/* Removed the problematic logo container */}

                  {/* Added brand name overlay instead */}
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-zinc-900/80 to-transparent p-4">
                    <h3 className="text-xl font-bold text-blue-400 uppercase tracking-wider">{brand.name}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">{brand.name}</h2>
                  <p className="text-zinc-400 mb-6">{brand.description}</p>

                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider text-blue-400 mb-3">Featured Models</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.models.slice(0, 8).map((model) => (
                        <span
                          key={model}
                          className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-xs border border-blue-500/20"
                        >
                          {model}
                        </span>
                      ))}
                      {brand.models.length > 8 && (
                        <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded text-xs border border-blue-500/20">
                          +{brand.models.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                    <Link href={`/models/${brand.id}`}>
                      Explore {brand.name} Models
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mazda Models Section */}
      <section className="py-20 bg-zinc-900/30 border-y border-blue-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
              Mazda <span className="text-blue-400">Models</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore our comprehensive collection of Mazda vehicles, from classic rotary-powered sports cars to modern
              SUVs and sedans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "RX-7 FD3S",
              "RX-8",
              "MX-5 Miata (NA)",
              "MX-5 Miata (ND)",
              "Mazda 3",
              "Mazda 6",
              "CX-3",
              "CX-30",
              "CX-5",
              "CX-9",
              "323 (Familia)",
              "626 (Capella)",
              "RX-3",
              "B-Series",
              "Cosmo Sport 110S",
            ].map((model, index) => (
              <motion.div
                key={model}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: inView ? 0 : 20, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.05 * (index % 10) }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300"
              >
                <Link href={`/models/mazda?model=${model.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                  <div className="text-center">
                    <h3 className="font-medium text-sm uppercase tracking-wider">{model}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
              <Link href="/models/mazda">View All Mazda Models</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nissan Models Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
              Nissan <span className="text-blue-400">Models</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Discover our selection of Nissan vehicles, featuring legendary performance cars, practical sedans, and
              capable SUVs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "GT-R R34",
              "GT-R R35",
              "Silvia S15",
              "370Z",
              "350Z",
              "Skyline R33",
              "Skyline R32",
              "Fairlady Z (Z32)",
              "Maxima",
              "Altima",
              "Sentra",
              "Juke",
              "Qashqai",
              "X-Trail",
              "Patrol",
            ].map((model, index) => (
              <motion.div
                key={model}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: inView ? 0 : 20, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.05 * (index % 10) }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300"
              >
                <Link href={`/models/nissan?model=${model.toLowerCase().replace(/\s+/g, "-")}`} className="block">
                  <div className="text-center">
                    <h3 className="font-medium text-sm uppercase tracking-wider">{model}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
              <Link href="/models/nissan">View All Nissan Models</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/30 border-t border-blue-500/20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wider">
            Find Your Perfect <span className="text-blue-400">Vehicle</span>
          </h2>
          <p className="text-xl mb-8 text-zinc-300 max-w-3xl mx-auto">
            Browse our complete inventory or explore vehicles by brand to discover your ideal Mazda or Nissan model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider"
            >
              <Link href="/inventory">Browse All Inventory</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg border-blue-500/50 text-blue-400 hover:bg-zinc-800 uppercase tracking-wider"
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
