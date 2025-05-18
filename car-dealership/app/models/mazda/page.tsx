"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowLeft, Calendar, Fuel, Gauge, Info } from "lucide-react"

export default function MazdaModelsPage() {
  const searchParams = useSearchParams()
  const selectedModelParam = searchParams.get("model")
  const [activeCategory, setActiveCategory] = useState("all")

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Mazda models data
  const mazdaModels = [
    {
      id: "mazda-rx7-fd3s",
      name: "Mazda RX-7 FD3S",
      price: 65000,
      year: 1999,
      image: "/mazda-rx7-fd3s-blueprint.png",
      category: "sports",
      description:
        "The Mazda RX-7 FD3S is a legendary sports car powered by a twin-turbocharged 13B-REW rotary engine. Known for its exceptional handling, lightweight design, and distinctive styling, the RX-7 FD3S remains one of the most iconic Japanese performance cars ever produced.",
      specs: {
        engine: "13B-REW Twin-Turbo Rotary",
        power: "255 HP",
        torque: "294 Nm",
        acceleration: "5.3 sec",
        topSpeed: "250 km/h",
        drivetrain: "RWD",
        weight: "1,300 kg",
      },
    },
    {
      id: "mazda-rx8",
      name: "Mazda RX-8",
      price: 28000,
      year: 2008,
      image: "/mazda-rx8-blueprint.png",
      category: "sports",
      description:
        "The Mazda RX-8 is a unique sports car featuring a naturally-aspirated RENESIS rotary engine and innovative freestyle doors. With perfect 50:50 weight distribution and a high-revving rotary engine, the RX-8 delivers an engaging driving experience with distinctive character.",
      specs: {
        engine: "13B-MSP Renesis Rotary",
        power: "232 HP",
        torque: "211 Nm",
        acceleration: "6.4 sec",
        topSpeed: "235 km/h",
        drivetrain: "RWD",
        weight: "1,310 kg",
      },
    },
    {
      id: "mazda-mx5-na",
      name: "Mazda MX-5 Miata (NA)",
      price: 25000,
      year: 1994,
      image: "/mazda-mx5-na-blueprint.png",
      category: "convertible",
      description:
        "The first-generation Mazda MX-5 Miata (NA) is a lightweight, rear-wheel-drive roadster that revitalized the affordable sports car market. With its perfect balance, responsive handling, and pure driving experience, the NA Miata embodies Mazda's 'Jinba Ittai' philosophy of horse and rider as one.",
      specs: {
        engine: "1.8L I4",
        power: "131 HP",
        torque: "152 Nm",
        acceleration: "8.1 sec",
        topSpeed: "205 km/h",
        drivetrain: "RWD",
        weight: "960 kg",
      },
    },
    {
      id: "mazda-mx5-nd",
      name: "Mazda MX-5 Miata (ND)",
      price: 32000,
      year: 2021,
      image: "/mazda-mx5-nd-blueprint.png",
      category: "convertible",
      description:
        "The fourth-generation Mazda MX-5 Miata (ND) continues the legacy of the world's best-selling roadster. Lighter and more refined than its predecessors, the ND Miata combines modern technology with the pure, engaging driving experience that has made the MX-5 an icon for over three decades.",
      specs: {
        engine: "2.0L SKYACTIV-G",
        power: "181 HP",
        torque: "205 Nm",
        acceleration: "6.5 sec",
        topSpeed: "219 km/h",
        drivetrain: "RWD",
        weight: "1,058 kg",
      },
    },
    {
      id: "mazda-3",
      name: "Mazda 3 (Axela)",
      price: 24000,
      year: 2022,
      image: "/mazda-3-blueprint.png",
      category: "sedan",
      description:
        "The Mazda 3 (Axela in Japan) is a compact car that combines sophisticated design with engaging driving dynamics. Available as a sedan or hatchback, the Mazda 3 features premium interior quality, advanced technology, and responsive handling that sets it apart from typical compact cars.",
      specs: {
        engine: "2.5L SKYACTIV-G",
        power: "186 HP",
        torque: "252 Nm",
        acceleration: "7.0 sec",
        topSpeed: "210 km/h",
        drivetrain: "FWD",
        weight: "1,408 kg",
      },
    },
    {
      id: "mazda-6",
      name: "Mazda 6 (Atenza)",
      price: 30000,
      year: 2021,
      image: "/mazda-6-blueprint.png",
      category: "sedan",
      description:
        "The Mazda 6 (Atenza) is a mid-size sedan that offers premium design, refined driving dynamics, and upscale features. With its elegant styling, driver-focused cockpit, and responsive handling, the Mazda 6 delivers a more engaging experience than typical family sedans.",
      specs: {
        engine: "2.5L Turbo SKYACTIV-G",
        power: "250 HP",
        torque: "420 Nm",
        acceleration: "6.4 sec",
        topSpeed: "240 km/h",
        drivetrain: "FWD",
        weight: "1,562 kg",
      },
    },
    {
      id: "mazda-cx3",
      name: "Mazda CX-3",
      price: 22000,
      year: 2021,
      image: "/mazda-cx3-blueprint.png",
      category: "suv",
      description:
        "The Mazda CX-3 is a subcompact crossover SUV that combines stylish design with nimble handling. Despite its compact dimensions, the CX-3 offers sophisticated styling, a well-appointed interior, and engaging driving dynamics that make it stand out in its segment.",
      specs: {
        engine: "2.0L SKYACTIV-G",
        power: "148 HP",
        torque: "195 Nm",
        acceleration: "8.5 sec",
        topSpeed: "200 km/h",
        drivetrain: "AWD",
        weight: "1,339 kg",
      },
    },
    {
      id: "mazda-cx30",
      name: "Mazda CX-30",
      price: 28500,
      year: 2023,
      image: "/mazda-cx30-blueprint.png",
      category: "suv",
      description:
        "The Mazda CX-30 is a compact crossover that bridges the gap between the CX-3 and CX-5. With its coupe-like styling, premium interior, and refined driving dynamics, the CX-30 offers a more upscale experience than typical compact SUVs while maintaining Mazda's signature driving enjoyment.",
      specs: {
        engine: "2.5L SKYACTIV-G",
        power: "186 HP",
        torque: "252 Nm",
        acceleration: "7.7 sec",
        topSpeed: "205 km/h",
        drivetrain: "AWD",
        weight: "1,483 kg",
      },
    },
    {
      id: "mazda-cx5",
      name: "Mazda CX-5",
      price: 31999,
      year: 2023,
      image: "/mazda-cx5-blueprint.png",
      category: "suv",
      description:
        "The Mazda CX-5 is a compact crossover SUV that offers a premium experience with its upscale design, refined interior, and engaging driving dynamics. The CX-5 stands out in its segment with responsive handling, quality materials, and a sophisticated design philosophy.",
      specs: {
        engine: "2.5L Turbo SKYACTIV-G",
        power: "250 HP",
        torque: "420 Nm",
        acceleration: "6.9 sec",
        topSpeed: "210 km/h",
        drivetrain: "AWD",
        weight: "1,659 kg",
      },
    },
    {
      id: "mazda-cx9",
      name: "Mazda CX-9",
      price: 38999,
      year: 2023,
      image: "/mazda-cx9-blueprint.png",
      category: "suv",
      description:
        "The Mazda CX-9 is a three-row midsize SUV that combines family-friendly practicality with upscale design and engaging driving dynamics. Despite its size, the CX-9 maintains Mazda's focus on driver enjoyment while offering premium features and sophisticated styling.",
      specs: {
        engine: "2.5L Turbo SKYACTIV-G",
        power: "250 HP",
        torque: "420 Nm",
        acceleration: "7.2 sec",
        topSpeed: "210 km/h",
        drivetrain: "AWD",
        weight: "1,969 kg",
      },
    },
    {
      id: "mazda-323",
      name: "Mazda 323 (Familia)",
      price: 15000,
      year: 1998,
      image: "/mazda-323-blueprint.png",
      category: "classic",
      description:
        "The Mazda 323 (Familia) is a compact car that has been a cornerstone of Mazda's lineup for decades. Known for its reliability, efficiency, and accessible performance, the 323 has taken many forms over the years, from practical family cars to rally-bred performance models.",
      specs: {
        engine: "1.8L I4",
        power: "114 HP",
        torque: "162 Nm",
        acceleration: "8.9 sec",
        topSpeed: "195 km/h",
        drivetrain: "FWD",
        weight: "1,070 kg",
      },
    },
    {
      id: "mazda-626",
      name: "Mazda 626 (Capella)",
      price: 18000,
      year: 1997,
      image: "/mazda-626-blueprint.png",
      category: "classic",
      description:
        "The Mazda 626 (Capella) is a mid-size sedan that offered a blend of practicality, reliability, and driving enjoyment. As Mazda's mainstream family car for many years, the 626 built a reputation for quality engineering and more engaging handling than many of its competitors.",
      specs: {
        engine: "2.0L I4",
        power: "125 HP",
        torque: "170 Nm",
        acceleration: "9.2 sec",
        topSpeed: "200 km/h",
        drivetrain: "FWD",
        weight: "1,280 kg",
      },
    },
    {
      id: "mazda-rx3",
      name: "Mazda RX-3",
      price: 45000,
      year: 1973,
      image: "/mazda-rx3-blueprint.png",
      category: "classic",
      description:
        "The Mazda RX-3 is a classic compact rotary-powered car produced in the 1970s. Available as a coupe, sedan, or wagon, the RX-3 combined distinctive styling with the unique characteristics of Mazda's rotary engine technology, making it a standout performer in its day.",
      specs: {
        engine: "12A Rotary",
        power: "110 HP",
        torque: "152 Nm",
        acceleration: "10.8 sec",
        topSpeed: "185 km/h",
        drivetrain: "RWD",
        weight: "884 kg",
      },
    },
    {
      id: "mazda-b-series",
      name: "Mazda B-Series Pickup",
      price: 22000,
      year: 2008,
      image: "/mazda-b-series-blueprint.png",
      category: "truck",
      description:
        "The Mazda B-Series is a line of pickup trucks that offered reliability, utility, and value. Known for their durability and straightforward design, these trucks provided practical capability for both work and recreational use, with various engine options and configurations available.",
      specs: {
        engine: "4.0L V6",
        power: "207 HP",
        torque: "319 Nm",
        acceleration: "8.6 sec",
        topSpeed: "175 km/h",
        drivetrain: "4WD",
        weight: "1,814 kg",
      },
    },
    {
      id: "mazda-cosmo-110s",
      name: "Mazda Cosmo Sport 110S",
      price: 120000,
      year: 1967,
      image: "/mazda-cosmo-110s-blueprint.png",
      category: "classic",
      description:
        "The Mazda Cosmo Sport 110S is a historic grand touring coupe that marked Mazda's first production rotary-engined car. With its futuristic styling, innovative technology, and smooth performance, the Cosmo Sport established Mazda's reputation for engineering innovation and distinctive design.",
      specs: {
        engine: "10A Rotary",
        power: "110 HP",
        torque: "130 Nm",
        acceleration: "8.8 sec",
        topSpeed: "185 km/h",
        drivetrain: "RWD",
        weight: "940 kg",
      },
    },
  ]

  // Filter models based on active category
  const filteredModels =
    activeCategory === "all" ? mazdaModels : mazdaModels.filter((model) => model.category === activeCategory)

  // Find selected model if URL parameter exists
  const selectedModel = selectedModelParam ? mazdaModels.find((model) => model.id.includes(selectedModelParam)) : null

  // Scroll to top when a model is selected
  useEffect(() => {
    if (selectedModel) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [selectedModel])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/mazda-showcase.png" alt="Mazda Models" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Mazda <span className="text-blue-400">Models</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Explore our collection of premium Mazda vehicles, from sports cars to SUVs
          </p>
        </div>
      </section>

      {/* Selected Model Detail */}
      {selectedModel && (
        <section className="py-12 relative z-10 bg-zinc-900/30 border-b border-blue-500/20">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button asChild variant="ghost" className="text-zinc-400 hover:text-white">
                <Link href="/models/mazda">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Mazda Models
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-blue-500/20 scan-effect">
                <Image
                  src={selectedModel.image || "/placeholder.svg?height=400&width=600&query=car blueprint"}
                  alt={selectedModel.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-2">{selectedModel.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-blue-400 text-lg font-bold">${selectedModel.price.toLocaleString()}</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-zinc-400">{selectedModel.year}</span>
                  <span className="text-zinc-500">|</span>
                  <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs uppercase">
                    {selectedModel.category}
                  </span>
                </div>

                <p className="text-zinc-300 mb-6">{selectedModel.description}</p>

                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">Engine:</span>
                    <span>{selectedModel.specs.engine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">Power:</span>
                    <span>{selectedModel.specs.power}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">Torque:</span>
                    <span>{selectedModel.specs.torque}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">0-60:</span>
                    <span>{selectedModel.specs.acceleration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">Top Speed:</span>
                    <span>{selectedModel.specs.topSpeed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">Drivetrain:</span>
                    <span>{selectedModel.specs.drivetrain}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                    <span className="text-zinc-400">Weight:</span>
                    <span>{selectedModel.specs.weight}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                    <Link href={`/inventory?search=${selectedModel.name}`}>Find Available Models</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-blue-500/30 text-blue-400 hover:bg-zinc-800 uppercase tracking-wider"
                  >
                    <Link href={`/contact?model=${selectedModel.id}`}>Inquire About This Model</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Models Section */}
      <section ref={ref} className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 flex items-center">
              <span className="text-blue-400 mr-2">Mazda Models</span>
              <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
            </h2>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="bg-zinc-800 border border-blue-500/20 w-full justify-start overflow-x-auto">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  All Models
                </TabsTrigger>
                <TabsTrigger
                  value="sports"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Sports
                </TabsTrigger>
                <TabsTrigger
                  value="convertible"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Convertible
                </TabsTrigger>
                <TabsTrigger
                  value="sedan"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Sedan
                </TabsTrigger>
                <TabsTrigger
                  value="suv"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  SUV
                </TabsTrigger>
                <TabsTrigger
                  value="classic"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Classic
                </TabsTrigger>
                <TabsTrigger
                  value="truck"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Truck
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
              >
                <Link href={`/models/mazda?model=${model.id}`}>
                  <div className="relative h-[200px] overflow-hidden scan-effect">
                    <Image
                      src={model.image || "/placeholder.svg?height=200&width=400&query=car blueprint"}
                      alt={model.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 bg-zinc-900/80 text-blue-400 py-1 px-3 text-xs uppercase tracking-wider border-r border-b border-blue-500/20">
                      {model.year}
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/models/mazda?model=${model.id}`}>
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-2 hover:text-blue-400 transition-colors">
                      {model.name}
                    </h3>
                  </Link>

                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-blue-400" />
                      <span>{model.year}</span>
                    </div>
                    <div className="flex items-center">
                      <Gauge className="h-3 w-3 mr-1 text-blue-400" />
                      <span>{model.specs.power}</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-3 w-3 mr-1 text-blue-400" />
                      <span>{model.specs.engine}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                      <span>{model.specs.drivetrain}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-bold text-blue-400">${model.price.toLocaleString()}</div>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs uppercase">
                      {model.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-500/20 hover:border-blue-500/50 text-zinc-300 uppercase tracking-wider text-xs"
                    >
                      <Link href={`/models/mazda?model=${model.id}`}>
                        <Info className="h-3 w-3 mr-1" />
                        Details
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 uppercase tracking-wider text-xs"
                    >
                      <Link href={`/inventory?search=${model.name}`}>Find Available</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-zinc-900/30 border-t border-blue-500/20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
            Ready to Experience <span className="text-blue-400">Mazda</span>?
          </h2>
          <p className="text-lg mb-8 text-zinc-300 max-w-3xl mx-auto">
            Browse our inventory to find your perfect Mazda vehicle or contact our team for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider"
            >
              <Link href="/inventory?make=Mazda">Browse Mazda Inventory</Link>
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
