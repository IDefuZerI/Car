"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Text, Html, useProgress, useGLTF, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Vector3 } from "three"

// Loading indicator for 3D models
function Loader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div className="text-center text-blue-400">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-xs">{Math.round(progress)}%</p>
            </div>
        </Html>
    )
}

// Component for the GTR-R34 3D model using GLB file
function GTRR34Model({ position, rotation = [0, 0, 0], selected = false, onClick }) {
    const group = useRef()
    const { scene } = useGLTF("/models/gtr-r34.glb")

    // Set up the model when it's loaded
    useEffect(() => {
        if (scene) {
            // Reset position and rotation
            scene.position.set(0, 0, 0)
            scene.rotation.set(0, 0, 0)

            // Apply the same scale as in vehicle-model.tsx
            scene.scale.set(30, 30, 30)

            // Make sure the model casts and receives shadows
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })
        }
    }, [scene])

    // Auto-rotate the model when selected
    useFrame((state, delta) => {
        if (group.current && selected) {
            group.current.rotation.y += 0.005
        }
    })

    return (
        <group ref={group} position={position} onClick={onClick} rotation={rotation}>
            <primitive object={scene} />

            {/* Highlight under the car when selected */}
            {selected && (
                <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[3, 6]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
                </mesh>
            )}

            {/* GT-R R34 text */}
            {selected && (
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.3}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.01}
                    outlineColor="#000000"
                >
                    GT-R R34
                </Text>
            )}
        </group>
    )
}

// Simple car component for other vehicles
function SimpleCar({ position, color, scale = 1, rotation = [0, 0, 0], selected = false, onClick, name }) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        if (meshRef.current && selected) {
            meshRef.current.rotation.y += 0.005
        }
    })

    return (
        <group
            position={position}
            onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <mesh ref={meshRef} rotation={rotation} scale={[scale, scale * 0.4, scale * 2]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={hovered ? "#ffffff" : color}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={selected ? color : "#000000"}
                    emissiveIntensity={selected ? 0.3 : 0}
                />
            </mesh>

            {/* Highlight under the car when selected */}
            {selected && (
                <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[3, 6]} />
                    <meshBasicMaterial color={color} transparent opacity={0.1} />
                </mesh>
            )}

            {/* Vehicle name */}
            {(hovered || selected) && (
                <Text
                    position={[0, 0.8, 0]}
                    fontSize={0.3}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.01}
                    outlineColor="#000000"
                >
                    {name}
                </Text>
            )}

            {/* Line from car to ground when selected */}
            {selected && (
                <mesh position={[0, -0.3, 0]} scale={[0.02, 0.6, 0.02]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color={color} transparent opacity={0.5} />
                </mesh>
            )}
        </group>
    )
}

// Camera controller component
function CameraController({ target, selectedVehicle }) {
    const { camera } = useThree()
    const controlsRef = useRef()

    useEffect(() => {
        if (target && controlsRef.current) {
            const targetPosition = new Vector3(target[0], target[1], target[2])
            controlsRef.current.target = targetPosition

            // Position camera relative to target
            const cameraPosition = new Vector3(target[0] + 3, target[1] + 2, target[2] + 6)
            camera.position.copy(cameraPosition)
            controlsRef.current.update()
        }
    }, [camera, target, selectedVehicle])

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            rotateSpeed={0.5}
        />
    )
}

