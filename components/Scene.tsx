import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, MeshReflectorMaterial, Grid } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import Ball3D from './Ball3D';
import { PhysicsBalls } from './PhysicsBalls'; // Import Physics Balls
import { SphereProps } from '../types';
import { Vector2 } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      directionalLight: any;
      group: any;
      planeGeometry: any;
      shadowMaterial: any;
    }
  }
}

// Inherit props from types.ts
interface SceneProps extends SphereProps {}

const Scene: React.FC<SceneProps> = (props) => {
  // Define floor level to match physics floor
  const floorY = -3.0;

  return (
    <Canvas
      gl={{ antialias: true, toneMappingExposure: 1.0 }}
      dpr={[1, 2]}
      shadows
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      
      <Suspense fallback={null}>
        
        {/* Light Presets */}
        {props.lightPreset === 'studio' && (
          <>
            <ambientLight intensity={0.4} /> 
            <spotLight 
                position={[5, 8, 5]} 
                angle={0.5} 
                penumbra={0.5} 
                intensity={150} 
                castShadow 
                shadow-bias={-0.0001}
                color="#ffffff"
            />
            <pointLight position={[-5, 0, 5]} intensity={80} color="#eef" />
            <spotLight position={[0, 5, -5]} intensity={100} color="#ffd" angle={1} />
          </>
        )}

        {props.lightPreset === 'cyberpunk' && (
          <>
             <ambientLight intensity={0.1} />
             <spotLight position={[5, 5, 5]} intensity={200} color="#00ffff" penumbra={1} />
             <pointLight position={[-5, -2, 2]} intensity={150} color="#ff00ff" />
             <pointLight position={[0, 5, -5]} intensity={50} color="#0000ff" />
          </>
        )}

        {props.lightPreset === 'sunset' && (
          <>
             <ambientLight intensity={0.5} color="#ffaa88" />
             <directionalLight position={[-5, 2, 5]} intensity={3} color="#ff9900" castShadow />
             <pointLight position={[5, 0, 2]} intensity={20} color="#8800ff" />
             <spotLight position={[0, 5, 0]} intensity={50} color="#ffaaaa" />
          </>
        )}
        
        {/* Environment - Optional Background */}
        <Environment preset={props.lightPreset === 'sunset' ? 'sunset' : 'city'} blur={1} background={props.showEnvBackground} />
        
        {/* Option 1: Reflector Floor */}
        {props.floorReflector && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={50}
                    roughness={props.floorRoughness} // Use prop
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color={props.floorColor} // Use prop
                    metalness={0.5}
                    mirror={props.floorReflectionStrength} // Use prop
                />
            </mesh>
        )}

        {/* Option 2: Real Shadows Floor */}
        {props.floorShadows && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floorY + 0.01, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial transparent opacity={0.4} color={props.floorColor} />
            </mesh>
        )}

        {/* Option 3: Grid */}
        {props.floorGrid && (
            <Grid 
                position={[0, floorY + 0.02, 0]} 
                args={[30, 30]} 
                cellSize={1} 
                cellThickness={1} 
                cellColor="#6f6f6f" 
                sectionSize={5} 
                sectionThickness={1.5} 
                sectionColor="#9d4b4b" 
                fadeDistance={25} 
                infiniteGrid 
            />
        )}

        {/* 
            Render Main Ball ONLY if physics is NOT active.
            User requested "ball in middle is hidden" when physics start.
        */}
        {!props.physicsActive && (
            <group position={[0, 0, 0]}>
                <Ball3D {...props} />
            </group>
        )}
        
        {/* Render Falling Balls (Physics) if Enabled in Menu */}
        {props.enablePhysics && (
           <PhysicsBalls {...props} />
        )}
        
        {/* Default ContactShadows (Fake ambient shadow) - Always kept as base */}
        <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.5} 
            scale={12} 
            blur={2} 
            far={5} 
        />
        
        {/* Post Processing Effects */}
        <EffectComposer enableNormalPass={false}>
            {props.enableBloom && (
                <Bloom 
                    luminanceThreshold={0.5} 
                    mipmapBlur 
                    intensity={props.bloomIntensity} 
                    radius={0.6}
                />
            )}
            {props.enableNoise && (
                <Noise opacity={props.noiseOpacity} />
            )}
            {props.enableGlitch && (
                <ChromaticAberration offset={new Vector2(0.004, 0.004)} />
            )}
        </EffectComposer>

        <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={2.5} 
            maxDistance={25} 
            autoRotate={false}
            dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;