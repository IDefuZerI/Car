import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Mail, MapPin, Phone, Settings, Twitter, Youtube } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-900 border-t border-blue-500/20 z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Settings className="h-6 w-6 text-blue-400" />
              <span className="uppercase tracking-wider">AutoTech</span>
            </Link>
            <p className="text-zinc-400 text-sm">
              Advanced vehicle customization platform for automotive enthusiasts. Precision engineering meets digital
              innovation.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-500 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 uppercase tracking-wider text-blue-400">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-wider">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/models"
                  className="text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-wider"
                >
                  Models
                </Link>
              </li>
              <li>
                <Link
                  href="/customizer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-wider"
                >
                  Customizer
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-wider"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/specs"
                  className="text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-wider"
                >
                  Specifications
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4 uppercase tracking-wider text-blue-400">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-blue-400" />
                <span className="text-zinc-400">123 Performance Blvd, Automotive District, 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-zinc-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-zinc-400">info@autotech.com</span>
              </div>
              <div className="pt-2">
                <h4 className="font-medium mb-2 uppercase tracking-wider text-sm">Subscribe to updates</h4>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 text-sm"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase tracking-wider">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-500/20 mt-12 pt-6 text-center text-zinc-500 text-sm">
          <p>
            © {new Date().getFullYear()} AutoTech. All rights reserved.{" "}
            <span className="text-blue-400">Technical Specifications</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
