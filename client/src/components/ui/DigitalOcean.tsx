import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaveMesh = () => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create a grid of points
  const count = 100;
  const sep = 3;
  const positions = useMemo(() => {
    const positions = [];
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = 0;
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [count, sep]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const t = clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        
        // Wave calculation
        // Mix of sine waves for organic movement
        positions[i + 1] = 
          Math.sin(x * 0.05 + t * 0.8) * 4 + 
          Math.sin(z * 0.03 + t * 0.4) * 4 +
          Math.sin((x + z) * 0.02 + t * 0.6) * 3;
          
        i += 3;
      }
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} position={[0, -10, -20]} rotation={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.15}
        color="#06b6d4" // Cyan-500
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const CyberLines = () => {
    const linesRef = useRef<THREE.LineSegments>(null);

    useFrame(({ clock }) => {
        if(linesRef.current) {
            linesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
        }
    })

    return (
        <lineSegments ref={linesRef} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
             <edgesGeometry args={[new THREE.IcosahedronGeometry(30, 2)]} />
             <lineBasicMaterial color="#0891b2" transparent opacity={0.1} />
        </lineSegments>
    )
}

const DigitalOcean = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas
        camera={{ position: [0, 15, 30], fov: 60 }}
        dpr={[1, 2]} // Support high DPI screens
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 20, 90]} />
        <ambientLight intensity={0.5} />
        
        <WaveMesh />
        <CyberLines />
        
        {/* Glow effect in the background */}
      </Canvas>
      
      {/* Overlay Gradients for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none"></div>
    </div>
  );
};

export default DigitalOcean;
