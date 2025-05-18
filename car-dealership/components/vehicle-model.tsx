"use client"
import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Html, useProgress, useGLTF } from "@react-three/drei"
import { Suspense } from "react"

// Component to display loading progress
function Loader() {
    const { progress } = useProgress()

    return (
        <Html center>
            <div className="text-center text-blue-400">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mx-auto mb-2"></div>
                <p>{Math.round(progress)}% loaded</p>
            </div>
        </Html>
    )
}

// Component for the 3D model
function Model({ modelPath, onLoaded }) {
    const group = useRef()
    const { camera } = useThree()
    const [isRotating, setIsRotating] = useState(true)
    const { scene } = useGLTF(modelPath)

    // Set up the model when it's loaded
    useEffect(() => {
        if (scene) {
            // Reset position and rotation
            scene.position.set(0, 0, 0)
            scene.rotation.set(0, 0, 0)

            // Much larger scale - 5x bigger than before
            scene.scale.set(30, 30, 30)

            // Position camera very close to the model
            if (camera) {
                camera.position.set(1, 0.5, 1)
                camera.lookAt(0, 0, 0)
                camera.updateProjectionMatrix()
            }

            // Notify parent when model is loaded
            setTimeout(() => {
                if (onLoaded) onLoaded()
            }, 500)
        }
    }, [scene, camera, onLoaded])

    // Auto-rotate the model - slower rotation speed
    useFrame((state, delta) => {
        if (group.current && isRotating) {
            group.current.rotation.y += delta * 0.15
        }
    })

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    )
}

// Wrapper component to handle client-side only rendering
function ModelCanvas({ modelPath, onLoaded }) {
    return (
        <Canvas shadows>
            <Suspense fallback={<Loader />}>
                <PerspectiveCamera makeDefault position={[1, 0.5, 1]} fov={40} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                <Model modelPath={modelPath} onLoaded={onLoaded} />
                <Environment preset="city" />
                <OrbitControls
                    enablePan={true}
                    minDistance={0.5}
                    maxDistance={5}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI}
                    target={[0, 0, 0]}
                />
            </Suspense>
        </Canvas>
    )
}

export default function VehicleModel({ modelPath, onLoaded }) {
    const [isMounted, setIsMounted] = useState(false)

    // Only render the 3D canvas on the client
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                <div className="text-center text-blue-400">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Loading 3D viewer...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <ModelCanvas modelPath={modelPath} onLoaded={onLoaded} />
        </div>
    )
}
