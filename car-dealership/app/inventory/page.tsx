"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Info, Search, SlidersHorizontal, X, EyeIcon as Eye3d } from "lucide-react"

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 150000])
  const [yearRange, setYearRange] = useState([1967, 2023])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedDrivetrains, setSelectedDrivetrains] = useState<string[]>([])
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Додаємо нові автомобілі з 3D моделями
  const allVehicles = [
    // Додаємо нові автомобілі з 3D моделями
    {
      id: "gtr-r34",
      name: "Nissan Skyline GT-R R34",
      price: 85000,
      year: 2002,
      image: "/silver-r34-blueprint.png",
      category: "sports",
      make: "Nissan",
      has3dModel: true,
      specs: {
        engine: "RB26DETT Twin-Turbo Inline-6",
        power: "280 HP",
        torque: "392 Nm",
        acceleration: "4.8 sec",
        drivetrain: "AWD",
        weight: "1,560 kg",
      },
    },
    {
      id: "rx7-fd",
      name: "Mazda RX-7 FD",
      price: 65000,
      year: 1999,
      image: "/red-rx7-blueprint.png",
      category: "sports",
      make: "Mazda",
      has3dModel: true,
      specs: {
        engine: "13B-REW Twin-Turbo Rotary",
        power: "255 HP",
        torque: "294 Nm",
        acceleration: "5.3 sec",
        drivetrain: "RWD",
        weight: "1,300 kg",
      },
    },
    // Додаємо решту автомобілів
    // Mazda Models
    {
      id: "mazda-rx7-fd3s",
      name: "Mazda RX-7 FD3S",
      price: 65000,
      year: 1999,
      image: "/mazda-rx7-fd3s-blueprint.png",
      category: "sports",
      make: "Mazda",
      has3dModel: false,
      specs: {
        engine: "13B-REW Twin-Turbo Rotary",
        power: "255 HP",
        torque: "294 Nm",
        acceleration: "5.3 sec",
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
      make: "Mazda",
      has3dModel: false,
      specs: {
        engine: "13B-MSP Renesis Rotary",
        power: "232 HP",
        torque: "211 Nm",
        acceleration: "6.4 sec",
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
      make: "Mazda",
      has3dModel: false,
      specs: {
        engine: "1.8L I4",
        power: "131 HP",
        torque: "152 Nm",
        acceleration: "8.1 sec",
        drivetrain: "RWD",
        weight: "960 kg",
      },
    },
    // Nissan Models
    {
      id: "nissan-gtr-r35",
      name: "Nissan GT-R R35",
      price: 110000,
      year: 2021,
      image: "/nissan-gtr-r35-blueprint.png",
      category: "sports",
      make: "Nissan",
      has3dModel: false,
      specs: {
        engine: "3.8L Twin-Turbo V6",
        power: "565 HP",
        torque: "633 Nm",
        acceleration: "2.7 sec",
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
      make: "Nissan",
      has3dModel: false,
      specs: {
        engine: "SR20DET Turbo I4",
        power: "250 HP",
        torque: "275 Nm",
        acceleration: "5.5 sec",
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
      make: "Nissan",
      has3dModel: false,
      specs: {
        engine: "3.7L V6",
        power: "332 HP",
        torque: "366 Nm",
        acceleration: "5.1 sec",
        drivetrain: "RWD",
        weight: "1,496 kg",
      },
    },
  ]

  // Get unique makes, categories, and drivetrains for filters
  const makes = [...new Set(allVehicles.map((vehicle) => vehicle.make))]
  const categories = [...new Set(allVehicles.map((vehicle) => vehicle.category))]
  const drivetrains = [...new Set(allVehicles.map((vehicle) => vehicle.specs.drivetrain))]

  // Filter vehicles based on all criteria
  const filteredVehicles = allVehicles
    .filter((vehicle) => (activeCategory === "all" ? true : vehicle.category === activeCategory))
    .filter((vehicle) =>
      searchTerm
        ? vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )
    .filter((vehicle) => vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1])
    .filter((vehicle) => vehicle.year >= yearRange[0] && vehicle.year <= yearRange[1])
    .filter((vehicle) => (selectedMakes.length > 0 ? selectedMakes.includes(vehicle.make) : true))
    .filter((vehicle) =>
      selectedDrivetrains.length > 0 ? selectedDrivetrains.includes(vehicle.specs.drivetrain) : true,
    )

  const toggleMake = (make: string) => {
    setSelectedMakes((prev) => (prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]))
  }

  const toggleDrivetrain = (drivetrain: string) => {
    setSelectedDrivetrains((prev) =>
      prev.includes(drivetrain) ? prev.filter((d) => d !== drivetrain) : [...prev, drivetrain],
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 150000])
    setYearRange([1967, 2023])
    setSelectedMakes([])
    setSelectedDrivetrains([])
    setActiveCategory("all")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/multi-car-blueprint.png" alt="Inventory" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Vehicle <span className="text-blue-400">Inventory</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Browse our extensive collection of premium Mazda and Nissan vehicles
          </p>
        </div>
      </section>

      {/* Inventory Section */}
      <section ref={ref} className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2 text-blue-400" />
                  Filters
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Price Range</h3>
                    <div className="mb-2">
                      <Slider
                        defaultValue={[0, 150000]}
                        max={150000}
                        step={5000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Year Range</h3>
                    <div className="mb-2">
                      <Slider
                        defaultValue={[1967, 2023]}
                        min={1967}
                        max={2023}
                        step={1}
                        value={yearRange}
                        onValueChange={setYearRange}
                        className="my-6"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Make</h3>
                    <div className="space-y-2">
                      {makes.map((make) => (
                        <div key={make} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`make-${make}`}
                            checked={selectedMakes.includes(make)}
                            onChange={() => toggleMake(make)}
                            className="h-4 w-4 rounded border-blue-500/30 bg-zinc-800 text-blue-500 focus:ring-blue-500/30"
                          />
                          <label htmlFor={`make-${make}`} className="ml-2 text-sm">
                            {make}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={activeCategory === category}
                            onChange={() => setActiveCategory(activeCategory === category ? "all" : category)}
                            className="h-4 w-4 rounded border-blue-500/30 bg-zinc-800 text-blue-500 focus:ring-blue-500/30"
                          />
                          <label htmlFor={`category-${category}`} className="ml-2 text-sm capitalize">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Drivetrain</h3>
                    <div className="space-y-2">
                      {drivetrains.map((drivetrain) => (
                        <div key={drivetrain} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`drivetrain-${drivetrain}`}
                            checked={selectedDrivetrains.includes(drivetrain)}
                            onChange={() => toggleDrivetrain(drivetrain)}
                            className="h-4 w-4 rounded border-blue-500/30 bg-zinc-800 text-blue-500 focus:ring-blue-500/30"
                          />
                          <label htmlFor={`drivetrain-${drivetrain}`} className="ml-2 text-sm">
                            {drivetrain}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full border-blue-500/30 text-blue-400 hover:bg-zinc-800"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Mobile Filter Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    type="text"
                    placeholder="Search by make or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-blue-500/30 text-blue-400"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden mb-8"
                >
                  <div className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold uppercase tracking-wider">Filters</h2>
                      <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Price Range</h3>
                        <div className="mb-2">
                          <Slider
                            defaultValue={[0, 150000]}
                            max={150000}
                            step={5000}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="my-6"
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>${priceRange[0].toLocaleString()}</span>
                          <span>${priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Year Range</h3>
                        <div className="mb-2">
                          <Slider
                            defaultValue={[1967, 2023]}
                            min={1967}
                            max={2023}
                            step={1}
                            value={yearRange}
                            onValueChange={setYearRange}
                            className="my-6"
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>{yearRange[0]}</span>
                          <span>{yearRange[1]}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">Make</h3>
                          <div className="space-y-2">
                            {makes.map((make) => (
                              <div key={make} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`mobile-make-${make}`}
                                  checked={selectedMakes.includes(make)}
                                  onChange={() => toggleMake(make)}
                                  className="h-4 w-4 rounded border-blue-500/30 bg-zinc-800 text-blue-500 focus:ring-blue-500/30"
                                />
                                <label htmlFor={`mobile-make-${make}`} className="ml-2 text-sm">
                                  {make}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium uppercase tracking-wider text-blue-400 mb-3">
                            Drivetrain
                          </h3>
                          <div className="space-y-2">
                            {drivetrains.map((drivetrain) => (
                              <div key={drivetrain} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`mobile-drivetrain-${drivetrain}`}
                                  checked={selectedDrivetrains.includes(drivetrain)}
                                  onChange={() => toggleDrivetrain(drivetrain)}
                                  className="h-4 w-4 rounded border-blue-500/30 bg-zinc-800 text-blue-500 focus:ring-blue-500/30"
                                />
                                <label htmlFor={`mobile-drivetrain-${drivetrain}`} className="ml-2 text-sm">
                                  {drivetrain}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full border-blue-500/30 text-blue-400 hover:bg-zinc-800"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Category Tabs */}
              <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveCategory}>
                <TabsList className="bg-zinc-800 border border-blue-500/20 w-full justify-start overflow-x-auto">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                  >
                    All Vehicles
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
                  <TabsTrigger
                    value="convertible"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                  >
                    Convertible
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

              {/* Results Count */}
              <div className="mb-6 flex justify-between items-center">
                <p className="text-zinc-400">
                  Showing <span className="text-white font-medium">{filteredVehicles.length}</span> vehicles
                </p>
                <div className="text-zinc-400 text-sm">
                  Sort by:{" "}
                  <select className="bg-zinc-800 border border-blue-500/20 rounded ml-2 py-1 px-2 text-white">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Year: New to Old</option>
                    <option>Year: Old to New</option>
                  </select>
                </div>
              </div>

              {/* Vehicle Grid */}
              {filteredVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredVehicles.map((vehicle, index) => (
                      <motion.div
                        key={vehicle.id}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
                        className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 group"
                        onMouseEnter={() => setHoveredVehicle(vehicle.id)}
                        onMouseLeave={() => setHoveredVehicle(null)}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <Link href={`/vehicles/${vehicle.id}`}>
                          <div className="relative h-[200px] overflow-hidden scan-effect">
                            <Image
                              src={vehicle.image || "/placeholder.svg?height=200&width=400&query=car blueprint"}
                              alt={vehicle.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-0 left-0 bg-zinc-900/80 text-blue-400 py-1 px-3 text-xs uppercase tracking-wider border-r border-b border-blue-500/20">
                              {vehicle.year}
                            </div>

                            {/* 3D Model Badge */}
                            {vehicle.has3dModel && (
                              <div className="absolute top-0 right-0 bg-blue-600/90 text-white py-1 px-3 text-xs uppercase tracking-wider border-l border-b border-blue-500/20 flex items-center">
                                <Eye3d className="h-3 w-3 mr-1" />
                                3D
                              </div>
                            )}

                            {/* Hover Effect */}
                            {hoveredVehicle === vehicle.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-blue-500/10 flex items-center justify-center"
                              >
                                <div className="bg-zinc-900/80 border border-blue-500/30 rounded-full p-3">
                                  <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                  >
                                    <Eye3d className="h-6 w-6 text-blue-400" />
                                    {vehicle.has3dModel && (
                                      <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-blue-400 whitespace-nowrap">
                                        View in 3D
                                      </span>
                                    )}
                                  </motion.div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </Link>

                        <div className="p-4">
                          <Link href={`/vehicles/${vehicle.id}`}>
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-2 hover:text-blue-400 transition-colors">
                              {vehicle.name}
                            </h3>
                          </Link>

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
                              <Link href={`/contact?vehicle=${vehicle.id}`}>View in Showroom</Link>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-zinc-900/50 border border-blue-500/20 rounded-lg p-12 text-center">
                  <h3 className="text-xl font-bold mb-2">No Vehicles Found</h3>
                  <p className="text-zinc-400 mb-6">
                    No vehicles match your current filter criteria. Try adjusting your filters.
                  </p>
                  <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700">
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {filteredVehicles.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/20 hover:border-blue-500/50 h-8 w-8 p-0"
                    >
                      &lt;
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/20 bg-blue-600 text-white h-8 w-8 p-0"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/20 hover:border-blue-500/50 h-8 w-8 p-0"
                    >
                      2
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/20 hover:border-blue-500/50 h-8 w-8 p-0"
                    >
                      3
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-500/20 hover:border-blue-500/50 h-8 w-8 p-0"
                    >
                      &gt;
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
