"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 opacity-80 z-10"></div>
        <div className="absolute inset-0 blueprint-grid-dark z-20 opacity-30"></div>
        <Image src="/multi-car-blueprint.png" alt="Login" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Account <span className="text-blue-400">Access</span>
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Log in to your account or register to access exclusive features
          </p>
        </div>
      </section>

      {/* Login/Register Section */}
      <section ref={ref} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: inView ? 0 : 50, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-zinc-900/50 border border-blue-500/20 rounded-lg overflow-hidden">
              <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 w-full bg-zinc-800/50">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase tracking-wider"
                  >
                    Register
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold uppercase tracking-wider">Welcome Back</h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      Log in to access your account and manage your preferences
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password" className="text-zinc-300">
                          Password
                        </Label>
                        <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 pl-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-zinc-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-zinc-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                      Log In
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-zinc-400 text-sm">
                      Don't have an account?{" "}
                      <button onClick={() => setActiveTab("register")} className="text-blue-400 hover:text-blue-300">
                        Register
                      </button>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold uppercase tracking-wider">Create Account</h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      Register to access exclusive features and save your preferences
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name" className="text-zinc-300">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="John Doe"
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-zinc-300">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-zinc-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 pl-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-zinc-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-zinc-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-zinc-300">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="bg-zinc-800 border-blue-500/20 focus:border-blue-500/50 pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-blue-500/30 bg-zinc-800 text-blue-500 focus:ring-blue-500/30"
                      />
                      <label htmlFor="terms" className="text-sm text-zinc-400">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 uppercase tracking-wider">
                      Register
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-zinc-400 text-sm">
                      Already have an account?{" "}
                      <button onClick={() => setActiveTab("login")} className="text-blue-400 hover:text-blue-300">
                        Log In
                      </button>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
