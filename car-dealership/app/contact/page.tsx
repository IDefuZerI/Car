"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const vehicleId = searchParams.get("vehicle")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "phone",
    subject: vehicleId ? "test-drive" : "general",
    message: vehicleId ? `I'm interested in scheduling a test drive for vehicle ID: ${vehicleId}` : "",
    preferredDate: "",
    preferredTime: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, contactMethod: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to your server
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/modern-dealership.png" alt="Contact Us" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Contact <span className="text-blue-400">Us</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Get in touch with our team to inquire about vehicles or schedule a test drive
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={ref} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: inView ? 0 : -50, opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center">
                <span className="text-blue-400 mr-2">Get In Touch</span>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </h2>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                      <p className="text-zinc-400">123 Performance Boulevard</p>
                      <p className="text-zinc-400">Automotive District, 12345</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                      <p className="text-zinc-400">+1 (555) 123-4567</p>
                      <p className="text-zinc-400">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                      <p className="text-zinc-400">info@autotech.com</p>
                      <p className="text-zinc-400">sales@autotech.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-blue-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                      <p className="text-zinc-400">Monday - Friday: 9AM - 7PM</p>
                      <p className="text-zinc-400">Saturday: 9AM - 5PM</p>
                      <p className="text-zinc-400">Sunday: 10AM - 4PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider flex items-center">
                <span className="text-blue-400 mr-2">{vehicleId ? "Schedule a Test Drive" : "Send Us a Message"}</span>
                <div className="h-px flex-grow bg-blue-500/30 ml-4"></div>
              </h2>

              <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-lg">
                {isSubmitted ? (
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">Thank You!</h3>
                    <p className="text-zinc-300 mb-6">
                      Your message has been received. A member of our team will contact you shortly.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">Return to Homepage</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-300">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-zinc-300">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-zinc-300">Preferred Contact Method</Label>
                        <RadioGroup
                          value={formData.contactMethod}
                          onValueChange={handleRadioChange}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone-contact" />
                            <Label htmlFor="phone-contact" className="text-zinc-300">
                              Phone
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email-contact" />
                            <Label htmlFor="email-contact" className="text-zinc-300">
                              Email
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-zinc-300">
                          Subject
                        </Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) => handleSelectChange("subject", value)}
                        >
                          <SelectTrigger className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-blue-500/20">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="test-drive">Schedule Test Drive</SelectItem>
                            <SelectItem value="vehicle-info">Vehicle Information</SelectItem>
                            <SelectItem value="financing">Financing Options</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {formData.subject === "test-drive" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="preferredDate" className="text-zinc-300">
                            Preferred Date
                          </Label>
                          <Input
                            id="preferredDate"
                            name="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="preferredTime" className="text-zinc-300">
                            Preferred Time
                          </Label>
                          <Select
                            value={formData.preferredTime}
                            onValueChange={(value) => handleSelectChange("preferredTime", value)}
                          >
                            <SelectTrigger className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50">
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-blue-500/20">
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12PM - 4PM)</SelectItem>
                              <SelectItem value="evening">Evening (4PM - 7PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-zinc-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 uppercase tracking-wider"
                    >
                      {vehicleId ? "Schedule Test Drive" : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-zinc-900/30 border-t border-blue-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center uppercase tracking-wider">Find Us</h2>
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-blue-500/20">
            <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-500">
              Map placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
