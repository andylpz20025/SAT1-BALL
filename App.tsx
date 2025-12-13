
import React, { useState, useEffect } from 'react';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import { BALL_COLORS, DEFAULTS } from './constants';
import { LamellaData } from './types';

const App: React.FC = () => {
  // Animation & Transform
  const [rotationSpeedX, setRotationSpeedX] = useState<number>(DEFAULTS.rotationSpeedX);
  const [rotationSpeedY, setRotationSpeedY] = useState<number>(DEFAULTS.rotationSpeedY);
  const [rotationSpeedZ, setRotationSpeedZ] = useState<number>(DEFAULTS.rotationSpeedZ);

  const [expansion, setExpansion] = useState<number>(DEFAULTS.expansion);
  const [autoAnimate, setAutoAnimate] = useState<boolean>(DEFAULTS.autoAnimate);
  const [animationType, setAnimationType] = useState<'breath' | 'wave'>(DEFAULTS.animationType);
  const [hoverEffect, setHoverEffect] = useState<boolean>(DEFAULTS.hoverEffect);
  
  const [scale, setScale] = useState<number>(DEFAULTS.scale);
  const [positionX, setPositionX] = useState<number>(DEFAULTS.positionX);
  const [positionY, setPositionY] = useState<number>(DEFAULTS.positionY);
  const [positionZ, setPositionZ] = useState<number>(DEFAULTS.positionZ);
  const [tiltX, setTiltX] = useState<number>(DEFAULTS.tiltX);
  const [tiltY, setTiltY] = useState<number>(DEFAULTS.tiltY);
  const [tiltZ, setTiltZ] = useState<number>(DEFAULTS.tiltZ);
  const [backgroundColor, setBackgroundColor] = useState<string>(DEFAULTS.backgroundColor);

  // Color Animation
  const [colorSpeed, setColorSpeed] = useState<number>(DEFAULTS.colorSpeed);
  const [colorDirection, setColorDirection] = useState<number>(DEFAULTS.colorDirection);

  // Geometry Configuration
  const [lamellaWidth, setLamellaWidth] = useState<number>(DEFAULTS.lamellaWidth);
  const [verticalStart, setVerticalStart] = useState<number>(DEFAULTS.verticalStart);
  const [verticalEnd, setVerticalEnd] = useState<number>(DEFAULTS.verticalEnd);
  const [lamellaCount, setLamellaCount] = useState<number>(DEFAULTS.lamellaCount);
  const [lamellaDepth, setLamellaDepth] = useState<number>(DEFAULTS.lamellaDepth);

  // New: Segment Radius Control
  const [segmentOuterRadius, setSegmentOuterRadius] = useState<number>(DEFAULTS.segmentOuterRadius);
  const [segmentInnerRadius, setSegmentInnerRadius] = useState<number>(DEFAULTS.segmentInnerRadius);
  
  // Material Configuration
  const [roughness, setRoughness] = useState<number>(DEFAULTS.roughness);
  const [metalness, setMetalness] = useState<number>(DEFAULTS.metalness);
  const [clearcoat, setClearcoat] = useState<number>(DEFAULTS.clearcoat);
  const [transmission, setTransmission] = useState<number>(DEFAULTS.transmission);
  const [thickness, setThickness] = useState<number>(DEFAULTS.thickness);
  const [iridescence, setIridescence] = useState<number>(DEFAULTS.iridescence);
  const [wireframe, setWireframe] = useState<boolean>(DEFAULTS.wireframe);

  // Post Processing & Env
  const [enableBloom, setEnableBloom] = useState<boolean>(DEFAULTS.enableBloom);
  const [bloomIntensity, setBloomIntensity] = useState<number>(DEFAULTS.bloomIntensity);
  const [enableNoise, setEnableNoise] = useState<boolean>(DEFAULTS.enableNoise);
  const [noiseOpacity, setNoiseOpacity] = useState<number>(DEFAULTS.noiseOpacity);
  const [enableGlitch, setEnableGlitch] = useState<boolean>(DEFAULTS.enableGlitch);
  const [showEnvBackground, setShowEnvBackground] = useState<boolean>(DEFAULTS.showEnvBackground);
  
  // Light Scenarios
  const [lightPreset, setLightPreset] = useState<'studio' | 'cyberpunk' | 'sunset'>(DEFAULTS.lightPreset);

  // Colors & Materials
  const [coreColor, setCoreColor] = useState<string>(DEFAULTS.coreColor);
  const [coreOpacity, setCoreOpacity] = useState<number>(DEFAULTS.coreOpacity);
  const [coreVisible, setCoreVisible] = useState<boolean>(DEFAULTS.coreVisible);
  const [coreType, setCoreType] = useState<'solid' | 'segmented'>(DEFAULTS.coreType);
  
  // Initialize colors excluding white
  const defaultPalette = BALL_COLORS.filter(c => c !== '#ffffff');
  
  // State for detailed lamella data (color + opacity) - OUTER
  const [lamellaList, setLamellaList] = useState<LamellaData[]>(
    defaultPalette.map(c => ({ color: c, opacity: 1.0 }))
  );

  // State for detailed lamella data - CORE (Independent)
  const [coreLamellaList, setCoreLamellaList] = useState<LamellaData[]>(
    defaultPalette.map(c => ({ color: c, opacity: 1.0 }))
  );

  // Handle resizing color arrays when count changes
  useEffect(() => {
    // 1. Resize Outer List
    setLamellaList(prev => {
      if (prev.length === lamellaCount) return prev;
      const newList = [...prev];
      if (lamellaCount > prev.length) {
        for (let i = prev.length; i < lamellaCount; i++) {
          const color = defaultPalette[i % defaultPalette.length];
          newList.push({ color, opacity: 1.0 });
        }
      } else {
        newList.length = lamellaCount;
      }
      return newList;
    });

    // 2. Resize Inner Core List (Independent colors, same count logic)
    setCoreLamellaList(prev => {
      if (prev.length === lamellaCount) return prev;
      const newList = [...prev];
      if (lamellaCount > prev.length) {
        for (let i = prev.length; i < lamellaCount; i++) {
          const color = defaultPalette[i % defaultPalette.length];
          newList.push({ color, opacity: 1.0 });
        }
      } else {
        newList.length = lamellaCount;
      }
      return newList;
    });
  }, [lamellaCount]);

  const updateLamella = (index: number, data: Partial<LamellaData>) => {
    const newList = [...lamellaList];
    newList[index] = { ...newList[index], ...data };
    setLamellaList(newList);
  };

  const updateCoreLamella = (index: number, data: Partial<LamellaData>) => {
    const newList = [...coreLamellaList];
    newList[index] = { ...newList[index], ...data };
    setCoreLamellaList(newList);
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden relative selection:bg-cyan-500/30"
      style={{ backgroundColor: backgroundColor }}
    >
      
      <div className="absolute inset-0 z-0">
        <Scene 
          rotationSpeedX={rotationSpeedX}
          rotationSpeedY={rotationSpeedY}
          rotationSpeedZ={rotationSpeedZ}
          
          expansion={expansion} 
          autoAnimate={autoAnimate}
          animationType={animationType}
          hoverEffect={hoverEffect}
          scale={scale}
          positionX={positionX}
          positionY={positionY}
          positionZ={positionZ}
          tiltX={tiltX}
          tiltY={tiltY}
          tiltZ={tiltZ}
          
          colorSpeed={colorSpeed}
          colorDirection={colorDirection}

          lamellaWidth={lamellaWidth}
          verticalStart={verticalStart}
          verticalEnd={verticalEnd}
          lamellaCount={lamellaCount}
          lamellaList={lamellaList}
          // New prop
          coreLamellaList={coreLamellaList}
          lamellaDepth={lamellaDepth}
          segmentOuterRadius={segmentOuterRadius}
          segmentInnerRadius={segmentInnerRadius}

          roughness={roughness}
          metalness={metalness}
          clearcoat={clearcoat}
          transmission={transmission}
          thickness={thickness}
          iridescence={iridescence}
          wireframe={wireframe}
          coreColor={coreColor}
          coreOpacity={coreOpacity}
          coreVisible={coreVisible}
          coreType={coreType}
          
          enableBloom={enableBloom}
          bloomIntensity={bloomIntensity}
          enableNoise={enableNoise}
          noiseOpacity={noiseOpacity}
          enableGlitch={enableGlitch}
          showEnvBackground={showEnvBackground}
          lightPreset={lightPreset}
        />
      </div>

      <div className="relative z-10 h-full">
        <UIOverlay
          rotationSpeedX={rotationSpeedX}
          setRotationSpeedX={setRotationSpeedX}
          rotationSpeedY={rotationSpeedY}
          setRotationSpeedY={setRotationSpeedY}
          rotationSpeedZ={rotationSpeedZ}
          setRotationSpeedZ={setRotationSpeedZ}
          
          expansion={expansion}
          setExpansion={setExpansion}
          autoAnimate={autoAnimate}
          setAutoAnimate={setAutoAnimate}
          animationType={animationType}
          setAnimationType={setAnimationType}
          hoverEffect={hoverEffect}
          setHoverEffect={setHoverEffect}
          scale={scale}
          setScale={setScale}
          positionX={positionX}
          setPositionX={setPositionX}
          positionY={positionY}
          setPositionY={setPositionY}
          positionZ={positionZ}
          setPositionZ={setPositionZ}
          tiltX={tiltX}
          setTiltX={setTiltX}
          tiltY={tiltY}
          setTiltY={setTiltY}
          tiltZ={tiltZ}
          setTiltZ={setTiltZ}
          
          colorSpeed={colorSpeed}
          setColorSpeed={setColorSpeed}
          colorDirection={colorDirection}
          setColorDirection={setColorDirection}
          
          lamellaWidth={lamellaWidth}
          setLamellaWidth={setLamellaWidth}
          verticalStart={verticalStart}
          setVerticalStart={setVerticalStart}
          verticalEnd={verticalEnd}
          setVerticalEnd={setVerticalEnd}
          lamellaCount={lamellaCount}
          setLamellaCount={setLamellaCount}
          lamellaDepth={lamellaDepth}
          setLamellaDepth={setLamellaDepth}

          segmentOuterRadius={segmentOuterRadius}
          setSegmentOuterRadius={setSegmentOuterRadius}
          segmentInnerRadius={segmentInnerRadius}
          setSegmentInnerRadius={setSegmentInnerRadius}
          
          lamellaList={lamellaList}
          updateLamella={updateLamella}
          // New Props
          coreLamellaList={coreLamellaList}
          updateCoreLamella={updateCoreLamella}
          
          roughness={roughness}
          setRoughness={setRoughness}
          metalness={metalness}
          setMetalness={setMetalness}
          clearcoat={clearcoat}
          setClearcoat={setClearcoat}
          transmission={transmission}
          setTransmission={setTransmission}
          thickness={thickness}
          setThickness={setThickness}
          iridescence={iridescence}
          setIridescence={setIridescence}
          wireframe={wireframe}
          setWireframe={setWireframe}
          
          coreColor={coreColor}
          setCoreColor={setCoreColor}
          coreOpacity={coreOpacity}
          setCoreOpacity={setCoreOpacity}
          coreVisible={coreVisible}
          setCoreVisible={setCoreVisible}
          coreType={coreType}
          setCoreType={setCoreType}
          
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          
          enableBloom={enableBloom}
          setEnableBloom={setEnableBloom}
          bloomIntensity={bloomIntensity}
          setBloomIntensity={setBloomIntensity}
          enableNoise={enableNoise}
          setEnableNoise={setEnableNoise}
          noiseOpacity={noiseOpacity}
          setNoiseOpacity={setNoiseOpacity}
          enableGlitch={enableGlitch}
          setEnableGlitch={setEnableGlitch}
          showEnvBackground={showEnvBackground}
          setShowEnvBackground={setShowEnvBackground}

          lightPreset={lightPreset}
          setLightPreset={setLightPreset}
        />
      </div>
    </div>
  );
};

export default App;