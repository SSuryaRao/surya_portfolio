'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LowPolyDome() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05
        }
    })

    return (
        <mesh ref={meshRef} position={[0, -2, 0]} scale={[10, 10, 10]}>
            <sphereGeometry args={[1, 12, 8]} /> {/* Low poly segments */}
            <meshStandardMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.15}
                side={THREE.BackSide}
            />
        </mesh>
    )
}
