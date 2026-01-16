import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, Sparkles, Trail } from '@react-three/drei';
import * as THREE from 'three';

// ------------------------------------------------------------------
// 1. CYBER WAVES (Main Ocean Effect)
// ------------------------------------------------------------------
const CyberWaves = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Grid parameters
  const xCount = 100;
  const zCount = 100;
  const count = xCount * zCount;
  const sep = 1.5; // Separation between points

  // Initial positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    let i = 0;
    for (let xi = 0; xi < xCount; xi++) {
      for (let zi = 0; zi < zCount; zi++) {
        const x = sep * (xi - xCount / 2);
        const z = sep * (zi - zCount / 2);
        const y = 0;
        pos[i] = x;
        pos[i + 1] = y;
        pos[i + 2] = z;
        i += 3;
      }
    }
    return pos;
  }, [count, sep]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const t = state.clock.getElapsedTime();
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    let i = 0;
    for (let xi = 0; xi < xCount; xi++) {
      for (let zi = 0; zi < zCount; zi++) {
        const x = sep * (xi - xCount / 2);
        const z = sep * (zi - zCount / 2);
        
        // Complex wave function for "Cyber Ocean" feel
        // Mix of low frequency swell and high frequency "noise"
        const y = 
          Math.sin(x * 0.1 + t * 0.5) * 2.0 +     // Big swell
          Math.sin(z * 0.08 + t * 0.4) * 2.0 +    // Cross swell
          Math.sin((x + z) * 0.2 + t * 1.5) * 0.5; // High freq ripple

        positions[i + 1] = y;
        i += 3;
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, -10, -30]} rotation={[0.1, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors={false}
        color="#06b6d4" // Cyan-500
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ------------------------------------------------------------------
// 2. DATA STREAMS (Vertical Lines rising)
// ------------------------------------------------------------------
const DataStream = () => {
    const groupRef = useRef<THREE.Group>(null);
    const count = 30;

    const streams = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            x: (Math.random() - 0.5) * 150,
            z: (Math.random() - 0.5) * 100 - 20, // Push back a bit
            speed: Math.random() * 0.5 + 0.2,
            height: Math.random() * 20 + 10,
            offset: Math.random() * 100
        }));
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.children.forEach((child, i) => {
            const s = streams[i];
            // Move up
            child.position.y = -10 + ((state.clock.elapsedTime * s.speed * 5 + s.offset) % 40);
            // Fade out at top? We use fog for that naturally
        });
    });

    return (
        <group ref={groupRef}>
            {streams.map((s, i) => (
                <mesh key={i} position={[s.x, 0, s.z]}>
                    <cylinderGeometry args={[0.05, 0.05, s.height, 4]} />
                    <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
                </mesh>
            ))}
        </group>
    );
};

// ------------------------------------------------------------------
// 3. FLOATING SATELLITE NODES
// ------------------------------------------------------------------
const SatelliteNodes = () => {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sparkles 
                count={50}
                scale={[100, 30, 50]}
                position={[0, 10, -30]}
                size={4}
                speed={0.4}
                opacity={0.8}
                color="#22d3ee" // Cyan-400
            />
        </Float>
    );
}

// ------------------------------------------------------------------
// 4. MOUSE PARALLAX CONTROLLER
// ------------------------------------------------------------------
const CameraRig = () => {
    const { camera, mouse } = useThree();
    
    useFrame(() => {
        // Smoothly interpolate camera position based on mouse
        // Target position
        const targetX = mouse.x * 2; // Move 2 units left/right
        const targetY = mouse.y * 1 + 15; // Move 1 unit up/down, base height 15

        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        
        // Always look at horizon
        camera.lookAt(0, 0, -50);
    });
    
    return null;
}

// ------------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------------
const DigitalOcean = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas
        camera={{ position: [0, 15, 30], fov: 45 }}
        dpr={[1, 2]} // High DPI support
        gl={{ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance" 
        }}
      >
        {/* Environment */}
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 10, 120]} />
        <ambientLight intensity={0.5} />
        
        {/* Elements */}
        <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <CyberWaves />
        <DataStream />
        <SatelliteNodes />
        
        {/* Interaction */}
        <CameraRig />
      </Canvas>
      
      {/* Overlay Gradients for Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_120%)] pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default DigitalOcean;
