"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Fuel, Gauge, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

// Sample car data
const nissanCars = [
  {
    id: "n1",
    brand: "Nissan",
    model: "Rogue",
    year: 2023,
    price: 29999,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/nissan-rogue.png",
    featured: true,
  },
  {
    id: "n2",
    brand: "Nissan",
    model: "Altima",
    year: 2023,
    price: 26500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/nissan-altima.png",
    featured: true,
  },
  {
    id: "n3",
    brand: "Nissan",
    model: "Sentra",
    year: 2023,
    price: 21500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/nissan-sentra.png",
    featured: true,
  },
  {
    id: "n4",
    brand: "Nissan",
    model: "Kicks",
    year: 2023,
    price: 22500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/nissan-kicks.png",
    featured: true,
  },
]

const mazdaCars = [
  {
    id: "m1",
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 31999,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/mazda-cx5.png",
    featured: true,
  },
  {
    id: "m2",
    brand: "Mazda",
    model: "Mazda3",
    year: 2023,
    price: 25500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/mazda3.png",
    featured: true,
  },
  {
    id: "m3",
    brand: "Mazda",
    model: "CX-30",
    year: 2023,
    price: 28500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/mazda-cx30.png",
    featured: true,
  },
  {
    id: "m4",
    brand: "Mazda",
    model: "MX-5",
    year: 2023,
    price: 33500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/mazda-mx5.png",
    featured: true,
  },
]

export default function FeaturedCars() {
  const [activeTab, setActiveTab] = useState("all")
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const allCars = [...nissanCars, ...mazdaCars]
  const displayCars = activeTab === "all" ? allCars : activeTab === "nissan" ? nissanCars : mazdaCars

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
    },
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our selection of premium Nissan and Mazda vehicles. Each car is carefully inspected to ensure
            quality and reliability.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: inView ? 0 : 30, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <TabsList className="bg-white shadow-md">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                All Models
              </TabsTrigger>
              <TabsTrigger value="nissan" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Nissan
              </TabsTrigger>
              <TabsTrigger value="mazda" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Mazda
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: inView ? 0 : 30, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <div ref={sliderRef} className="keen-slider">
              {displayCars.map((car, index) => (
                <div key={car.id} className="keen-slider__slide">
                  <CarCard car={car} index={index} />
                </div>
              ))}
            </div>

            <button
              onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <button
              onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: inView ? 0 : 30, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link href="/inventory">View All Inventory</Link>
            </Button>
          </motion.div>
        </Tabs>
      </div>
    </section>
  )
}

function CarCard({ car, index }) {
  return (
    <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover-lift h-full">
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={`${car.year} ${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white">{car.brand}</Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          {car.year} {car.brand} {car.model}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">{car.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">
              {car.mileage === 0 ? "New" : `${car.mileage.toLocaleString()} km`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">{car.fuelType}</span>
          </div>
        </div>
        <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="outline" className="w-full border-blue-200 hover:border-blue-500 hover:bg-blue-50">
          <Link href={`/cars/${car.id}`}>
            <Info className="h-4 w-4 mr-2" />
            Details
          </Link>
        </Button>
        <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
          <Link href={`/contact?car=${car.id}`}>Test Drive</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
