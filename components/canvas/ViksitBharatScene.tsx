'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function ViskitBharatScene() {
    const groupRef = useRef<THREE.Group>(null)
    const card1Ref = useRef<THREE.Mesh>(null)
    const card2Ref = useRef<THREE.Mesh>(null)
    const card3Ref = useRef<THREE.Mesh>(null)

    useGSAP(() => {
        if (!groupRef.current) return

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#viksit-bharat-section', // ID from the DOM component
                start: 'top bottom',
                end: 'center center',
                scrub: 1,
            }
        })

        // Initial state: hidden/off-screen
        timeline.from(groupRef.current.position, {
            y: -10,
            x: 5,
            duration: 2
        })

        timeline.to(groupRef.current.rotation, {
            y: Math.PI * 0.2, // Rotate slightly
            duration: 2
        }, 0)

        // Fan out cards
        const cardTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#viksit-bharat-section',
                start: 'top center',
                end: 'bottom bottom',
                scrub: 1
            }
        })

        if (card1Ref.current && card2Ref.current && card3Ref.current) {
            cardTimeline.to(card1Ref.current.position, { x: -1.2, rotationZ: 0.1 }, 0)
            cardTimeline.to(card3Ref.current.position, { x: 1.2, rotationZ: -0.1 }, 0)
        }

    }, [])

    return (
        <group ref={groupRef} position={[3, 0, 0]}>
            {/* Main "Vision Deck" container style */}
            <mesh ref={card2Ref} position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial color="#ff9933" roughness={0.3} metalness={0.1} /> {/* Saffron */}
            </mesh>
            <mesh ref={card1Ref} position={[0, 0, -0.1]} castShadow receiveShadow>
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} /> {/* White */}
            </mesh>
            <mesh ref={card3Ref} position={[0, 0, -0.2]} castShadow receiveShadow>
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial color="#138808" roughness={0.3} metalness={0.1} /> {/* Green */}
            </mesh>
        </group>
    )
}
