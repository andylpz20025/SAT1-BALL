import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, DoubleSide, MathUtils, Color, MeshPhysicalMaterial } from 'three';
import { LamellaData } from '../types';

// Add type definitions for R3F elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      circleGeometry: any;
      ringGeometry: any;
    }
  }
}

interface Ball3DProps {
  rotationSpeedX: number;
  rotationSpeedY: number;
  rotationSpeedZ: number;

  expansion: number;
  autoAnimate: boolean;
  animationType: 'breath' | 'wave';
  hoverEffect: boolean;
  scale: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
  colorSpeed: number;
  colorDirection: number;
  lamellaWidth: number;
  verticalStart: number;
  verticalEnd: number;
  lamellaCount: number;
  lamellaList: LamellaData[];
  // NEW Prop
  coreLamellaList: LamellaData[];
  lamellaDepth: number;
  segmentOuterRadius: number;
  segmentInnerRadius: number;
  roughness: number;
  metalness: number;
  clearcoat: number;
  transmission: number;
  thickness: number;
  iridescence: number;
  wireframe: boolean;
  coreColor: string;
  coreOpacity: number;
  coreVisible: boolean;
  coreType: 'solid' | 'segmented';
}

const Ball3D: React.FC<Ball3DProps> = ({ 
    rotationSpeedX, rotationSpeedY, rotationSpeedZ,
    expansion, autoAnimate, animationType, hoverEffect, scale, positionX, positionY, positionZ, tiltX, tiltY, tiltZ,
    colorSpeed, colorDirection,
    lamellaWidth, verticalStart, verticalEnd, lamellaCount, lamellaList, coreLamellaList, lamellaDepth,
    segmentOuterRadius, segmentInnerRadius,
    roughness, metalness, clearcoat, transmission, thickness, iridescence, wireframe,
    coreColor, coreOpacity, coreVisible, coreType
}) => {
  const outerGroupRef = useRef<Group>(null);
  const innerSpinGroupRef = useRef<Group>(null);
  
  // Track hovered state in parent to allow color override logic
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Refs for materials to update colors without re-rendering React components
  const materialRefs = useRef<(MeshPhysicalMaterial | null)[]>([]);
  // Refs for core materials (when segmented)
  const coreMaterialRefs = useRef<(MeshPhysicalMaterial | null)[]>([]);
  
  // Safe geometry calculations to prevent NaN errors
  const geometryData = useMemo(() => {
    const safeStart = isNaN(verticalStart) ? 90 : verticalStart;
    const safeEnd = isNaN(verticalEnd) ? -90 : verticalEnd;
    const safeWidth = isNaN(lamellaWidth) ? 40 : lamellaWidth;

    const thetaStartRad = MathUtils.degToRad(90 - safeStart);
    const thetaEndRad = MathUtils.degToRad(90 - safeEnd);
    const thetaLengthRad = Math.max(0.01, thetaEndRad - thetaStartRad);
    const phiLengthRad = Math.max(0.01, MathUtils.degToRad(safeWidth));

    // For segmented core: Fill the circle (360 / count)
    const corePhiLengthRad = (Math.PI * 2) / Math.max(1, lamellaCount);

    return { thetaStartRad, thetaLengthRad, phiLengthRad, corePhiLengthRad };
  }, [verticalStart, verticalEnd, lamellaWidth, lamellaCount]);

  // Core radius calculation (must not be negative)
  const coreRadius = Math.max(0.01, 1 - lamellaDepth);

  // Helper for color interpolation (LERP)
  const tempColorA = useRef(new Color());
  const tempColorB = useRef(new Color());

  useFrame((state) => {
    // 1. Physical Rotation (X, Y, Z support)
    if (innerSpinGroupRef.current) {
        // Multiplier 0.01 keeps the values in the UI (0-5) manageable
        innerSpinGroupRef.current.rotation.x += 0.01 * rotationSpeedX;
        innerSpinGroupRef.current.rotation.y += 0.01 * rotationSpeedY;
        innerSpinGroupRef.current.rotation.z += 0.01 * rotationSpeedZ;
    }

    // 2. Smooth Color Rotation (Lauflicht "wie ein Drehen")
    const time = state.clock.getElapsedTime();
    const colorOffset = time * colorSpeed * 2.0 * colorDirection;

    // Apply color logic to BOTH outer lamellas AND inner core segments (if active)
    const updateMaterials = (refs: (MeshPhysicalMaterial | null)[], isCore: boolean) => {
        // Select the correct data source
        const listToUse = isCore ? coreLamellaList : lamellaList;

        listToUse.forEach((_, i) => {
            const material = refs[i];
            if (material) {
                if (hoverEffect && hoveredIndex === i && !isCore) {
                    // Priority: Hover Effect (White) - only for outer currently
                    material.color.set('#ffffff');
                    material.emissive.set(listToUse[i].color);
                    material.emissiveIntensity = 0.5;
                    material.opacity = 1.0;
                } else {
                    // Smooth Color Interpolation
                    let virtualIndex = (i - colorOffset) % lamellaCount;
                    if (virtualIndex < 0) virtualIndex += lamellaCount;

                    const indexA = Math.floor(virtualIndex);
                    const indexB = (indexA + 1) % lamellaCount;
                    const t = virtualIndex - indexA;

                    // Ensure indices are within bounds of the listToUse (crucial if count changes rapidly)
                    if (!listToUse[indexA] || !listToUse[indexB]) return;

                    const dataA = listToUse[indexA];
                    const dataB = listToUse[indexB];
                    
                    tempColorA.current.set(dataA.color);
                    tempColorB.current.set(dataB.color);

                    material.color.copy(tempColorA.current).lerp(tempColorB.current, t);
                    // For core, use coreOpacity, otherwise use lamella opacity (interpolated)
                    material.opacity = isCore ? coreOpacity : MathUtils.lerp(dataA.opacity, dataB.opacity, t);
                    material.emissiveIntensity = 0;
                }
            }
        });
    };

    // Update Outer
    updateMaterials(materialRefs.current, false);
    
    // Update Inner (if segmented)
    if (coreVisible && coreType === 'segmented') {
        updateMaterials(coreMaterialRefs.current, true);
    }
  });

  // Resize refs array when count changes
  useEffect(() => {
    materialRefs.current = materialRefs.current.slice(0, lamellaCount);
    coreMaterialRefs.current = coreMaterialRefs.current.slice(0, lamellaCount);
  }, [lamellaCount]);

  return (
    <group 
        ref={outerGroupRef} 
        dispose={null} 
        scale={[scale, scale, scale]} 
        // Convert degrees to radians here for Three.js
        rotation={[MathUtils.degToRad(tiltX), MathUtils.degToRad(tiltY), MathUtils.degToRad(tiltZ)]}
        position={[positionX, positionY, positionZ]}
    >
        <group ref={innerSpinGroupRef}>
            
            {/* Core Type: Solid */}
            {coreVisible && coreType === 'solid' && (
              <mesh>
                  <sphereGeometry args={[coreRadius, 64, 64]} />
                  <meshPhysicalMaterial 
                      color={coreColor}
                      roughness={roughness} 
                      metalness={metalness}
                      clearcoat={clearcoat}
                      transparent={true}
                      opacity={coreOpacity}
                      wireframe={wireframe}
                  />
              </mesh>
            )}

            {/* Core Type: Segmented (Multi-Color) */}
            {coreVisible && coreType === 'segmented' && (
                <group>
                    {coreLamellaList.map((data, i) => (
                        <Lamella 
                            key={`core-${i}`}
                            index={i}
                            total={lamellaCount}
                            color={data.color}
                            opacity={coreOpacity} // Use core opacity setting
                            roughness={roughness}
                            metalness={metalness}
                            clearcoat={clearcoat}
                            transmission={transmission}
                            thickness={thickness}
                            iridescence={iridescence}
                            wireframe={wireframe}
                            
                            // Core geometry specifics: Full sphere segments, no gap
                            phiLength={geometryData.corePhiLengthRad}
                            thetaStart={0} // Full vertical
                            thetaLength={Math.PI} // Full vertical
                            
                            outerRadius={coreRadius}
                            innerRadius={0} // Solid center
                            
                            baseExpansion={0} // Core stays put
                            autoAnimate={false} // Core geometry doesn't breathe
                            animationType="breath"
                            hoverEffect={false}
                            setHoveredIndex={() => {}} // No hover interaction for core
                            onMaterialReady={(mat) => coreMaterialRefs.current[i] = mat}
                        />
                    ))}
                </group>
            )}

            {/* Outer Lamellas */}
            {lamellaList.map((data, i) => {
                return (
                    <Lamella 
                        key={i} 
                        index={i} 
                        total={lamellaCount} 
                        // Initial props (updates handled via ref in useFrame for perf)
                        color={data.color}
                        opacity={data.opacity}
                        roughness={roughness}
                        metalness={metalness}
                        clearcoat={clearcoat}
                        transmission={transmission}
                        thickness={thickness}
                        iridescence={iridescence}
                        wireframe={wireframe}
                        
                        phiLength={geometryData.phiLengthRad}
                        thetaStart={geometryData.thetaStartRad}
                        thetaLength={geometryData.thetaLengthRad}
                        
                        outerRadius={segmentOuterRadius}
                        innerRadius={segmentInnerRadius}
                        
                        baseExpansion={expansion}
                        autoAnimate={autoAnimate}
                        animationType={animationType}
                        hoverEffect={hoverEffect}
                        setHoveredIndex={setHoveredIndex}
                        onMaterialReady={(mat) => materialRefs.current[i] = mat}
                    />
                );
            })}
        </group>
    </group>
  );
};

