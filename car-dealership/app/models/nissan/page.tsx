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

export default function NissanModelsPage() {
  const searchParams = useSearchParams()
  const selectedModelParam = searchParams.get("model")
  const [activeCategory, setActiveCategory] = useState("all")

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Nissan models data
  const nissanModels = [
    {
      id: "nissan-gtr-r34",
      name: "Nissan GT-R R34",
      price: 85000,
      year: 2002,
      image: "/nissan-gtr-r34-blueprint.png",
      category: "sports",
      description:
        "The Nissan GT-R R34 is a legendary Japanese sports car known for its advanced technology and exceptional performance. Featuring the iconic RB26DETT engine and sophisticated ATTESA E-TS all-wheel drive system, the R34 GT-R delivers an exhilarating driving experience that has made it a highly sought-after modern classic.",
      specs: {
        engine: "RB26DETT Twin-Turbo I6",
        power: "280 HP",
        torque: "392 Nm",
        acceleration: "4.8 sec",
        topSpeed: "265 km/h",
        drivetrain: "AWD",
        weight: "1,560 kg",
      },
    },
    {
      id: "nissan-gtr-r35",
      name: "Nissan GT-R R35",
      price: 110000,
      year: 2021,
      image: "/nissan-gtr-r35-blueprint.png",
      category: "sports",
      description:
        "The Nissan GT-R R35 continues the legacy of Nissan's flagship performance car with cutting-edge technology and blistering performance. With its hand-built twin-turbocharged V6 engine, sophisticated all-wheel-drive system, and dual-clutch transmission, the R35 GT-R delivers supercar performance with everyday usability.",
      specs: {
        engine: "3.8L Twin-Turbo V6",
        power: "565 HP",
        torque: "633 Nm",
        acceleration: "2.7 sec",
        topSpeed: "315 km/h",
        drivetrain: "AWD",
        weight: "1,752 kg",
      },
    },
    {
      id: "nissan-silvia-s15",
      name: "Nissan Silvia S15",
      price: 45000,
      year: 2000,
      image: "/nissan-silvia-s15-blueprint.png",
      category: "sports",
      description:
        "The Nissan Silvia S15 is a rear-wheel-drive sports coupe beloved for its balanced handling and tuning potential. The S15 represents the final evolution of the Silvia lineage, combining sleek styling with the turbocharged SR20DET engine to create a driver-focused sports car that has become a drifting and motorsport icon.",
      specs: {
        engine: "SR20DET Turbo I4",
        power: "250 HP",
        torque: "275 Nm",
        acceleration: "5.5 sec",
        topSpeed: "235 km/h",
        drivetrain: "RWD",
        weight: "1,240 kg",
      },
    },
    {
      id: "nissan-370z",
      name: "Nissan 370Z",
      price: 42000,
      year: 2020,
      image: "/nissan-370z-blueprint.png",
      category: "sports",
      description:
        "The Nissan 370Z is a pure sports car that offers an engaging driving experience with its front-engine, rear-wheel-drive layout. Featuring a naturally aspirated V6 engine, short wheelbase, and responsive handling, the 370Z continues Nissan's Z-car heritage with a focus on driver involvement and accessible performance.",
      specs: {
        engine: "3.7L V6",
        power: "332 HP",
        torque: "366 Nm",
        acceleration: "5.1 sec",
        topSpeed: "250 km/h",
        drivetrain: "RWD",
        weight: "1,496 kg",
      },
    },
    {
      id: "nissan-350z",
      name: "Nissan 350Z",
      price: 38000,
      year: 2007,
      image: "/nissan-350z-blueprint.png",
      category: "sports",
      description:
        "The Nissan 350Z revitalized the iconic Z-car lineage with its bold styling and focused performance. With a powerful V6 engine, rear-wheel drive, and balanced chassis, the 350Z delivers an authentic sports car experience that emphasizes driver engagement and accessible performance.",
      specs: {
        engine: "3.5L V6",
        power: "306 HP",
        torque: "363 Nm",
        acceleration: "5.2 sec",
        topSpeed: "250 km/h",
        drivetrain: "RWD",
        weight: "1,470 kg",
      },
    },
    {
      id: "nissan-skyline-r33",
      name: "Nissan Skyline R33",
      price: 78000,
      year: 1998,
      image: "/nissan-skyline-r33-blueprint.png",
      category: "sports",
      description:
        "The Nissan Skyline R33 GT-R is a technological tour de force that refined the performance capabilities established by its predecessor. With improvements to the ATTESA E-TS all-wheel drive system and the twin-turbocharged RB26DETT engine, the R33 GT-R delivered enhanced performance and handling that helped it earn its 'Godzilla' nickname.",
      specs: {
        engine: "RB26DETT Twin-Turbo I6",
        power: "276 HP",
        torque: "368 Nm",
        acceleration: "5.2 sec",
        topSpeed: "250 km/h",
        drivetrain: "AWD",
        weight: "1,530 kg",
      },
    },
    {
      id: "nissan-skyline-r32",
      name: "Nissan Skyline R32",
      price: 70000,
      year: 1993,
      image: "/nissan-skyline-r32-blueprint.png",
      category: "sports",
      description:
        "The Nissan Skyline R32 GT-R is the legendary 'Godzilla' that dominated motorsports and established the GT-R's performance credentials. With its advanced ATTESA E-TS all-wheel drive system, four-wheel steering, and twin-turbocharged RB26DETT engine, the R32 GT-R delivered performance that was ahead of its time.",
      specs: {
        engine: "RB26DETT Twin-Turbo I6",
        power: "276 HP",
        torque: "353 Nm",
        acceleration: "5.6 sec",
        topSpeed: "245 km/h",
        drivetrain: "AWD",
        weight: "1,430 kg",
      },
    },
    {
      id: "nissan-fairlady-z32",
      name: "Nissan Fairlady Z (Z32)",
      price: 35000,
      year: 1996,
      image: "/nissan-fairlady-z32-blueprint.png",
      category: "sports",
      description:
        "The Nissan Fairlady Z (Z32), known as the 300ZX in many markets, is a sophisticated sports car that combined cutting-edge technology with striking design. Available with a naturally aspirated or twin-turbocharged V6 engine, the Z32 offered impressive performance and refinement that made it a standout performance car of the 1990s.",
      specs: {
        engine: "3.0L Twin-Turbo V6",
        power: "300 HP",
        torque: "384 Nm",
        acceleration: "5.0 sec",
        topSpeed: "250 km/h",
        drivetrain: "RWD",
        weight: "1,531 kg",
      },
    },
    {
      id: "nissan-maxima",
      name: "Nissan Maxima",
      price: 36000,
      year: 2022,
      image: "/nissan-maxima-blueprint.png",
      category: "sedan",
      description:
        "The Nissan Maxima is a full-size sedan that combines luxury features with sporty performance. Often referred to as the '4-Door Sports Car,' the Maxima offers a powerful V6 engine, premium interior appointments, and athletic handling that sets it apart from typical family sedans.",
      specs: {
        engine: "3.5L V6",
        power: "300 HP",
        torque: "353 Nm",
        acceleration: "5.8 sec",
        topSpeed: "220 km/h",
        drivetrain: "FWD",
        weight: "1,645 kg",
      },
    },
    {
      id: "nissan-altima",
      name: "Nissan Altima",
      price: 26500,
      year: 2023,
      image: "/nissan-altima-blueprint.png",
      category: "sedan",
      description:
        "The Nissan Altima is a mid-size sedan that offers a compelling blend of efficiency, comfort, and technology. With available all-wheel drive and innovative engine options, the Altima provides a practical yet engaging driving experience with features typically found in more expensive vehicles.",
      specs: {
        engine: "2.5L I4",
        power: "188 HP",
        torque: "244 Nm",
        acceleration: "7.4 sec",
        topSpeed: "210 km/h",
        drivetrain: "FWD",
        weight: "1,451 kg",
      },
    },
    {
      id: "nissan-sentra",
      name: "Nissan Sentra",
      price: 21500,
      year: 2023,
      image: "/nissan-sentra-blueprint.png",
      category: "sedan",
      description:
        "The Nissan Sentra is a compact sedan that offers upscale features and styling in an affordable package. With its efficient engine, comfortable interior, and comprehensive safety features, the Sentra provides excellent value while delivering a more premium experience than typical compact cars.",
      specs: {
        engine: "2.0L I4",
        power: "149 HP",
        torque: "198 Nm",
        acceleration: "8.0 sec",
        topSpeed: "195 km/h",
        drivetrain: "FWD",
        weight: "1,345 kg",
      },
    },
    {
      id: "nissan-juke",
      name: "Nissan Juke",
      price: 24000,
      year: 2022,
      image: "/nissan-juke-blueprint.png",
      category: "suv",
      description:
        "The Nissan Juke is a subcompact crossover with distinctive styling and sporty handling. With its unique design, turbocharged engine options, and agile driving dynamics, the Juke stands out in the crowded crossover segment by offering a more engaging driving experience and bold personality.",
      specs: {
        engine: "1.6L Turbo I4",
        power: "188 HP",
        torque: "240 Nm",
        acceleration: "7.0 sec",
        topSpeed: "215 km/h",
        drivetrain: "AWD",
        weight: "1,315 kg",
      },
    },
    {
      id: "nissan-qashqai",
      name: "Nissan Qashqai",
      price: 27000,
      year: 2022,
      image: "/nissan-qashqai-blueprint.png",
      category: "suv",
      description:
        "The Nissan Qashqai (known as the Rogue Sport in some markets) is a compact crossover that offers a perfect balance of practicality, efficiency, and style. With its versatile interior, comfortable ride, and comprehensive safety features, the Qashqai provides an ideal blend of SUV capability and car-like driving dynamics.",
      specs: {
        engine: "1.3L Turbo I4",
        power: "158 HP",
        torque: "270 Nm",
        acceleration: "9.2 sec",
        topSpeed: "200 km/h",
        drivetrain: "AWD",
        weight: "1,425 kg",
      },
    },
    {
      id: "nissan-x-trail",
      name: "Nissan X-Trail",
      price: 32000,
      year: 2022,
      image: "/nissan-x-trail-blueprint.png",
      category: "suv",
      description:
        "The Nissan X-Trail (known as the Rogue in some markets) is a versatile compact SUV that offers family-friendly features and capable performance. With available three-row seating, efficient powertrains, and advanced safety technology, the X-Trail provides practical utility for everyday adventures.",
      specs: {
        engine: "2.5L I4",
        power: "181 HP",
        torque: "245 Nm",
        acceleration: "8.6 sec",
        topSpeed: "190 km/h",
        drivetrain: "AWD",
        weight: "1,547 kg",
      },
    },
    {
      id: "nissan-patrol",
      name: "Nissan Patrol",
      price: 65000,
      year: 2022,
      image: "/nissan-patrol-blueprint.png",
      category: "suv",
      description:
        "The Nissan Patrol is a full-size SUV that combines luxury with genuine off-road capability. With its powerful V8 engine, sophisticated four-wheel-drive system, and premium interior appointments, the Patrol offers the versatility to tackle challenging terrain while providing comfort and refinement for everyday driving.",
      specs: {
        engine: "5.6L V8",
        power: "400 HP",
        torque: "560 Nm",
        acceleration: "6.6 sec",
        topSpeed: "210 km/h",
        drivetrain: "4WD",
        weight: "2,715 kg",
      },
    },
  ]

  // Filter models based on active category
  const filteredModels =
    activeCategory === "all" ? nissanModels : nissanModels.filter((model) => model.category === activeCategory)

  // Find selected model if URL parameter exists
  const selectedModel = selectedModelParam ? nissanModels.find((model) => model.id.includes(selectedModelParam)) : null

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
        <Image src="/nissan-showcase.png" alt="Nissan Models" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Nissan <span className="text-blue-400">Models</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Explore our collection of premium Nissan vehicles, from legendary GT-Rs to versatile SUVs
          </p>
        </div>
      </section>

      {/* Selected Model Detail */}
      {selectedModel && (
        <section className="py-12 relative z-10 bg-zinc-900/30 border-b border-blue-500/20">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button asChild variant="ghost" className="text-zinc-400 hover:text-white">
                <Link href="/models/nissan">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Nissan Models
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
              <span className="text-blue-400 mr-2">Nissan Models</span>
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
                <Link href={`/models/nissan?model=${model.id}`}>
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
                  <Link href={`/models/nissan?model=${model.id}`}>
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
                      <Link href={`/models/nissan?model=${model.id}`}>
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
            Ready to Experience <span className="text-blue-400">Nissan</span>?
          </h2>
          <p className="text-lg mb-8 text-zinc-300 max-w-3xl mx-auto">
            Browse our inventory to find your perfect Nissan vehicle or contact our team for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider"
            >
              <Link href="/inventory?make=Nissan">Browse Nissan Inventory</Link>
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
