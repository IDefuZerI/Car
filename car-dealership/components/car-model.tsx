"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type * as THREE from "three"

export default function CarModel() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>

      <Environment preset="city" />
    </>
  )
}