interface LamellaProps {
    index: number;
    total: number;
    color: string;
    opacity: number;
    roughness: number;
    metalness: number;
    clearcoat: number;
    transmission: number;
    thickness: number;
    iridescence: number;
    wireframe: boolean;
    phiLength: number;
    thetaStart: number;
    thetaLength: number;
    outerRadius: number;
    innerRadius: number;
    baseExpansion: number;
    autoAnimate: boolean;
    animationType: 'breath' | 'wave';
    hoverEffect: boolean;
    setHoveredIndex: (i: number | null) => void;
    onMaterialReady: (mat: MeshPhysicalMaterial) => void;
}

const Lamella: React.FC<LamellaProps> = ({ 
    index, total, color, opacity, roughness, metalness, clearcoat, 
    transmission, thickness, iridescence, wireframe,
    phiLength, thetaStart, thetaLength, outerRadius, innerRadius,
    baseExpansion, autoAnimate, animationType, hoverEffect,
    setHoveredIndex, onMaterialReady
}) => {
    const movingGroupRef = useRef<Group>(null);
    const angle = (index / total) * Math.PI * 2;
    
    // Wedge bisector logic for expansion direction
    const midAngle = phiLength / 2;
    const dirX = Math.cos(midAngle);
    const dirZ = -Math.sin(midAngle);
    
    // Safety check: ensure inner is smaller than outer for geometry generation
    const rOuter = Math.max(0.01, Math.max(outerRadius, innerRadius));
    const rInner = Math.max(0, Math.min(outerRadius, innerRadius));
    
    useFrame((state) => {
        if (!movingGroupRef.current) return;
        const time = state.clock.getElapsedTime();
        let currentExpansion = baseExpansion;
        
        if (autoAnimate) {
            if (animationType === 'breath') {
                 const pulse = (Math.sin(time * 3) + 1) * 0.5; 
                 currentExpansion += pulse * 0.15;
            } else if (animationType === 'wave') {
                 // Offset phase by index for wave effect
                 const phase = (index / total) * Math.PI * 2;
                 const pulse = (Math.sin(time * 3 + phase) + 1) * 0.5;
                 currentExpansion += pulse * 0.15;
            }
        }
        
        movingGroupRef.current.position.set(
            currentExpansion * dirX, 
            0, 
            currentExpansion * dirZ
        );
    });

    // Create a single shared material instance for all parts of this lamella
    const sharedMaterial = useMemo(() => {
        return new MeshPhysicalMaterial({
            side: DoubleSide,
            reflectivity: 0.5
        });
    }, []);

    // Update material properties when props change
    useEffect(() => {
        sharedMaterial.setValues({
            color: new Color(color),
            opacity,
            roughness,
            metalness,
            clearcoat,
            transmission,
            thickness,
            iridescence,
            wireframe,
            transparent: true,
            depthWrite: opacity > 0.5 && transmission === 0
        });
        sharedMaterial.needsUpdate = true;
    }, [color, opacity, roughness, metalness, clearcoat, transmission, thickness, iridescence, wireframe, sharedMaterial]);

    // Register material with parent for animation loop
    useEffect(() => {
        onMaterialReady(sharedMaterial);
    }, [sharedMaterial, onMaterialReady]);

    // Cleanup on unmount
    useEffect(() => {
        return () => sharedMaterial.dispose();
    }, [sharedMaterial]);
    
    // Safety check for RingGeometry/CircleGeometry mapping
    const cLength = thetaLength;
    const cStart = (Math.PI / 2) - (thetaStart + thetaLength);

    return (
        <group rotation={[0, angle, 0]}>
            <group 
                ref={movingGroupRef}
                onPointerOver={(e) => { e.stopPropagation(); setHoveredIndex(index); }}
                onPointerOut={(e) => { setHoveredIndex(null); }}
            >
                {/* Main Outer Shell */}
                <mesh castShadow receiveShadow material={sharedMaterial}> 
                    <sphereGeometry args={[rOuter, 64, 64, 0, phiLength, thetaStart, thetaLength]} />
                </mesh>

                {/* Optional Inner Shell (only if inner radius > 0) */}
                {rInner > 0.01 && (
                    <mesh castShadow receiveShadow material={sharedMaterial}>
                        <sphereGeometry args={[rInner, 64, 64, 0, phiLength, thetaStart, thetaLength]} />
                    </mesh>
                )}

                {/* Side Wall 1 */}
                <mesh rotation={[0, 0, 0]} material={sharedMaterial}>
                     <ringGeometry args={[rInner, rOuter, 64, 1, cStart, cLength]} />
                </mesh>

                {/* Side Wall 2 */}
                <group rotation={[0, phiLength, 0]}>
                    <mesh material={sharedMaterial}>
                        <ringGeometry args={[rInner, rOuter, 64, 1, cStart, cLength]} />
                    </mesh>
                </group>
            </group>
        </group>
    );
};

export default Ball3D;