// Vehicle scene component
function VehicleScene({ category, selectedVehicle, onSelectVehicle }) {
    const cameraRef = useRef()

    // Vehicle data by category
    const vehiclesByCategory = {
        sports: [
            { id: "gtr-r34", name: "Nissan GT-R R34", position: [-4, 0, 0], color: "#0ea5e9", scale: 1.2 },
            { id: "rx7-fd", name: "Mazda RX-7 FD", position: [0, 0, 0], color: "#3b82f6", scale: 0.9 },
            { id: "supra-mk4", name: "Toyota Supra MK4", position: [4, 0, 0], color: "#f59e0b", scale: 1 },
            { id: "350z", name: "Nissan 350Z", position: [-4, 0, -4], color: "#84cc16", scale: 1.1 },
            { id: "rx8", name: "Mazda RX-8", position: [0, 0, -4], color: "#ec4899", scale: 0.95 },
            { id: "silvia-s15", name: "Nissan Silvia S15", position: [4, 0, -4], color: "#8b5cf6", scale: 1 },
        ],
        convertible: [
            { id: "mx5-miata", name: "Mazda MX-5 Miata", position: [-4, 0, 0], color: "#10b981", scale: 1.1 },
            { id: "s2000", name: "Honda S2000", position: [0, 0, 0], color: "#8b5cf6", scale: 0.9 },
            { id: "370z-roadster", name: "Nissan 370Z Roadster", position: [4, 0, 0], color: "#ec4899", scale: 1 },
            { id: "boxster", name: "Porsche Boxster", position: [-4, 0, -4], color: "#f59e0b", scale: 1 },
            { id: "z4", name: "BMW Z4", position: [0, 0, -4], color: "#3b82f6", scale: 1.05 },
        ],
        supercar: [
            { id: "nsx", name: "Honda NSX", position: [-4, 0, 0], color: "#f43f5e", scale: 1.3 },
            { id: "gtr-r35", name: "Nissan GT-R R35", position: [0, 0, 0], color: "#facc15", scale: 1 },
            { id: "rx7-veilside", name: "Mazda RX-7 Veilside", position: [4, 0, 0], color: "#a3e635", scale: 1.1 },
        ],
        sedan: [
            { id: "altima", name: "Nissan Altima", position: [-4, 0, 0], color: "#6366f1", scale: 1.1 },
            { id: "sentra", name: "Nissan Sentra", position: [0, 0, 0], color: "#0ea5e9", scale: 0.9 },
            { id: "mazda6", name: "Mazda 6", position: [4, 0, 0], color: "#64748b", scale: 1 },
            { id: "maxima", name: "Nissan Maxima", position: [-4, 0, -4], color: "#f97316", scale: 1.1 },
            { id: "mazda3", name: "Mazda 3", position: [0, 0, -4], color: "#ef4444", scale: 0.9 },
            { id: "versa", name: "Nissan Versa", position: [4, 0, -4], color: "#84cc16", scale: 0.85 },
        ],
        suv: [
            { id: "cx5", name: "Mazda CX-5", position: [-4, 0, 0], color: "#84cc16", scale: 1.2 },
            { id: "rogue", name: "Nissan Rogue", position: [0, 0, 0], color: "#14b8a6", scale: 1 },
            { id: "cx9", name: "Mazda CX-9", position: [4, 0, 0], color: "#f97316", scale: 1.1 },
            { id: "murano", name: "Nissan Murano", position: [-4, 0, -4], color: "#6366f1", scale: 1.05 },
            { id: "cx30", name: "Mazda CX-30", position: [0, 0, -4], color: "#ef4444", scale: 0.9 },
            { id: "pathfinder", name: "Nissan Pathfinder", position: [4, 0, -4], color: "#0ea5e9", scale: 1.15 },
        ],
    }

    const vehicles = vehiclesByCategory[category] || vehiclesByCategory.sports

    // Find selected vehicle for camera positioning
    const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle)
    const cameraTarget = selectedVehicleData ? selectedVehicleData.position : [0, 0, 0]

    return (
        <>
            {/* Background */}
            <color attach="background" args={["#0a0a1a"]} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Main grid */}
            <gridHelper args={[100, 100, "#3b82f6", "#1e293b"]} position={[0, -0.99, 0]} />

            {/* Additional grid lines for depth */}
            <gridHelper args={[100, 20, "#60a5fa", "#1e293b"]} position={[0, -0.98, 0]} rotation={[0, Math.PI / 4, 0]} />

            {/* Horizontal lines */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={`h-line-${i}`} position={[0, -0.97 + i * 0.5, -50 + i * 10]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[100, 0.1]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.1 - i * 0.015} side={2} />
                </mesh>
            ))}

            {/* Vertical lines */}
            {Array.from({ length: 7 }).map((_, i) => (
                <mesh key={`v-line-${i}`} position={[-30 + i * 10, 0, -50]} rotation={[0, 0, Math.PI / 2]}>
                    <planeGeometry args={[10, 0.1]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={2} />
                </mesh>
            ))}

            {/* Circular elements */}
            <mesh position={[-20, 5, -60]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[9.8, 10, 32]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={2} />
            </mesh>

            <mesh position={[20, 8, -70]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[14.8, 15, 32]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.07} side={2} />
            </mesh>

            {/* Technical elements */}
            <mesh position={[0, 15, -80]} rotation={[0, 0, 0]}>
                <planeGeometry args={[40, 20]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} side={2} wireframe={true} />
            </mesh>

            <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 8]} fov={40} />
            <CameraController target={cameraTarget} selectedVehicle={selectedVehicle} />

            {/* Lighting setup matching vehicle-model.tsx */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Environment preset="city" />

            <group>
                {vehicles.map((vehicle, index) => {
                    // Use the GTR-R34 3D model for the GTR-R34 vehicle
                    if (vehicle.id === "gtr-r34") {
                        return (
                            <Suspense
                                key={vehicle.id}
                                fallback={
                                    <mesh position={vehicle.position} scale={[1, 0.4, 2]}>
                                        <boxGeometry />
                                        <meshStandardMaterial color="#0ea5e9" wireframe />
                                    </mesh>
                                }
                            >
                                <GTRR34Model
                                    position={vehicle.position}
                                    rotation={[0, (Math.PI / 6) * ((index % 3) - 1), 0]}
                                    selected={selectedVehicle === vehicle.id}
                                    onClick={() => onSelectVehicle(vehicle.id)}
                                />
                            </Suspense>
                        )
                    }

                    // Use simple car models for other vehicles
                    return (
                        <SimpleCar
                            key={vehicle.id}
                            position={vehicle.position}
                            color={vehicle.color}
                            scale={vehicle.scale}
                            rotation={[0, (Math.PI / 6) * ((index % 3) - 1), 0]}
                            selected={selectedVehicle === vehicle.id}
                            onClick={() => onSelectVehicle(vehicle.id)}
                            name={vehicle.name}
                        />
                    )
                })}
            </group>
        </>
    )
}

