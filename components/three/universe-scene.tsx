"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Stars, Trail } from "@react-three/drei"
import * as THREE from "three"
import { useScrollStore } from "@/hooks/use-scroll-store"

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const count = 3000

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color("#06b6d4"),
      new THREE.Color("#fb7185"),
      new THREE.Color("#fbbf24"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#f0f0f5"),
    ]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01
      ref.current.rotation.x += delta * 0.003
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ─── Floating Wireframe Shapes ─────────────────────────────────────────────────
function WireShape({
  position,
  geometry,
  color,
  speed = 0.3,
  rotDir = [1, 1, 0],
}: {
  position: [number, number, number]
  geometry: "box" | "icosa" | "torus" | "octa"
  color: string
  speed?: number
  rotDir?: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * speed * rotDir[0]
      ref.current.rotation.y += delta * speed * rotDir[1]
      ref.current.rotation.z += delta * speed * rotDir[2]
    }
  })

  const mat = (
    <meshStandardMaterial
      color={color}
      wireframe
      emissive={color}
      emissiveIntensity={0.6}
    />
  )

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        {geometry === "box" && <boxGeometry args={[2.5, 2.5, 2.5]} />}
        {geometry === "icosa" && <icosahedronGeometry args={[1.6, 0]} />}
        {geometry === "torus" && <torusGeometry args={[1.8, 0.08, 16, 60]} />}
        {geometry === "octa" && <octahedronGeometry args={[1.8, 0]} />}
        {mat}
      </mesh>
    </Float>
  )
}

// ─── Metallic Solid Shapes ─────────────────────────────────────────────────────
function MetallicSphere({
  position,
  color,
  size = 1,
}: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.4
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

// ─── Glowing Ring ──────────────────────────────────────────────────────────────
function GlowRing({
  position,
  color,
  radius = 3,
}: {
  position: [number, number, number]
  color: string
  radius?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4
      ref.current.rotation.y += delta * 0.2
    }
  })
  return (
    <Float speed={1.2} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[radius, 0.06, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

// ─── Scroll-driven Camera ──────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const scrollProgress = useScrollStore((s) => s.progress)

  // Camera path: fly forward from z=30 to z=-120 as user scrolls
  useFrame(() => {
    const target = new THREE.Vector3(
      Math.sin(scrollProgress * Math.PI * 0.5) * 4,
      -scrollProgress * 15 + 2,
      30 - scrollProgress * 150,
    )
    camera.position.lerp(target, 0.05)
    camera.lookAt(
      Math.sin(scrollProgress * Math.PI * 0.5) * 2,
      -scrollProgress * 15 - 2,
      target.z - 15,
    )
  })

  return null
}

// ─── Scene Lighting ────────────────────────────────────────────────────────────
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 20, 10]} color="#06b6d4" intensity={80} />
      <pointLight position={[-20, -10, -30]} color="#fb7185" intensity={60} />
      <pointLight position={[0, 0, -60]} color="#a78bfa" intensity={40} />
      <pointLight position={[15, 5, -90]} color="#06b6d4" intensity={50} />
      <pointLight position={[-15, -5, -120]} color="#fb7185" intensity={40} />
    </>
  )
}

// ─── Nebula Cluster ────────────────────────────────────────────────────────────
function NebulaCluster({ zOffset = 0 }: { zOffset?: number }) {
  const count = 600
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 + zOffset
    }
    return arr
  }, [zOffset])

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const c1 = new THREE.Color("#06b6d4")
    const c2 = new THREE.Color("#a78bfa")
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      const c = c1.clone().lerp(c2, t)
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.5} vertexColors transparent opacity={0.4} depthWrite={false} />
    </points>
  )
}

// ─── Main Scene ────────────────────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <Lighting />
      <ParticleField />
      <Stars radius={150} depth={60} count={2000} factor={3} fade speed={0.5} />
      <CameraRig />

      {/* Nebula clouds at each section depth */}
      <NebulaCluster zOffset={0} />
      <NebulaCluster zOffset={-35} />
      <NebulaCluster zOffset={-70} />
      <NebulaCluster zOffset={-105} />
      <NebulaCluster zOffset={-140} />

      {/* Hero zone shapes (z ~ 10 to -10) */}
      <WireShape position={[-8, 3, -5]} geometry="icosa" color="#06b6d4" speed={0.5} />
      <WireShape position={[9, -2, -8]} geometry="box" color="#fb7185" speed={0.3} rotDir={[1, 0, 1]} />
      <GlowRing position={[0, 6, -12]} color="#fbbf24" radius={2.5} />
      <MetallicSphere position={[-12, -4, -6]} color="#06b6d4" size={1.2} />
      <MetallicSphere position={[14, 2, -10]} color="#fb7185" size={0.8} />

      {/* About zone (z ~ -30 to -45) */}
      <WireShape position={[10, 5, -38]} geometry="octa" color="#a78bfa" speed={0.4} rotDir={[0, 1, 1]} />
      <WireShape position={[-12, -3, -42]} geometry="torus" color="#06b6d4" speed={0.25} />
      <GlowRing position={[-5, 8, -40]} color="#fb7185" radius={3.5} />
      <MetallicSphere position={[6, -6, -36]} color="#fbbf24" size={1.5} />

      {/* Skills zone (z ~ -60 to -75) */}
      <WireShape position={[-10, 4, -65]} geometry="icosa" color="#fbbf24" speed={0.6} />
      <WireShape position={[12, -5, -70]} geometry="box" color="#a78bfa" speed={0.35} rotDir={[1, 1, 0]} />
      <GlowRing position={[3, 7, -68]} color="#06b6d4" radius={4} />
      <MetallicSphere position={[-7, -3, -62]} color="#fb7185" size={1.0} />
      <MetallicSphere position={[15, 3, -72]} color="#06b6d4" size={0.9} />

      {/* Projects zone (z ~ -95 to -110) */}
      <WireShape position={[-14, 6, -100]} geometry="torus" color="#fb7185" speed={0.3} rotDir={[1, 0.5, 1]} />
      <WireShape position={[11, -4, -105]} geometry="icosa" color="#06b6d4" speed={0.5} />
      <GlowRing position={[0, -5, -98]} color="#a78bfa" radius={3} />
      <MetallicSphere position={[8, 7, -102]} color="#fbbf24" size={1.3} />

      {/* Contact zone (z ~ -130 to -150) */}
      <WireShape position={[8, 3, -135]} geometry="box" color="#34d399" speed={0.4} rotDir={[0, 1, 0]} />
      <WireShape position={[-10, -5, -140]} geometry="octa" color="#06b6d4" speed={0.55} rotDir={[1, 1, 1]} />
      <GlowRing position={[-3, 6, -138]} color="#34d399" radius={3.2} />
      <MetallicSphere position={[12, -2, -133]} color="#fb7185" size={1.1} />
    </>
  )
}

// ─── Canvas Export ─────────────────────────────────────────────────────────────
export default function UniverseScene() {
  return (
    <Canvas
      className="!fixed inset-0 z-0"
      style={{ background: "#080810" }}
      camera={{ position: [0, 2, 30], fov: 60, near: 0.1, far: 400 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      <SceneContent />
    </Canvas>
  )
}
