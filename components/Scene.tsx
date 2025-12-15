import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import Ball3D from './Ball3D';
import { SphereProps } from '../types';
import { Vector2 } from 'three';

// Add type definitions for R3F elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      group: any;
      directionalLight: any;
    }
  }
}

// Inherit props from types.ts
interface SceneProps extends SphereProps {}

const Scene: React.FC<SceneProps> = (props) => {
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
        
        <group position={[0, 0, 0]}>
            <Ball3D {...props} />
        </group>
        
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
            maxDistance={12}
            autoRotate={false}
            dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
};

export default Scene;