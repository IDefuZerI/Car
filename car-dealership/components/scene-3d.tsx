"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

function Model({ modelPath, scale = 1 }) {
    const { scene } = useGLTF(modelPath)
    const modelRef = useRef()

    useEffect(() => {
        if (scene) {
            scene.scale.set(scale, scale, scale)
        }
    }, [scene, scale])

    useFrame((state, delta) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += delta * 0.2
        }
    })

    return <primitive ref={modelRef} object={scene} />
}

export default function Scene3D({ modelPath, scale = 1 }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                <div className="text-center text-blue-400">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 mx-auto mb-2"></div>
                    <p>Loading 3D model...</p>
                </div>
            </div>
        )
    }

    return (
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <Model modelPath={modelPath} scale={scale} />
            <OrbitControls />
        </Canvas>
    )
}
