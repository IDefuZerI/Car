import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Fuel, Gauge, Info } from "lucide-react"

// Sample Mazda car data
const mazdaCars = [
  {
    id: "m1",
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 31999,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Mazda CX-5 2023 SUV",
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
    image: "/placeholder.svg?height=300&width=500&query=Mazda3 2023 hatchback",
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
    image: "/placeholder.svg?height=300&width=500&query=Mazda CX-30 2023 crossover",
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
    image: "/placeholder.svg?height=300&width=500&query=Mazda MX-5 2023 convertible",
    featured: true,
  },
  {
    id: "m5",
    brand: "Mazda",
    model: "CX-9",
    year: 2023,
    price: 38999,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Mazda CX-9 2023 SUV",
    featured: false,
  },
  {
    id: "m6",
    brand: "Mazda",
    model: "Mazda6",
    year: 2023,
    price: 29500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Mazda6 2023 sedan",
    featured: false,
  },
  {
    id: "m7",
    brand: "Mazda",
    model: "CX-50",
    year: 2023,
    price: 34500,
    mileage: 0,
    fuelType: "Gasoline",
    image: "/placeholder.svg?height=300&width=500&query=Mazda CX-50 2023 SUV",
    featured: false,
  },
  {
    id: "m8",
    brand: "Mazda",
    model: "MX-30",
    year: 2023,
    price: 33500,
    mileage: 0,
    fuelType: "Electric",
    image: "/placeholder.svg?height=300&width=500&query=Mazda MX-30 2023 electric SUV",
    featured: false,
  },
]

export default function MazdaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/placeholder.svg?height=400&width=1920&query=Mazda showroom with multiple car models"
          alt="Mazda Vehicles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
          <div className="mb-6">
            <Image
              src="/placeholder.svg?height=100&width=200&query=Mazda logo white"
              alt="Mazda Logo"
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Mazda Vehicles</h1>
          <p className="text-xl text-center mb-8 max-w-2xl">
            Feel Alive. Discover the elegance and performance of Mazda vehicles.
          </p>
        </div>
      </section>

      {/* About Mazda */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">About Mazda</h2>
              <p className="text-slate-600 mb-4">
                Mazda is a Japanese automotive manufacturer known for its innovative engineering, distinctive design,
                and engaging driving experience. Founded in 1920, Mazda has built a reputation for creating vehicles
                that blend artistry with technology.
              </p>
              <p className="text-slate-600 mb-4">
                With a philosophy centered on the joy of driving, Mazda creates vehicles that respond intuitively to the
                driver's intentions. The brand's KODO: Soul of Motion design language and SKYACTIV Technology exemplify
                Mazda's commitment to both beauty and performance.
              </p>
              <p className="text-slate-600 mb-4">
                As an authorized Mazda dealer, we offer the complete lineup of new Mazda vehicles, certified pre-owned
                options, and expert service to ensure your Mazda continues to deliver the exceptional driving experience
                it was designed for.
              </p>
            </div>
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600&query=Mazda dealership with new cars"
                alt="Mazda Dealership"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mazda Models */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Mazda Models</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore our selection of new Mazda vehicles. Each car comes with a comprehensive warranty and exceptional
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mazdaCars.map((car) => (
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
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Mazda?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit our showroom today or schedule a test drive online. Our team is ready to assist you in finding the
            perfect Mazda vehicle.
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
