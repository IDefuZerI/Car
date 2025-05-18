"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { X, ZoomIn } from "lucide-react"

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Gallery data
  const galleryImages = [
    {
      id: "gtr-r34-1",
      src: "/gtr-r34-front.jpg",
      alt: "Nissan Skyline GT-R R34 Front",
      category: "nissan",
      vehicle: "Nissan Skyline GT-R R34",
    },
    {
      id: "gtr-r34-2",
      src: "/gtr-r34-rear.jpg",
      alt: "Nissan Skyline GT-R R34 Rear",
      category: "nissan",
      vehicle: "Nissan Skyline GT-R R34",
    },
    {
      id: "gtr-r34-3",
      src: "/gtr-r34-interior.jpg",
      alt: "Nissan Skyline GT-R R34 Interior",
      category: "nissan",
      vehicle: "Nissan Skyline GT-R R34",
    },
    {
      id: "gtr-r34-4",
      src: "/gtr-r34-engine.jpg",
      alt: "Nissan Skyline GT-R R34 Engine",
      category: "nissan",
      vehicle: "Nissan Skyline GT-R R34",
    },
    {
      id: "rx7-1",
      src: "/rx7-front.jpg",
      alt: "Mazda RX-7 Front",
      category: "mazda",
      vehicle: "Mazda RX-7",
    },
    {
      id: "rx7-2",
      src: "/rx7-rear.jpg",
      alt: "Mazda RX-7 Rear",
      category: "mazda",
      vehicle: "Mazda RX-7",
    },
    {
      id: "rx7-3",
      src: "/rx7-interior.jpg",
      alt: "Mazda RX-7 Interior",
      category: "mazda",
      vehicle: "Mazda RX-7",
    },
    {
      id: "rx7-4",
      src: "/rx7-engine.jpg",
      alt: "Mazda RX-7 Engine",
      category: "mazda",
      vehicle: "Mazda RX-7",
    },
    {
      id: "supra-1",
      src: "/supra-front.jpg",
      alt: "Toyota Supra Front",
      category: "toyota",
      vehicle: "Toyota Supra",
    },
    {
      id: "supra-2",
      src: "/supra-rear.jpg",
      alt: "Toyota Supra Rear",
      category: "toyota",
      vehicle: "Toyota Supra",
    },
    {
      id: "supra-3",
      src: "/supra-interior.jpg",
      alt: "Toyota Supra Interior",
      category: "toyota",
      vehicle: "Toyota Supra",
    },
    {
      id: "supra-4",
      src: "/supra-engine.jpg",
      alt: "Toyota Supra Engine",
      category: "toyota",
      vehicle: "Toyota Supra",
    },
    {
      id: "s2000-1",
      src: "/s2000-front.jpg",
      alt: "Honda S2000 Front",
      category: "honda",
      vehicle: "Honda S2000",
    },
    {
      id: "s2000-2",
      src: "/s2000-rear.jpg",
      alt: "Honda S2000 Rear",
      category: "honda",
      vehicle: "Honda S2000",
    },
    {
      id: "evo-1",
      src: "/evo-front.jpg",
      alt: "Mitsubishi Lancer Evolution Front",
      category: "mitsubishi",
      vehicle: "Mitsubishi Lancer Evolution",
    },
    {
      id: "evo-2",
      src: "/evo-rear.jpg",
      alt: "Mitsubishi Lancer Evolution Rear",
      category: "mitsubishi",
      vehicle: "Mitsubishi Lancer Evolution",
    },
    {
      id: "wrx-1",
      src: "/wrx-front.jpg",
      alt: "Subaru Impreza WRX STI Front",
      category: "subaru",
      vehicle: "Subaru Impreza WRX STI",
    },
    {
      id: "wrx-2",
      src: "/wrx-rear.jpg",
      alt: "Subaru Impreza WRX STI Rear",
      category: "subaru",
      vehicle: "Subaru Impreza WRX STI",
    },
  ]

  // Filter images based on active category
  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((image) => image.category === activeCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/multi-car-blueprint.png" alt="Gallery" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Vehicle <span className="text-blue-400">Gallery</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Explore our collection of premium performance vehicles through high-quality imagery
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={ref} className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full mb-12" onValueChange={setActiveCategory}>
            <TabsList className="bg-zinc-800 border border-blue-500/20 w-full justify-start overflow-x-auto mb-6">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="nissan"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                Nissan
              </TabsTrigger>
              <TabsTrigger
                value="mazda"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                Mazda
              </TabsTrigger>
              <TabsTrigger
                value="toyota"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                Toyota
              </TabsTrigger>
              <TabsTrigger
                value="honda"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                Honda
              </TabsTrigger>
              <TabsTrigger
                value="mitsubishi"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                Mitsubishi
              </TabsTrigger>
              <TabsTrigger
                value="subaru"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
              >
                Subaru
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nissan" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mazda" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="toyota" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="honda" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mitsubishi" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="subaru" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image, index) => (
                  <GalleryItem
                    key={image.id}
                    image={image}
                    index={index}
                    inView={inView}
                    onClick={() => setSelectedImage(image.src)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="relative w-full h-auto max-h-[80vh]">
              <div className="bg-zinc-800 flex items-center justify-center">
                <div className="relative w-full h-[60vh]">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Enlarged view"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Gallery Item Component
function GalleryItem({ image, index, inView, onClick }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: inView ? 0 : 20, opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.4, delay: 0.05 * (index % 8) }}
      className="relative group"
    >
      <div className="relative h-[200px] border border-blue-500/20 rounded-lg overflow-hidden bg-zinc-900/50">
        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
          Image placeholder
        </div>
        <div
          className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
          onClick={onClick}
        >
          <div className="bg-zinc-900/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium">{image.vehicle}</h3>
        <p className="text-xs text-zinc-400">{image.alt}</p>
      </div>
    </motion.div>
  )
}
