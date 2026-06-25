import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, TorusKnot, Stars } from "@react-three/drei";
import * as THREE from "three";
import type { Mode } from "../data/resume";

function FloatingCore({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.15;
      mesh.current.rotation.y = t * 0.2;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <TorusKnot ref={mesh} args={[1.1, 0.32, 220, 32]} scale={1.05}>
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.25}
          wireframe
        />
      </TorusKnot>
    </Float>
  );
}

function Particles({ color }: { color: string }) {
  const points = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.045} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function OrbitingShapes({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.getElapsedTime() * 0.12;
  });
  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
            <Icosahedron
              args={[0.28, 0]}
              position={[Math.cos(angle) * 3.2, Math.sin(angle * 1.3) * 1.4, Math.sin(angle) * 3.2]}
            >
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.4} />
            </Icosahedron>
          </Float>
        );
      })}
    </group>
  );
}

export default function Scene3D({ mode }: { mode: Mode }) {
  const color = mode === "ai" ? "#a855f7" : "#38bdf8";
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color={color} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ffffff" />
      <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={1} />
      <FloatingCore color={color} />
      <OrbitingShapes color={color} />
      <Particles color={color} />
    </Canvas>
  );
}