// Preload the model
useGLTF.preload("/models/gtr-r34.glb")

// Main Vehicle Explorer component
export default function VehicleExplorer() {
    const [activeCategory, setActiveCategory] = useState("sports")
    const [selectedVehicle, setSelectedVehicle] = useState(null)

    // Select first vehicle in category when category changes
    useEffect(() => {
        const vehiclesByCategory = {
            sports: ["gtr-r34", "rx7-fd", "supra-mk4", "350z", "rx8", "silvia-s15"],
            convertible: ["mx5-miata", "s2000", "370z-roadster", "boxster", "z4"],
            supercar: ["nsx", "gtr-r35", "rx7-veilside"],
            sedan: ["altima", "sentra", "mazda6", "maxima", "mazda3", "versa"],
            suv: ["cx5", "rogue", "cx9", "murano", "cx30", "pathfinder"],
        }

        setSelectedVehicle(vehiclesByCategory[activeCategory][0])
    }, [activeCategory])

    const categories = [
        { id: "sports", name: "Sports Cars", count: 6 },
        { id: "convertible", name: "Convertibles", count: 5 },
        { id: "supercar", name: "Supercars", count: 3 },
        { id: "sedan", name: "Sedans", count: 6 },
        { id: "suv", name: "SUVs", count: 6 },
    ]

    const vehicleInfo = {
        "gtr-r34": {
            name: "Nissan GT-R R34",
            description: "Legendary Japanese sports car with twin-turbo inline-6 engine",
            specs: "280 HP, AWD, 4.8s 0-60",
        },
        "rx7-fd": {
            name: "Mazda RX-7 FD",
            description: "Iconic rotary-powered sports car with sequential twin turbochargers",
            specs: "255 HP, RWD, 5.3s 0-60",
        },
        "supra-mk4": {
            name: "Toyota Supra MK4",
            description: "Legendary sports car with the renowned 2JZ-GTE engine",
            specs: "320 HP, RWD, 4.6s 0-60",
        },
        "350z": {
            name: "Nissan 350Z",
            description: "Stylish sports coupe with powerful V6 engine",
            specs: "306 HP, RWD, 5.2s 0-60",
        },
        rx8: {
            name: "Mazda RX-8",
            description: "Unique rotary-powered sports car with rear-hinged doors",
            specs: "232 HP, RWD, 6.4s 0-60",
        },
        "silvia-s15": {
            name: "Nissan Silvia S15",
            description: "Iconic drift car with turbocharged engine",
            specs: "250 HP, RWD, 5.5s 0-60",
        },
        "mx5-miata": {
            name: "Mazda MX-5 Miata",
            description: "Lightweight, nimble roadster known for exceptional handling",
            specs: "181 HP, RWD, 5.7s 0-60",
        },
        s2000: {
            name: "Honda S2000",
            description: "High-revving convertible sports car with precise handling",
            specs: "240 HP, RWD, 5.8s 0-60",
        },
        "370z-roadster": {
            name: "Nissan 370Z Roadster",
            description: "Open-top sports car with powerful V6 engine",
            specs: "332 HP, RWD, 5.5s 0-60",
        },
        boxster: {
            name: "Porsche Boxster",
            description: "Mid-engine convertible sports car with balanced handling",
            specs: "300 HP, RWD, 4.9s 0-60",
        },
        z4: {
            name: "BMW Z4",
            description: "Luxury roadster with powerful engine options",
            specs: "255 HP, RWD, 5.2s 0-60",
        },
        nsx: {
            name: "Honda NSX",
            description: "Mid-engine supercar with aluminum body and precise handling",
            specs: "290 HP, RWD, 5.0s 0-60",
        },
        "gtr-r35": {
            name: "Nissan GT-R R35",
            description: "High-performance sports car with advanced AWD system",
            specs: "565 HP, AWD, 2.7s 0-60",
        },
        "rx7-veilside": {
            name: "Mazda RX-7 Veilside",
            description: "Modified RX-7 with the famous Veilside Fortune body kit",
            specs: "300+ HP, RWD, 4.9s 0-60",
        },
        altima: {
            name: "Nissan Altima",
            description: "Mid-size sedan with sporty handling and efficient powertrains",
            specs: "236 HP, FWD, 6.1s 0-60",
        },
        sentra: {
            name: "Nissan Sentra",
            description: "Compact sedan offering good fuel economy and modern features",
            specs: "149 HP, FWD, 8.0s 0-60",
        },
        mazda6: {
            name: "Mazda 6",
            description: "Stylish mid-size sedan with engaging driving dynamics",
            specs: "227 HP, FWD, 6.4s 0-60",
        },
        maxima: {
            name: "Nissan Maxima",
            description: "Full-size sedan with premium features and V6 power",
            specs: "300 HP, FWD, 5.7s 0-60",
        },
        mazda3: {
            name: "Mazda 3",
            description: "Compact sedan with upscale interior and responsive handling",
            specs: "186 HP, FWD, 7.0s 0-60",
        },
        versa: {
            name: "Nissan Versa",
            description: "Subcompact sedan with spacious interior and good fuel economy",
            specs: "122 HP, FWD, 9.0s 0-60",
        },
        cx5: {
            name: "Mazda CX-5",
            description: "Compact crossover SUV with upscale interior and sporty handling",
            specs: "227 HP, AWD, 7.2s 0-60",
        },
        rogue: {
            name: "Nissan Rogue",
            description: "Popular compact SUV with versatile interior and good fuel economy",
            specs: "181 HP, AWD, 8.2s 0-60",
        },
        cx9: {
            name: "Mazda CX-9",
            description: "Three-row SUV with premium feel and responsive handling",
            specs: "250 HP, AWD, 7.1s 0-60",
        },
        murano: {
            name: "Nissan Murano",
            description: "Mid-size crossover with distinctive styling and comfortable ride",
            specs: "260 HP, AWD, 7.3s 0-60",
        },
        cx30: {
            name: "Mazda CX-30",
            description: "Subcompact crossover with premium interior and engaging dynamics",
            specs: "186 HP, AWD, 7.7s 0-60",
        },
        pathfinder: {
            name: "Nissan Pathfinder",
            description: "Three-row SUV with rugged capability and family-friendly features",
            specs: "284 HP, AWD, 6.7s 0-60",
        },
    }

    const categoryInfo = {
        sports: {
            title: "Sports Cars",
            description: "High-performance vehicles designed for speed and handling",
        },
        convertible: {
            title: "Convertibles",
            description: "Open-top vehicles for an exhilarating driving experience",
        },
        supercar: {
            title: "Supercars",
            description: "Exotic high-performance vehicles with cutting-edge technology",
        },
        sedan: {
            title: "Sedans",
            description: "Comfortable four-door vehicles for everyday driving",
        },
        suv: {
            title: "SUVs",
            description: "Versatile vehicles with increased ground clearance and space",
        },
    }

    return (
        <div className="relative w-full h-[700px] bg-[#0a0a1a] overflow-hidden">
            {/* Category menu */}
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-zinc-900/80 backdrop-blur-md z-10 border-r border-blue-500/20 p-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-blue-400 mb-8">Vehicle Explorer</h2>

                <div className="space-y-2">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                                activeCategory === category.id ? "bg-blue-500/20 border-l-2 border-blue-500" : "hover:bg-zinc-800"
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                            whileHover={{ x: 5 }}
                        >
                            <div
                                className={`w-3 h-3 rounded-full mr-3 ${
                                    activeCategory === category.id ? "bg-blue-500" : "bg-zinc-600"
                                }`}
                            />
                            <div className="flex-1">
                                <div className="font-medium">{category.name}</div>
                                <div className="text-xs text-zinc-500">{category.count} vehicles</div>
                            </div>
                            <ChevronRight
                                className={`h-4 w-4 ${activeCategory === category.id ? "text-blue-400" : "text-zinc-600"}`}
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-4 bg-zinc-800/50 border border-blue-500/20 rounded-md">
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Selected Vehicle</div>
                        <div className="text-sm font-medium mb-2">
                            {selectedVehicle ? vehicleInfo[selectedVehicle]?.name : "None"}
                        </div>
                        <Link
                            href={`/vehicles/${selectedVehicle}`}
                            className="text-xs text-blue-400 flex items-center hover:text-blue-300"
                        >
                            View details
                            <ChevronRight className="h-3 w-3 ml-1" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3D scene */}
            <div className="absolute left-64 right-0 top-0 bottom-0">
                <Canvas shadows>
                    <Suspense fallback={<Loader />}>
                        <VehicleScene
                            category={activeCategory}
                            selectedVehicle={selectedVehicle}
                            onSelectVehicle={setSelectedVehicle}
                        />
                    </Suspense>
                </Canvas>

                {/* Selected vehicle info */}
                {selectedVehicle && (
                    <motion.div
                        key={selectedVehicle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute bottom-10 left-10 max-w-md p-6 bg-zinc-900/80 backdrop-blur-sm border border-blue-500/20 rounded-md"
                    >
                        <h3 className="text-2xl font-bold mb-2 text-white">{vehicleInfo[selectedVehicle]?.name}</h3>
                        <p className="text-zinc-300 mb-2">{vehicleInfo[selectedVehicle]?.description}</p>
                        <div className="text-blue-400 text-sm mb-4">{vehicleInfo[selectedVehicle]?.specs}</div>
                        <Link
                            href={`/vehicles/${selectedVehicle}`}
                            className="inline-flex items-center text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            View in Showroom
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
