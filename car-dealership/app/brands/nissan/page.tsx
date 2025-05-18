import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Fuel, Gauge, Info } from "lucide-react"

// Sample Nissan car data
const nissanCars = [
  {
    id: "n1",
    brand: "Nissan",
    model: "Rogue",
    year: 2023,
    price: 29999,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/nissan-rogue-2023.png",
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
    image: "/nissan-altima-2023.png",
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
    image: "/nissan-sentra-2023.png",
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
    image: "/nissan-kicks-2023.png",
    featured: true,
  },
  {
    id: "n5",
    brand: "Nissan",
    model: "Pathfinder",
    year: 2023,
    price: 35999,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Nissan Pathfinder 2023 SUV",
    featured: false,
  },
  {
    id: "n6",
    brand: "Nissan",
    model: "Murano",
    year: 2023,
    price: 33500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Nissan Murano 2023 SUV",
    featured: false,
  },
  {
    id: "n7",
    brand: "Nissan",
    model: "Maxima",
    year: 2023,
    price: 37500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Nissan Maxima 2023 sedan",
    featured: false,
  },
  {
    id: "n8",
    brand: "Nissan",
    model: "Leaf",
    year: 2023,
    price: 28500,
    mileage: 0,
    fuelType: "Electric",
    image: "/placeholder.svg?height=300&width=500&query=Nissan Leaf 2023 electric car",
    featured: false,
  },
]

export default function NissanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/placeholder.svg?height=400&width=1920&query=Nissan showroom with multiple car models"
          alt="Nissan Vehicles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
          <div className="mb-6">
            <Image
              src="/placeholder.svg?height=100&width=200&query=Nissan logo white"
              alt="Nissan Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Nissan Vehicles</h1>
          <p className="text-xl text-center mb-8 max-w-2xl">
            Innovation that excites. Explore our range of Nissan vehicles.
          </p>
        </div>
      </section>

      {/* About Nissan */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">About Nissan</h2>
              <p className="text-slate-600 mb-4">
                Nissan is a global automotive manufacturer known for producing innovative, reliable, and stylish
                vehicles. With a rich history dating back to 1933, Nissan has established itself as a leader in
                automotive technology and design.
              </p>
              <p className="text-slate-600 mb-4">
                From fuel-efficient sedans to powerful SUVs and trucks, Nissan offers a diverse range of vehicles to
                meet the needs of every driver. The brand is committed to quality, safety, and sustainability, with a
                growing lineup of electric and hybrid vehicles.
              </p>
              <p className="text-slate-600 mb-4">
                As an authorized Nissan dealer, we provide the full range of new Nissan models, certified pre-owned
                vehicles, and comprehensive service and parts departments to keep your Nissan running at its best.
              </p>
            </div>
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=Nissan dealership with new cars"
                alt="Nissan Dealership"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nissan Models */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nissan Models</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our selection of new Nissan vehicles. Each car comes with a comprehensive warranty and exceptional
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nissanCars.map((car) => (
              <Card key={car.id} className="overflow-hidden">
                <div className="relative h-[200px]">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.year} ${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                  />
                  {car.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
                </div>
                <CardHeader>
                  <CardTitle>
                    {car.year} {car.brand} {car.model}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">
                        {car.mileage === 0 ? "New" : `${car.mileage.toLocaleString()} km`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">{car.fuelType}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold">${car.price.toLocaleString()}</div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/cars/${car.id}`}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href={`/contact?car=${car.id}`}>Test Drive</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Nissan?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom today or schedule a test drive online. Our team is ready to assist you in finding the
            perfect Nissan vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/contact">Schedule Test Drive</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg text-white border-white hover:bg-white/10">
              <Link href="/services/financing">Financing Options</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
