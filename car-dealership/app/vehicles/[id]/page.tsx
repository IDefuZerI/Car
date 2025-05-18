"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Info, Share2, RotateCcw, Maximize, Minimize } from "lucide-react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"

// Dynamically import 3D component to avoid SSR issues
const VehicleModel = dynamic(() => import("@/components/vehicle-model"), {
  ssr: false,
  loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
  ),
})

// Example vehicle data - in a real app this would come from your database
const vehiclesData = {
  "gtr-r34": {
    id: "gtr-r34",
    name: "Nissan Skyline GT-R R34",
    price: 85000,
    year: 2002,
    image: "/silver-r34-blueprint.png",
    modelPath: "/models/gtr-r34.glb", // Path to the 3D model
    category: "sports",
    description:
        "The Nissan Skyline GT-R (R34) is a sports car and grand tourer produced by Nissan. It was the fifth generation of the Nissan Skyline GT-R, a performance variant of the Nissan Skyline. Production of the R34 GT-R began in January 1999 and ended in 2002.",
    specs: {
      engine: "RB26DETT Twin-Turbo Inline-6",
      power: "280 HP",
      torque: "392 Nm",
      acceleration: "4.8 sec",
      topSpeed: "265 km/h",
      transmission: "6-speed manual",
      drivetrain: "ATTESA E-TS AWD",
      weight: "1,560 kg",
      length: "4,600 mm",
      width: "1,785 mm",
      height: "1,360 mm",
      wheelbase: "2,665 mm",
      fuelEconomy: "11.7 L/100km",
    },
    features: [
      "Multi-Function Display",
      "ATTESA E-TS Pro AWD System",
      "Super HICAS 4-Wheel Steering",
      "Brembo Brakes",
      "Limited Slip Differential",
      "Xenon Headlights",
      "17-inch Alloy Wheels",
      "Leather/Suede Interior",
      "Climate Control",
      "Power Windows and Mirrors",
    ],
    gallery: ["/gtr-r34-front.jpg", "/gtr-r34-rear.jpg", "/gtr-r34-interior.jpg", "/gtr-r34-engine.jpg"],
    colors: ["Bayside Blue", "Midnight Purple", "Silver", "White", "Black"],
  },
  "rx7-fd": {
    id: "rx7-fd",
    name: "Mazda RX-7 FD",
    price: 65000,
    year: 1999,
    image: "/red-rx7-blueprint.png",
    modelPath: "/models/rx7-fd.glb", // Path to the 3D model
    category: "sports",
    description:
        "The Mazda RX-7 FD is a legendary sports car powered by a twin-turbocharged 13B-REW rotary engine. Known for its exceptional handling, lightweight design, and distinctive styling, the RX-7 FD remains one of the most iconic Japanese performance cars ever produced.",
    specs: {
      engine: "13B-REW Twin-Turbo Rotary",
      power: "255 HP",
      torque: "294 Nm",
      acceleration: "5.3 sec",
      topSpeed: "250 km/h",
      transmission: "5-speed manual",
      drivetrain: "RWD",
      weight: "1,300 kg",
      length: "4,295 mm",
      width: "1,760 mm",
      height: "1,230 mm",
      wheelbase: "2,425 mm",
      fuelEconomy: "14.2 L/100km",
    },
    features: [
      "Twin Sequential Turbochargers",
      "Power-assisted Rack-and-pinion Steering",
      "Four-wheel Disc Brakes",
      "Limited Slip Differential",
      "Leather Interior",
      "Power Windows and Mirrors",
      "Air Conditioning",
      "Premium Sound System",
      "Aluminum Pedals",
      "Rear Spoiler",
    ],
    gallery: ["/rx7-front.jpg", "/rx7-rear.jpg", "/rx7-interior.jpg", "/rx7-engine.jpg"],
    colors: ["Vintage Red", "Competition Yellow", "Montego Blue", "Silver Stone", "Pure White"],
  },
  // Add more vehicles here
}

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vehicleId = params.id as string
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const modelContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, you'd fetch this data from your API
    if (vehicleId && vehiclesData[vehicleId]) {
      setVehicle(vehiclesData[vehicleId])
    }
    setLoading(false)
  }, [vehicleId])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (modelContainerRef.current?.requestFullscreen) {
        modelContainerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleModelLoaded = () => {
    setIsModelLoaded(true)
  }

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
    )
  }

  if (!vehicle) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="mb-8">The vehicle you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/inventory">Return to Inventory</Link>
          </Button>
        </div>
    )
  }

  return (
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
          {/* Back button */}
          <div className="container mx-auto px-4 py-6">
            <Button asChild variant="ghost" className="text-zinc-400 hover:text-white">
              <Link href="/inventory">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Inventory
              </Link>
            </Button>
          </div>

          {/* Vehicle title */}
          <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="container mx-auto px-4 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                  {vehicle.name} <span className="text-blue-400">{vehicle.year}</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-zinc-800 text-zinc-300 border border-blue-500/20 uppercase text-xs">
                    {vehicle.category}
                  </Badge>
                  <span className="text-zinc-400">|</span>
                  <span className="text-zinc-400 text-sm">ID: {vehicle.id}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-400">${vehicle.price.toLocaleString()}</div>
            </div>
          </motion.div>

          {/* 3D Model */}
          <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="container mx-auto px-4 mb-12"
          >
            <div
                ref={modelContainerRef}
                className={`bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden relative ${
                    isFullscreen ? "h-screen w-screen" : "h-[500px]"
                }`}
            >
              <VehicleModel modelPath={vehicle.modelPath} onLoaded={handleModelLoaded} />

              {/* Loading overlay */}
              {!isModelLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/70 z-10">
                    <div className="text-center">
                      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-blue-400">Loading 3D Model...</p>
                    </div>
                  </div>
              )}

              {/* 3D model controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/20 bg-zinc-900/80 hover:bg-zinc-800"
                    onClick={() => document.querySelector<HTMLElement>(".vehicle-model-reset")?.click()}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500/20 bg-zinc-900/80 hover:bg-zinc-800"
                    onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" className="border-blue-500/20 bg-zinc-900/80 hover:bg-zinc-800">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Vehicle detail tabs */}
          <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="container mx-auto px-4 mb-20"
          >
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="bg-zinc-800 border border-blue-500/20 mb-8">
                <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                    value="specifications"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                    value="features"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                >
                  Gallery
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                  <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">Vehicle Overview</h2>
                          <p className="text-zinc-300 mb-6">{vehicle.description}</p>

                          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider">Key Specifications</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-zinc-800 border border-blue-500/20 p-3 rounded">
                              <div className="text-xs text-zinc-400 uppercase tracking-wider">Engine</div>
                              <div className="text-sm mt-1">{vehicle.specs.engine}</div>
                            </div>
                            <div className="bg-zinc-800 border border-blue-500/20 p-3 rounded">
                              <div className="text-xs text-zinc-400 uppercase tracking-wider">Power</div>
                              <div className="text-sm mt-1">{vehicle.specs.power}</div>
                            </div>
                            <div className="bg-zinc-800 border border-blue-500/20 p-3 rounded">
                              <div className="text-xs text-zinc-400 uppercase tracking-wider">0-60 mph</div>
                              <div className="text-sm mt-1">{vehicle.specs.acceleration}</div>
                            </div>
                            <div className="bg-zinc-800 border border-blue-500/20 p-3 rounded">
                              <div className="text-xs text-zinc-400 uppercase tracking-wider">Top Speed</div>
                              <div className="text-sm mt-1">{vehicle.specs.topSpeed}</div>
                            </div>
                            <div className="bg-zinc-800 border border-blue-500/20 p-3 rounded">
                              <div className="text-xs text-zinc-400 uppercase tracking-wider">Transmission</div>
                              <div className="text-sm mt-1">{vehicle.specs.transmission}</div>
                            </div>
                            <div className="bg-zinc-800 border border-blue-500/20 p-3 rounded">
                              <div className="text-xs text-zinc-400 uppercase tracking-wider">Drivetrain</div>
                              <div className="text-sm mt-1">{vehicle.specs.drivetrain}</div>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold mb-3 uppercase tracking-wider">Key Features</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                            {vehicle.features.slice(0, 6).map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                                  {feature}
                                </li>
                            ))}
                          </ul>

                          <div className="flex justify-end">
                            <Button
                                asChild
                                variant="outline"
                                className="border-blue-500/20 hover:border-blue-500/50 mr-2"
                            >
                              <Link href={`/vehicles/${vehicle.id}/specifications`}>
                                <Info className="h-4 w-4 mr-2" />
                                Full Specifications
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg mb-6">
                          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">Inquire About This Vehicle</h2>
                          <p className="text-zinc-400 mb-4 text-sm">
                            Interested in this {vehicle.year} {vehicle.name}? Visit our showroom to see this vehicle in
                            person.
                          </p>
                          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                            <Link href={`/contact?vehicle=${vehicle.id}`}>Visit Showroom</Link>
                          </Button>
                        </div>

                        <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">Vehicle Details</h2>
                          <ul className="space-y-3">
                            <li className="flex justify-between">
                              <span className="text-zinc-400">Stock #:</span>
                              <span>{vehicle.id.toUpperCase()}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-zinc-400">Year:</span>
                              <span>{vehicle.year}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-zinc-400">Make:</span>
                              <span>{vehicle.name.split(" ")[0]}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-zinc-400">Model:</span>
                              <span>{vehicle.name.split(" ").slice(1).join(" ")}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-zinc-400">Category:</span>
                              <span className="capitalize">{vehicle.category}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-zinc-400">Interior Color:</span>
                              <span>Black</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-zinc-400">VIN:</span>
                              <span>JN1GANR34Z0000001</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="mt-0">
                    <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                      <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Technical Specifications</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div>
                          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-blue-400">
                            Engine & Performance
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Engine Type:</span>
                              <span>{vehicle.specs.engine}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Power:</span>
                              <span>{vehicle.specs.power}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Torque:</span>
                              <span>{vehicle.specs.torque}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">0-60 mph:</span>
                              <span>{vehicle.specs.acceleration}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Top Speed:</span>
                              <span>{vehicle.specs.topSpeed}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Transmission:</span>
                              <span>{vehicle.specs.transmission}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Drivetrain:</span>
                              <span>{vehicle.specs.drivetrain}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Fuel Economy:</span>
                              <span>{vehicle.specs.fuelEconomy}</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-blue-400">
                            Dimensions & Chassis
                          </h3>
                          <ul className="space-y-3">
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Weight:</span>
                              <span>{vehicle.specs.weight}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Length:</span>
                              <span>{vehicle.specs.length}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Width:</span>
                              <span>{vehicle.specs.width}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Height:</span>
                              <span>{vehicle.specs.height}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Wheelbase:</span>
                              <span>{vehicle.specs.wheelbase}</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Front Suspension:</span>
                              <span>Multi-link</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Rear Suspension:</span>
                              <span>Multi-link</span>
                            </li>
                            <li className="flex justify-between border-b border-zinc-800 pb-2">
                              <span className="text-zinc-400">Brakes:</span>
                              <span>Brembo 4-piston calipers</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="mt-0">
                    <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                      <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Vehicle Features</h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-blue-400">Performance</h3>
                          <ul className="space-y-2">
                            {vehicle.features.slice(0, 4).map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                                  {feature}
                                </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-blue-400">Exterior</h3>
                          <ul className="space-y-2">
                            {vehicle.features.slice(4, 7).map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                                  {feature}
                                </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-blue-400">Interior</h3>
                          <ul className="space-y-2">
                            {vehicle.features.slice(7).map((feature, index) => (
                                <li key={index} className="flex items-center">
                                  <span className="w-2 h-2 bg-blue-500/20 border border-blue-500/50 mr-2"></span>
                                  {feature}
                                </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-0">
                    <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                      <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">Vehicle Gallery</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {vehicle.gallery.map((image, index) => (
                            <div
                                key={index}
                                className="relative h-[200px] border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
                            >
                              <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-full h-full flex items-center justify-center"
                                >
                                  Image placeholder
                                </motion.div>
                              </div>
                              <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300"></div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>

          {/* Call to Action */}
          <motion.section
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="py-12 bg-zinc-900/30 border-t border-blue-500/20"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 uppercase tracking-wider">
                Interested in this <span className="text-blue-400">{vehicle.name}</span>?
              </h2>
              <p className="text-lg mb-8 text-zinc-300 max-w-3xl mx-auto">
                Visit our showroom today to see this exceptional vehicle in person.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    asChild
                    size="lg"
                    className="text-lg bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider"
                >
                  <Link href={`/contact?vehicle=${vehicle.id}`}>Visit Showroom</Link>
                </Button>
                <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg border-blue-500/50 text-blue-400 hover:bg-zinc-800 uppercase tracking-wider"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </AnimatePresence>
  )
}
