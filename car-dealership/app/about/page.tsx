"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Award, Clock, MapPin, Phone, Users } from 'lucide-react'

export default function AboutPage() {
  // Створюємо стани для відстеження видимості секцій
  const [historyInView, setHistoryInView] = useState(false)
  const [teamInView, setTeamInView] = useState(false)
  const [valuesInView, setValuesInView] = useState(false)

  // Створюємо посилання на DOM-елементи
  const historyRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    // Створюємо Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Визначаємо, яка секція стала видимою
            if (entry.target === historyRef.current) {
              if (entry.isIntersecting) setHistoryInView(true)
            } else if (entry.target === teamRef.current) {
              if (entry.isIntersecting) setTeamInView(true)
            } else if (entry.target === valuesRef.current) {
              if (entry.isIntersecting) setValuesInView(true)
            }
          })
        },
        { threshold: 0.1 }
    )

    // Додаємо елементи до спостереження
    if (historyRef.current) observer.observe(historyRef.current)
    if (teamRef.current) observer.observe(teamRef.current)
    if (valuesRef.current) observer.observe(valuesRef.current)

    // Прибираємо спостереження при розмонтуванні компонента
    return () => {
      if (historyRef.current) observer.unobserve(historyRef.current)
      if (teamRef.current) observer.unobserve(teamRef.current)
      if (valuesRef.current) observer.unobserve(valuesRef.current)
    }
  }, []) // Порожній масив залежностей, щоб ефект виконався лише один раз

  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      position: "Founder & CEO",
      image: "/team-member-1.jpg",
      bio: "With over 20 years of experience in the automotive industry, Alex founded AutoTech with a vision to provide enthusiasts with access to the finest performance vehicles.",
    },
    {
      name: "Sarah Chen",
      position: "Sales Director",
      image: "/team-member-2.jpg",
      bio: "Sarah's extensive knowledge of performance vehicles and dedication to customer satisfaction ensures that every client finds their perfect automotive match.",
    },
    {
      name: "Michael Rodriguez",
      position: "Technical Specialist",
      image: "/team-member-3.jpg",
      bio: "Michael's technical expertise and racing background provide valuable insights to customers seeking the perfect performance vehicle for their needs.",
    },
    {
      name: "Emma Wilson",
      position: "Customer Relations",
      image: "/team-member-4.jpg",
      bio: "Emma ensures that every client receives personalized attention and support throughout their vehicle purchase journey and beyond.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/modern-dealership.png" alt="About Us" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            About <span className="text-blue-400">AutoTech</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Learn about our passion for performance vehicles and commitment to excellence
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={historyRef} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: historyInView ? 0 : -50, opacity: historyInView ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-blue-500/20 scan-effect">
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
                  Dealership image placeholder
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: historyInView ? 0 : 50, opacity: historyInView ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider flex items-center">
                <span className="text-blue-400 mr-2">Our Story</span>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Founded in 2010, AutoTech began with a simple mission: to provide automotive enthusiasts with access
                  to the finest performance vehicles from Japan and beyond. What started as a small specialty dealership
                  has grown into a premier destination for those seeking exceptional driving machines.
                </p>
                <p>
                  Our founder, Alex Johnson, combined his passion for Japanese performance cars with his extensive
                  industry knowledge to create a dealership that offers more than just vehicles – we provide an
                  experience centered around automotive excellence and technical precision.
                </p>
                <p>
                  Over the years, we've built relationships with trusted suppliers and specialists around the world,
                  allowing us to source rare and sought-after models that meet our exacting standards. Each vehicle in
                  our inventory undergoes a comprehensive inspection and preparation process to ensure it delivers the
                  performance and reliability our customers expect.
                </p>
                <p>
                  Today, AutoTech continues to be driven by our passion for exceptional vehicles and our commitment to
                  providing an unparalleled customer experience. We're not just selling cars; we're connecting
                  enthusiasts with machines that inspire.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={valuesRef} className="py-20 bg-zinc-900/30 border-y border-blue-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
              Our <span className="text-blue-400">Values</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">The principles that guide everything we do at AutoTech</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: valuesInView ? 0 : 50, opacity: valuesInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Excellence</h3>
              <p className="text-zinc-400">
                We are committed to excellence in every aspect of our business, from the vehicles we select to the
                service we provide. We never compromise on quality and continuously strive to exceed expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: valuesInView ? 0 : 50, opacity: valuesInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Integrity</h3>
              <p className="text-zinc-400">
                We operate with complete transparency and honesty. Our customers trust us to provide accurate
                information about our vehicles, fair pricing, and straightforward advice. We value this trust and work
                hard to maintain it.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: valuesInView ? 0 : 50, opacity: valuesInView ? 1 : 0 }}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Passion</h3>
              <p className="text-zinc-400">
                Our team shares a genuine passion for performance vehicles. This enthusiasm drives us to stay at the
                forefront of automotive trends, continuously expand our knowledge, and share our expertise with our
                customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section ref={teamRef} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
              Meet Our <span className="text-blue-400">Team</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Our team of automotive experts is passionate about helping you find your perfect vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: teamInView ? 0 : 50, opacity: teamInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden"
              >
                <div className="relative h-[250px]">
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
                    Team member photo placeholder
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase tracking-wider">{member.name}</h3>
                  <p className="text-blue-400 text-sm uppercase tracking-wider mb-4">{member.position}</p>
                  <p className="text-zinc-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="py-20 bg-zinc-900/30 border-t border-blue-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center">
                <span className="text-blue-400 mr-2">Location</span>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </h2>
              <div className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden">
                <div className="relative h-[300px]">
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
                    Map placeholder
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="h-5 w-5 mt-0.5 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                      <p className="text-zinc-400">123 Performance Boulevard</p>
                      <p className="text-zinc-400">Automotive District, 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-zinc-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center">
                <span className="text-blue-400 mr-2">Hours</span>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </h2>
              <div className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-6">
                    <Clock className="h-5 w-5 mt-0.5 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Business Hours</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b border-zinc-800 pb-2">
                          <span className="text-zinc-400">Monday - Friday</span>
                          <span>9:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-800 pb-2">
                          <span className="text-zinc-400">Saturday</span>
                          <span>9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between border-b border-zinc-800 pb-2">
                          <span className="text-zinc-400">Sunday</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 p-4 rounded-lg border border-blue-500/10">
                    <h3 className="font-semibold text-lg mb-2">Schedule an Appointment</h3>
                    <p className="text-zinc-400 mb-4">
                      For the best experience, we recommend scheduling an appointment for vehicle viewings and test
                      drives.
                    </p>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wider">
            Ready to Find Your <span className="text-blue-400">Dream Vehicle</span>?
          </h2>
          <p className="text-xl mb-8 text-zinc-300 max-w-3xl mx-auto">
            Browse our inventory or contact our team to start your journey towards owning a premium performance vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
