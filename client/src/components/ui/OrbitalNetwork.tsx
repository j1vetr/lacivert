import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SatelliteSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create thousands of satellites
  const count = 4000;
  const radius = 18;
  
  const positions = useMemo(() => {
    const pos = [];
    const colors = [];
    const color1 = new THREE.Color("#0ea5e9"); // Sky-500
    const color2 = new THREE.Color("#ffffff"); // White
    
    for (let i = 0; i < count; i++) {
      // Random point on sphere surface
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      const r = radius + (Math.random() - 0.5) * 0.5; // Slight altitude variation
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos.push(x, y, z);
      
      // Random color mix
      const mixedColor = color1.clone().lerp(color2, Math.random() > 0.8 ? 1 : 0);
      colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
    }
    
    return {
        pos: new Float32Array(pos),
        col: new Float32Array(colors)
    };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      // Rotate the entire swarm
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.z = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions.pos}
          count={positions.pos.length / 3}
          itemSize={3}
        />
        <bufferAttribute
            attach="attributes-color"
            array={positions.col}
            count={positions.col.length / 3}
            itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ConnectionLines = () => {
    const linesRef = useRef<THREE.LineSegments>(null);

    useFrame(({ clock }) => {
        if(linesRef.current) {
            linesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
            linesRef.current.rotation.z = clock.getElapsedTime() * 0.02;
        }
    })

    return (
        <lineSegments ref={linesRef}>
             <edgesGeometry args={[new THREE.IcosahedronGeometry(17.8, 3)]} />
             <lineBasicMaterial color="#0284c7" transparent opacity={0.08} />
        </lineSegments>
    )
}

const CoreSphere = () => {
    return (
        <mesh>
            <sphereGeometry args={[10, 32, 32]} />
            <meshBasicMaterial color="#000000" />
        </mesh>
    )
}

const OrbitalNetwork = () => {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas
        camera={{ position: [0, 0, 35], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#020617', 25, 50]} />
        
        <SatelliteSwarm />
        <ConnectionLines />
        {/* <CoreSphere /> Optional: hide earth core to make it look like pure network */}
        
      </Canvas>
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_120%)] pointer-events-none"></div>
    </div>
  );
};

export default OrbitalNetwork;
