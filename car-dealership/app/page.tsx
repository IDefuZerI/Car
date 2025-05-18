"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search, ArrowRight, Info } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import VehicleExplorer from "@/components/vehicle-explorer"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all")

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: featuredRef, inView: featuredInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: categoriesRef, inView: categoriesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: searchRef, inView: searchInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const scrollToContent = () => {
    const contentSection = document.getElementById("content")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Featured vehicles data
  const featuredVehicles = [
    {
      id: "gtr-r34",
      name: "Nissan Skyline GT-R R34",
      price: 85000,
      year: 2002,
      image: "/silver-r34-blueprint.png",
      category: "sports",
      specs: {
        engine: "RB26DETT",
        power: "280 HP",
        torque: "392 Nm",
        acceleration: "4.8 sec",
        drivetrain: "AWD",
        weight: "1,560 kg",
      },
    },
    {
      id: "gtr-r33",
      name: "Nissan Skyline GT-R R33",
      price: 78000,
      year: 1998,
      image: "/nissan-skyline-r33-blueprint.png",
      category: "sports",
      specs: {
        engine: "RB26DETT",
        power: "276 HP",
        torque: "368 Nm",
        acceleration: "5.2 sec",
        drivetrain: "AWD",
        weight: "1,530 kg",
      },
    },
    {
      id: "rx7-fd",
      name: "Mazda RX-7 FD",
      price: 65000,
      year: 1999,
      image: "/red-rx7-blueprint.png",
      category: "sports",
      specs: {
        engine: "13B-REW",
        power: "255 HP",
        torque: "294 Nm",
        acceleration: "5.3 sec",
        drivetrain: "RWD",
        weight: "1,300 kg",
      },
    },
    {
      id: "supra-mk4",
      name: "Toyota Supra MK4",
      price: 95000,
      year: 1998,
      image: "/toyota-supra-blueprint.png",
      category: "sports",
      specs: {
        engine: "2JZ-GTE",
        power: "320 HP",
        torque: "440 Nm",
        acceleration: "4.6 sec",
        drivetrain: "RWD",
        weight: "1,570 kg",
      },
    },
  ]

  // All vehicles data
  const allVehicles = [
    ...featuredVehicles,
    {
      id: "silvia-s15",
      name: "Nissan Silvia S15",
      price: 45000,
      year: 2000,
      image: "/nissan-silvia-blueprint.png",
      category: "sports",
      specs: {
        engine: "SR20DET",
        power: "250 HP",
        torque: "275 Nm",
        acceleration: "5.5 sec",
        drivetrain: "RWD",
        weight: "1,240 kg",
      },
    },
    {
      id: "lancer-evo",
      name: "Mitsubishi Lancer Evolution",
      price: 55000,
      year: 2006,
      image: "/lancer-evo-blueprint.png",
      category: "sports",
      specs: {
        engine: "4G63",
        power: "286 HP",
        torque: "392 Nm",
        acceleration: "4.9 sec",
        drivetrain: "AWD",
        weight: "1,410 kg",
      },
    },
    {
      id: "impreza-wrx",
      name: "Subaru Impreza WRX STI",
      price: 52000,
      year: 2005,
      image: "/subaru-wrx-blueprint.png",
      category: "sports",
      specs: {
        engine: "EJ257",
        power: "300 HP",
        torque: "407 Nm",
        acceleration: "4.7 sec",
        drivetrain: "AWD",
        weight: "1,495 kg",
      },
    },
    {
      id: "mx5-miata",
      name: "Mazda MX-5 Miata",
      price: 32000,
      year: 2004,
      image: "/mazda-mx5-blueprint.png",
      category: "convertible",
      specs: {
        engine: "BP-ZE",
        power: "146 HP",
        torque: "168 Nm",
        acceleration: "7.9 sec",
        drivetrain: "RWD",
        weight: "1,065 kg",
      },
    },
    {
      id: "350z",
      name: "Nissan 350Z",
      price: 38000,
      year: 2007,
      image: "/nissan-350z-blueprint.png",
      category: "sports",
      specs: {
        engine: "VQ35DE",
        power: "306 HP",
        torque: "363 Nm",
        acceleration: "5.2 sec",
        drivetrain: "RWD",
        weight: "1,470 kg",
      },
    },
    {
      id: "rx8",
      name: "Mazda RX-8",
      price: 28000,
      year: 2008,
      image: "/mazda-rx8-blueprint.png",
      category: "sports",
      specs: {
        engine: "13B-MSP",
        power: "232 HP",
        torque: "211 Nm",
        acceleration: "6.4 sec",
        drivetrain: "RWD",
        weight: "1,310 kg",
      },
    },
    {
      id: "s2000",
      name: "Honda S2000",
      price: 42000,
      year: 2005,
      image: "/honda-s2000-blueprint.png",
      category: "convertible",
      specs: {
        engine: "F20C",
        power: "240 HP",
        torque: "208 Nm",
        acceleration: "5.8 sec",
        drivetrain: "RWD",
        weight: "1,250 kg",
      },
    },
    {
      id: "nsx",
      name: "Honda NSX",
      price: 110000,
      year: 2002,
      image: "/honda-nsx-blueprint.png",
      category: "supercar",
      specs: {
        engine: "C32B",
        power: "290 HP",
        torque: "304 Nm",
        acceleration: "5.0 sec",
        drivetrain: "RWD",
        weight: "1,430 kg",
      },
    },
  ]

  // Filter vehicles based on active category
  const filteredVehicles =
      activeCategory === "all" ? allVehicles : allVehicles.filter((vehicle) => vehicle.category === activeCategory)

  return (
      <div className="flex flex-col min-h-screen">
        {/* Hero Section with Blueprint Aesthetic */}
        <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: heroInView ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4"
          >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="uppercase tracking-widest text-blue-400 mb-2 text-sm font-medium"
            >
              Premium Performance Vehicle Dealership
            </motion.div>
            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white uppercase"
            >
              Auto<span className="text-blue-400">Tech</span>
            </motion.h1>
            <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-zinc-300"
            >
              Precision engineering meets automotive excellence. Explore our extensive collection of performance vehicles.
            </motion.p>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                  asChild
                  size="lg"
                  className="text-lg bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider"
              >
                <Link href="/inventory">Browse Inventory</Link>
              </Button>
              <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg border-blue-500/50 text-blue-400 hover:bg-zinc-800 uppercase tracking-wider"
              >
                <Link href="/contact">Visit Showroom</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Technical Blueprint Background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Image src="/multi-car-blueprint.png" alt="Technical Blueprint" fill className="object-cover" />
          </div>

          {/* Scroll indicator */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
              onClick={scrollToContent}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-blue-400 mb-2 uppercase tracking-wider">Scroll to explore</span>
              <ChevronDown className="h-6 w-6 text-blue-400 animate-bounce" />
            </div>
          </motion.div>
        </section>

        <div id="content"></div>

        {/* Search Section */}
        <section ref={searchRef} className="py-12 relative z-10 border-y border-blue-500/20">
          <div className="container mx-auto px-4">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: searchInView ? 0 : 30, opacity: searchInView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
              <div className="bg-zinc-900/80 border border-blue-500/20 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 uppercase tracking-wider text-blue-400">
                  Find Your Perfect Vehicle
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Make/Model</label>
                    <Input
                        placeholder="Any make or model"
                        className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Price Range</label>
                    <select className="w-full h-10 px-3 py-2 bg-zinc-800 border border-blue-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-100">
                      <option value="">Any price</option>
                      <option value="0-30000">Under $30,000</option>
                      <option value="30000-50000">$30,000 - $50,000</option>
                      <option value="50000-80000">$50,000 - $80,000</option>
                      <option value="80000+">$80,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Category</label>
                    <select className="w-full h-10 px-3 py-2 bg-zinc-800 border border-blue-500/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-zinc-100">
                      <option value="">All categories</option>
                      <option value="sports">Sports</option>
                      <option value="convertible">Convertible</option>
                      <option value="supercar">Supercar</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                    <Search className="h-4 w-4 mr-2" />
                    Search Vehicles
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Vehicles Section */}
        <section ref={featuredRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: featuredInView ? 0 : 50, opacity: featuredInView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
              <div className="flex items-center">
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                  Featured <span className="text-blue-400">Vehicles</span>
                </h2>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </div>
              <p className="text-zinc-400 mt-4 max-w-2xl">
                Explore our selection of premium performance vehicles, each one meticulously maintained and ready for the
                road
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVehicles.map((vehicle, index) => (
                  <motion.div
                      key={vehicle.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: featuredInView ? 0 : 50, opacity: featuredInView ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <div className="relative h-[200px] overflow-hidden scan-effect">
                      <Image
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-0 left-0 bg-zinc-900/80 text-blue-400 py-1 px-3 text-xs uppercase tracking-wider border-r border-b border-blue-500/20">
                        {vehicle.year}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold uppercase tracking-wider mb-2">{vehicle.name}</h3>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold text-blue-400">${vehicle.price.toLocaleString()}</div>
                        <Badge className="bg-zinc-800 text-zinc-300 border border-blue-500/20 uppercase text-xs">
                          {vehicle.category}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 mb-4">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                          Engine: {vehicle.specs.engine}
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                          Power: {vehicle.specs.power}
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                          0-60: {vehicle.specs.acceleration}
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                          Drive: {vehicle.specs.drivetrain}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex-1 border-blue-500/20 hover:border-blue-500/50 text-zinc-300 uppercase tracking-wider text-xs"
                        >
                          <Link href={`/vehicles/${vehicle.id}`}>
                            <Info className="h-3 w-3 mr-1" />
                            Details
                          </Link>
                        </Button>
                        <Button
                            asChild
                            size="sm"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 uppercase tracking-wider text-xs"
                        >
                          <Link href={`/contact?vehicle=${vehicle.id}`}>Visit Showroom</Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: featuredInView ? 0 : 30, opacity: featuredInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 text-center"
            >
              <Button asChild className="bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                <Link href="/inventory">
                  View All Vehicles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Vehicle Explorer Section (замість Vehicle Categories) */}
        <section ref={categoriesRef} className="relative z-10 border-y border-blue-500/20">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: categoriesInView ? 1 : 0 }}
              transition={{ duration: 0.8 }}
          >
            <VehicleExplorer />
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: categoriesInView ? 0 : 50, opacity: categoriesInView ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
              <div className="flex items-center">
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                  Why Choose <span className="text-blue-400">AutoTech</span>
                </h2>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: categoriesInView ? 0 : 50, opacity: categoriesInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Premium Selection</h3>
                <p className="text-zinc-400">
                  Our inventory features only the finest performance vehicles, each one carefully selected and maintained
                  to the highest standards.
                </p>
              </motion.div>

              <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: categoriesInView ? 0 : 50, opacity: categoriesInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Performance Focused</h3>
                <p className="text-zinc-400">
                  We specialize in high-performance vehicles that deliver exceptional driving experiences, from JDM
                  legends to modern supercars.
                </p>
              </motion.div>

              <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: categoriesInView ? 0 : 50, opacity: categoriesInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg"
              >
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center mb-4">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Expert Team</h3>
                <p className="text-zinc-400">
                  Our staff consists of passionate automotive enthusiasts with deep knowledge of performance vehicles and
                  their technical specifications.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
  )
}
