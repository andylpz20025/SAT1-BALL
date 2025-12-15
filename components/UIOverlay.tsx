
import React from 'react';
import { Play, Pause, Settings2, RotateCw, RotateCcw, Monitor, Scissors, Layers, Palette, Rotate3D, Sparkles, Box, Wand2, Activity, Fingerprint, Sun, Zap, Camera, TimerReset, Undo2, Move3D, Lock, Unlock } from 'lucide-react';
import { ControlPanelProps } from '../types';
import { DEFAULTS } from '../constants';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      span: any;
      h1: any;
      h2: any;
      h3: any;
      p: any;
      button: any;
      input: any;
      label: any;
    }
  }
}

const UIOverlay: React.FC<ControlPanelProps> = ({
  rotationSpeedX, setRotationSpeedX,
  rotationSpeedY, setRotationSpeedY,
  rotationSpeedZ, setRotationSpeedZ,

  expansion, setExpansion,
  autoAnimate, setAutoAnimate,
  animationType, setAnimationType,
  hoverEffect, setHoverEffect,
  scale, setScale,
  positionX, setPositionX,
  positionY, setPositionY,
  positionZ, setPositionZ,
  tiltX, setTiltX,
  tiltY, setTiltY,
  tiltZ, setTiltZ,
  
  lockTiltX, setLockTiltX,
  lockTiltY, setLockTiltY,
  lockTiltZ, setLockTiltZ,
  
  colorSpeed, setColorSpeed,
  colorDirection, setColorDirection,
  
  lamellaWidth, setLamellaWidth,
  verticalStart, setVerticalStart,
  verticalEnd, setVerticalEnd,
  lamellaCount, setLamellaCount,
  lamellaDepth, setLamellaDepth,
  
  segmentOuterRadius, setSegmentOuterRadius,
  segmentInnerRadius, setSegmentInnerRadius,
  
  lamellaList, updateLamella,
  coreLamellaList, updateCoreLamella,
  
  roughness, setRoughness,
  metalness, setMetalness,
  clearcoat, setClearcoat,
  transmission, setTransmission,
  thickness, setThickness,
  iridescence, setIridescence,
  wireframe, setWireframe,
  
  coreColor, setCoreColor,
  coreOpacity, setCoreOpacity,
  coreVisible, setCoreVisible,
  coreType, setCoreType,
  
  backgroundColor, setBackgroundColor,
  
  enableBloom, setEnableBloom,
  bloomIntensity, setBloomIntensity,
  enableNoise, setEnableNoise,
  noiseOpacity, setNoiseOpacity,
  enableGlitch, setEnableGlitch,
  showEnvBackground, setShowEnvBackground,

  lightPreset, setLightPreset
}) => {
    
  // Reset Handlers
  const resetGeneral = () => {
      setRotationSpeedX(DEFAULTS.rotationSpeedX);
      setRotationSpeedY(DEFAULTS.rotationSpeedY);
      setRotationSpeedZ(DEFAULTS.rotationSpeedZ);
      setExpansion(DEFAULTS.expansion);
      setAutoAnimate(DEFAULTS.autoAnimate);
      setColorSpeed(DEFAULTS.colorSpeed);
      setColorDirection(DEFAULTS.colorDirection);
  };
  
  const resetAnimation = () => {
      setAnimationType(DEFAULTS.animationType);
      setHoverEffect(DEFAULTS.hoverEffect);
  };

  const resetEnv = () => {
      setLightPreset(DEFAULTS.lightPreset);
      setBackgroundColor(DEFAULTS.backgroundColor);
      setShowEnvBackground(DEFAULTS.showEnvBackground);
  };

  const resetEffects = () => {
      setEnableBloom(DEFAULTS.enableBloom);
      setBloomIntensity(DEFAULTS.bloomIntensity);
      setEnableNoise(DEFAULTS.enableNoise);
      setNoiseOpacity(DEFAULTS.noiseOpacity);
      setEnableGlitch(DEFAULTS.enableGlitch);
  };

  const resetGeometry = () => {
      setPositionX(DEFAULTS.positionX);
      setPositionY(DEFAULTS.positionY);
      setPositionZ(DEFAULTS.positionZ);
      setScale(DEFAULTS.scale);
      setLamellaDepth(DEFAULTS.lamellaDepth);
      setLamellaCount(DEFAULTS.lamellaCount);
      setLamellaWidth(DEFAULTS.lamellaWidth);
      setVerticalStart(DEFAULTS.verticalStart);
      setVerticalEnd(DEFAULTS.verticalEnd);
      
      setSegmentOuterRadius(DEFAULTS.segmentOuterRadius);
      setSegmentInnerRadius(DEFAULTS.segmentInnerRadius);
  };

  const resetMaterial = () => {
      setWireframe(DEFAULTS.wireframe);
      setRoughness(DEFAULTS.roughness);
      setMetalness(DEFAULTS.metalness);
      setClearcoat(DEFAULTS.clearcoat);
      setTransmission(DEFAULTS.transmission);
      setIridescence(DEFAULTS.iridescence);
      setThickness(DEFAULTS.thickness);
  };

  const resetCore = () => {
      setCoreColor(DEFAULTS.coreColor);
      setCoreOpacity(DEFAULTS.coreOpacity);
      setCoreVisible(DEFAULTS.coreVisible);
      setCoreType(DEFAULTS.coreType);
  };
  
  const resetOrientation = () => {
      if (!lockTiltX) setTiltX(DEFAULTS.tiltX);
      if (!lockTiltY) setTiltY(DEFAULTS.tiltY);
      if (!lockTiltZ) setTiltZ(DEFAULTS.tiltZ);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-end pb-8 md:justify-center md:pb-0 md:pr-8 md:items-end">
      
      <div className="absolute top-6 left-6 pointer-events-auto">
         <h1 className="text-white text-3xl font-bold tracking-tight drop-shadow-lg">
           Sat.1 Style <span className="text-cyan-400">Sphere</span>
         </h1>
      </div>

      {/* Main Control Panel - Widened to md:w-[450px] */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-5 rounded-2xl shadow-2xl w-[95%] mx-auto md:w-[450px] md:mx-0 pointer-events-auto max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600">
        
        <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
          <Settings2 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-semibold">Konfiguration</h2>
        </div>

        {/* Section: General / Rotation Animation */}
        <div className="space-y-4 mb-6 relative">
            <button onClick={resetGeneral} className="absolute -top-1 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
            <div className="bg-slate-800/30 p-2 rounded border border-slate-700/30">
                <div className="flex items-center gap-2 mb-2">
                    <Move3D className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-200">ANIMATION (Drehung)</span>
                </div>
                
                {/* Y Axis (Heading) - Main */}
                <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>H-Winkel (Heading / Y)</span>
                        <span className="font-mono">{rotationSpeedY.toFixed(1)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="range" min="-5" max="5" step="0.1" value={rotationSpeedY} onChange={(e) => setRotationSpeedY(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                </div>

                {/* X Axis (Pitch) */}
                <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>P-Winkel (Pitch / X)</span>
                        <span className="font-mono">{rotationSpeedX.toFixed(1)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                         <input type="range" min="-5" max="5" step="0.1" value={rotationSpeedX} onChange={(e) => setRotationSpeedX(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                </div>

                {/* Z Axis (Bank) */}
                <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>B-Winkel (Bank / Z)</span>
                        <span className="font-mono">{rotationSpeedZ.toFixed(1)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                         <input type="range" min="-5" max="5" step="0.1" value={rotationSpeedZ} onChange={(e) => setRotationSpeedZ(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                </div>
            </div>

             {/* New Section: Color Animation */}
             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 mt-4">
                <div className="flex items-center gap-2 mb-2">
                    <TimerReset className="w-3 h-3 text-cyan-400" />
                    <span className="text-xs font-bold text-slate-200">FARB-ANIMATION (Lauflicht)</span>
                </div>
                <div className="flex gap-2 items-center">
                     <button 
                        onClick={() => setColorDirection(colorDirection * -1)}
                        className="p-1.5 bg-slate-700 rounded hover:bg-slate-600 transition-colors"
                        title="Farb-Richtung"
                     >
                        {colorDirection > 0 ? <RotateCw className="w-3 h-3 text-cyan-400"/> : <RotateCcw className="w-3 h-3 text-pink-400"/>}
                     </button>
                     <div className="flex-1">
                        <input 
                            type="range" 
                            min="0" 
                            max="5" 
                            step="0.1" 
                            value={colorSpeed} 
                            onChange={(e) => setColorSpeed(parseFloat(e.target.value))} 
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                        />
                     </div>
                     <span className="text-[10px] text-slate-400 font-mono w-6 text-right">{colorSpeed.toFixed(1)}</span>
                </div>
                <p className="text-[9px] text-slate-500 mt-1 italic">
                    {colorSpeed === 0 ? "Farben sind statisch." : "Farben wandern von Lamelle zu Lamelle."}
                </p>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>ATMUNG / PULSIEREN (Stärke)</span>
                <span className="text-cyan-400">{Math.round(expansion * 100)}%</span>
              </div>
              <div className="flex gap-2 items-center">
                  <input type="range" min="0" max="0.5" step="0.01" value={expansion} onChange={(e) => setExpansion(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                  <input type="number" step="0.01" value={expansion} onChange={(e) => setExpansion(parseFloat(e.target.value))} className="w-16 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
              </div>
            </div>
            
            <button
                onClick={() => setAutoAnimate(!autoAnimate)}
                className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
                    autoAnimate ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
            >
                {autoAnimate ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {autoAnimate ? 'Pause: Auto-Puls' : 'Start: Auto-Puls'}
            </button>
        </div>

        {/* Section: Animation & Interaction (New) */}
        <div className="mb-6 border-t border-slate-700 pt-4 relative">
             <button onClick={resetAnimation} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Animation & Interaktion</h3>
            </div>
            <div className="flex gap-2 mb-3">
                 <button 
                    onClick={() => setAnimationType('breath')}
                    className={`flex-1 py-1.5 text-xs rounded border ${animationType === 'breath' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                 >
                    Atmen
                 </button>
                 <button 
                    onClick={() => setAnimationType('wave')}
                    className={`flex-1 py-1.5 text-xs rounded border ${animationType === 'wave' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                 >
                    Welle
                 </button>
            </div>
            <div className="flex items-center justify-between">
                <label className="text-[10px] text-slate-400 flex items-center gap-2">
                    <Fingerprint className="w-3 h-3"/> Interaktives Hover (Weiß)
                </label>
                <input 
                    type="checkbox" 
                    checked={hoverEffect} 
                    onChange={(e) => setHoverEffect(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-cyan-500 cursor-pointer"
                />
            </div>
        </div>

        {/* Section: Environment */}
        <div className="mb-6 border-t border-slate-700 pt-4 relative">
            <button onClick={resetEnv} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 mb-3">
                <Monitor className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Umgebung & Licht</h3>
            </div>
            
            <div className="flex gap-1 mb-3 bg-slate-800 p-1 rounded-lg">
                <button 
                    onClick={() => setLightPreset('studio')}
                    className={`flex-1 py-1 text-[10px] flex items-center justify-center gap-1 rounded ${lightPreset === 'studio' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <Camera className="w-3 h-3" /> Studio
                </button>
                <button 
                     onClick={() => setLightPreset('cyberpunk')}
                    className={`flex-1 py-1 text-[10px] flex items-center justify-center gap-1 rounded ${lightPreset === 'cyberpunk' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <Zap className="w-3 h-3" /> Cyber
                </button>
                 <button 
                     onClick={() => setLightPreset('sunset')}
                    className={`flex-1 py-1 text-[10px] flex items-center justify-center gap-1 rounded ${lightPreset === 'sunset' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    <Sun className="w-3 h-3" /> Sunset
                </button>
            </div>

            <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] text-slate-400">Hintergrundfarbe</label>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{backgroundColor}</span>
                    <input 
                        type="color" 
                        value={backgroundColor} 
                        onChange={(e) => setBackgroundColor(e.target.value)} 
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-none p-0" 
                    />
                </div>
            </div>
             <div className="flex items-center justify-between">
                <label className="text-[10px] text-slate-400">Zeige HDRI Hintergrund</label>
                <input 
                    type="checkbox" 
                    checked={showEnvBackground} 
                    onChange={(e) => setShowEnvBackground(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 accent-cyan-500 cursor-pointer"
                />
            </div>
        </div>

        {/* Section: Effects (Post Processing - New) */}
        <div className="mb-6 border-t border-slate-700 pt-4 relative">
             <button onClick={resetEffects} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Effekte</h3>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-400">Aktiviere Bloom (Leuchten)</label>
                    <input type="checkbox" checked={enableBloom} onChange={(e) => setEnableBloom(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" />
                </div>
                {enableBloom && (
                    <div className="flex gap-2 items-center pl-2 border-l border-slate-700 ml-1">
                        <label className="text-[9px] text-slate-500 w-12">Intensität</label>
                        <input type="range" min="0" max="3" step="0.1" value={bloomIntensity} onChange={(e) => setBloomIntensity(parseFloat(e.target.value))} className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                )}
                
                <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-400">Aktiviere Film Grain</label>
                    <input type="checkbox" checked={enableNoise} onChange={(e) => setEnableNoise(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" />
                </div>
                {enableNoise && (
                    <div className="flex gap-2 items-center pl-2 border-l border-slate-700 ml-1">
                        <label className="text-[9px] text-slate-500 w-12">Deckkraft</label>
                         <input type="range" min="0" max="0.5" step="0.01" value={noiseOpacity} onChange={(e) => setNoiseOpacity(parseFloat(e.target.value))} className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                )}

                 <div className="flex items-center justify-between">
                    <label className="text-[10px] text-slate-400">Chromatische Aberration</label>
                    <input type="checkbox" checked={enableGlitch} onChange={(e) => setEnableGlitch(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" />
                </div>
            </div>
        </div>

        {/* Section: Geometry */}
        <div className="mb-6 border-t border-slate-700 pt-4 relative">
             <button onClick={resetGeometry} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Geometrie & Position</h3>
            </div>

            <div className="space-y-4">
                 {/* Position XYZ */}
                 <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
                    <label className="text-[10px] text-slate-400 font-bold mb-2 block">POSITION (X / Y / Z)</label>
                    <div className="space-y-2">
                        {/* X */}
                        <div className="flex gap-2 items-center">
                            <span className="text-[9px] text-slate-500 w-3">X</span>
                            <input type="range" min="-5" max="5" step="0.1" value={positionX} onChange={(e) => setPositionX(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            <span className="text-[9px] text-slate-400 w-6 text-right">{positionX.toFixed(1)}</span>
                        </div>
                         {/* Y */}
                         <div className="flex gap-2 items-center">
                            <span className="text-[9px] text-slate-500 w-3">Y</span>
                            <input type="range" min="-5" max="5" step="0.1" value={positionY} onChange={(e) => setPositionY(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            <span className="text-[9px] text-slate-400 w-6 text-right">{positionY.toFixed(1)}</span>
                        </div>
                        {/* Z */}
                         <div className="flex gap-2 items-center">
                            <span className="text-[9px] text-slate-500 w-3">Z</span>
                            <input type="range" min="-5" max="3" step="0.1" value={positionZ} onChange={(e) => setPositionZ(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            <span className="text-[9px] text-slate-400 w-6 text-right">{positionZ.toFixed(1)}</span>
                        </div>
                    </div>
                 </div>

                <div className="flex gap-4">
                    <div className="w-full">
                         <div className="flex justify-between items-center mb-1">
                             <label className="text-[10px] text-slate-400 block">Radius / Skalierung</label>
                             <input type="number" step="0.05" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                         </div>
                         <input type="range" min="0.1" max="2" step="0.05" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                </div>

                {/* Segment Radius Controls - NEW */}
                <div className="bg-slate-800/30 p-2 rounded border border-slate-700/30">
                    <label className="text-[10px] text-slate-400 font-bold mb-2 block">SEGMENT RADIEN</label>
                    <div className="space-y-2">
                        {/* Outer */}
                        <div className="flex gap-2 items-center">
                            <span className="text-[9px] text-slate-500 w-8">Außen</span>
                            <input type="range" min="0.1" max="2" step="0.01" value={segmentOuterRadius} onChange={(e) => setSegmentOuterRadius(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            <input type="number" step="0.01" value={segmentOuterRadius} onChange={(e) => setSegmentOuterRadius(parseFloat(e.target.value))} className="w-12 bg-slate-800 text-[9px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                        </div>
                        {/* Inner */}
                        <div className="flex gap-2 items-center">
                            <span className="text-[9px] text-slate-500 w-8">Innen</span>
                            <input type="range" min="0" max="2" step="0.01" value={segmentInnerRadius} onChange={(e) => setSegmentInnerRadius(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                            <input type="number" step="0.01" value={segmentInnerRadius} onChange={(e) => setSegmentInnerRadius(parseFloat(e.target.value))} className="w-12 bg-slate-800 text-[9px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                        </div>
                    </div>
                </div>

                {/* Lamella Depth (Core Control) */}
                <div>
                   <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>LAMELLEN TIEFE (Kern)</span>
                   </div>
                   <div className="flex gap-2 items-center">
                        <input type="range" min="0" max="0.5" step="0.01" value={lamellaDepth} onChange={(e) => setLamellaDepth(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="0.01" value={lamellaDepth} onChange={(e) => setLamellaDepth(parseFloat(e.target.value))} className="w-16 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                   </div>
                </div>

                <div>
                   <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Anzahl: {lamellaCount}</label>
                   <div className="flex gap-2 items-center">
                        <input type="range" min="1" max="50" step="1" value={lamellaCount} onChange={(e) => setLamellaCount(parseInt(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="1" value={lamellaCount} onChange={(e) => setLamellaCount(parseInt(e.target.value))} className="w-14 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                   </div>
                </div>
                
                <div>
                   <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Breite (Grad): {lamellaWidth}°</label>
                   <div className="flex gap-2 items-center">
                        <input type="range" min="1" max="180" step="1" value={lamellaWidth} onChange={(e) => setLamellaWidth(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="1" value={lamellaWidth} onChange={(e) => setLamellaWidth(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                   </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-[10px] text-slate-400 block">Start (Grad)</label>
                            <input type="number" step="1" value={verticalStart} onChange={(e) => setVerticalStart(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                        </div>
                        <input type="range" min="-90" max="90" step="1" value={verticalStart} onChange={(e) => setVerticalStart(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                    <div className="w-1/2">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-[10px] text-slate-400 block">Ende (Grad)</label>
                            <input type="number" step="1" value={verticalEnd} onChange={(e) => setVerticalEnd(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                        </div>
                        <input type="range" min="-90" max="90" step="1" value={verticalEnd} onChange={(e) => setVerticalEnd(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Section: Surface Material (Extended) */}
        <div className="mb-6 border-t border-slate-700 pt-4 relative">
             <button onClick={resetMaterial} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Oberfläche & Material</h3>
            </div>
            
             <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] text-slate-400">Drahtgitter-Modus</label>
                <input type="checkbox" checked={wireframe} onChange={(e) => setWireframe(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" />
            </div>

            {/* Feature 1: Matt Button */}
            <button 
                onClick={() => { setRoughness(1); setMetalness(0); setClearcoat(0); setTransmission(0); setIridescence(0); }}
                className="w-full py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded mb-3 border border-slate-600 transition-colors"
            >
                Auf "Matt / Papier" zurücksetzen
            </button>

            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>RAUHEIT (Glanzlosigkeit)</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="range" min="0" max="1" step="0.05" value={roughness} onChange={(e) => setRoughness(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="0.05" value={roughness} onChange={(e) => setRoughness(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>METALL (Chrom)</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="range" min="0" max="1" step="0.05" value={metalness} onChange={(e) => setMetalness(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="0.05" value={metalness} onChange={(e) => setMetalness(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>TRANSMISSION (Glas)</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="range" min="0" max="1" step="0.05" value={transmission} onChange={(e) => setTransmission(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="0.05" value={transmission} onChange={(e) => setTransmission(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>IRIDESZENZ (Regenbogen)</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="range" min="0" max="1" step="0.05" value={iridescence} onChange={(e) => setIridescence(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                        <input type="number" step="0.05" value={iridescence} onChange={(e) => setIridescence(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1 text-center font-mono" />
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Core */}
        <div className="mb-6 border-t border-slate-700 pt-4 relative">
             <button onClick={resetCore} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Kern-Kugel</h3>
            </div>
            
            <div className="flex items-center justify-between mb-3">
                 <label className="text-[10px] text-slate-400">Kern sichtbar</label>
                 <input type="checkbox" checked={coreVisible} onChange={(e) => setCoreVisible(e.target.checked)} className="w-4 h-4 rounded accent-cyan-500 cursor-pointer" />
            </div>

            <div className={`transition-opacity duration-300 ${coreVisible ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                
                {/* Core Type Switch */}
                <div className="flex gap-2 mb-3">
                     <button 
                        onClick={() => setCoreType('solid')}
                        className={`flex-1 py-1.5 text-xs rounded border ${coreType === 'solid' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                     >
                        Solide (Single)
                     </button>
                     <button 
                        onClick={() => setCoreType('segmented')}
                        className={`flex-1 py-1.5 text-xs rounded border ${coreType === 'segmented' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-100' : 'bg-slate-800 border-slate-600 text-slate-400'}`}
                     >
                        Segmentiert (Multi)
                     </button>
                </div>
                
                {coreType === 'solid' ? (
                     <div className="flex items-center justify-between mb-2 gap-2">
                         <input type="color" value={coreColor} onChange={(e) => setCoreColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                         <input 
                            type="text" 
                            value={coreColor} 
                            onChange={(e) => setCoreColor(e.target.value)} 
                            className="w-20 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-1"
                         />
                         <div className="flex-1 ml-2 flex flex-col">
                            <label className="text-[10px] text-slate-400 block mb-1">Deckkraft</label>
                            <div className="flex gap-2 items-center">
                                <input type="range" min="0" max="1" step="0.05" value={coreOpacity} onChange={(e) => setCoreOpacity(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                                <input type="number" step="0.05" value={coreOpacity} onChange={(e) => setCoreOpacity(parseFloat(e.target.value))} className="w-12 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                            </div>
                         </div>
                    </div>
                ) : (
                    <div className="p-2 bg-slate-800/30 rounded border border-slate-700/30">
                        <p className="text-[10px] text-slate-400 italic mb-2">
                            Der segmentierte Kern nutzt separate Farben, synchronisiert aber die Animation.
                        </p>
                        
                        <div className="flex flex-col mb-3">
                            <label className="text-[10px] text-slate-400 block mb-1">Deckkraft (Kern)</label>
                            <div className="flex gap-2 items-center">
                                <input type="range" min="0" max="1" step="0.05" value={coreOpacity} onChange={(e) => setCoreOpacity(parseFloat(e.target.value))} className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                                <input type="number" step="0.05" value={coreOpacity} onChange={(e) => setCoreOpacity(parseFloat(e.target.value))} className="w-12 bg-slate-800 text-xs text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                            </div>
                        </div>

                        {/* Core Colors List */}
                        <label className="text-[10px] text-slate-400 block mb-1 font-bold">Kern-Segment Farben</label>
                        <div className="max-h-40 overflow-y-auto pr-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
                             {coreLamellaList.map((item, idx) => (
                                <div key={idx} className="bg-slate-900/50 p-1.5 rounded flex items-center gap-2">
                                    <div className="w-4 text-[9px] text-slate-500 font-mono text-center">{idx+1}</div>
                                    <input 
                                        type="color" 
                                        value={item.color} 
                                        onChange={(e) => updateCoreLamella(idx, { color: e.target.value })}
                                        className="w-5 h-5 rounded cursor-pointer border-none p-0 bg-transparent flex-shrink-0"
                                    />
                                    <input 
                                        type="text" 
                                        value={item.color}
                                        onChange={(e) => updateCoreLamella(idx, { color: e.target.value })}
                                        className="w-14 bg-slate-800 text-[9px] text-white border border-slate-600 rounded px-1 py-0.5 font-mono uppercase"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Section: Segments */}
        <div className="mb-4 border-t border-slate-700 pt-4 relative">
             <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Lamellen</h3>
            </div>
            
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-slate-700">
                {lamellaList.map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-2 rounded border border-slate-700 flex items-center gap-2">
                        <div className="w-6 text-[10px] text-slate-500 font-mono text-center">{idx+1}</div>
                        
                        {/* Color Picker */}
                        <input 
                            type="color" 
                            value={item.color} 
                            onChange={(e) => updateLamella(idx, { color: e.target.value })}
                            className="w-6 h-6 rounded cursor-pointer border-none p-0 bg-transparent flex-shrink-0"
                        />
                        
                        {/* Hex Input */}
                        <input 
                            type="text" 
                            value={item.color}
                            onChange={(e) => updateLamella(idx, { color: e.target.value })}
                            className="w-16 bg-slate-900 text-[10px] text-white border border-slate-600 rounded px-1 py-1 font-mono uppercase"
                        />
                        
                        {/* Opacity Slider */}
                        <div className="flex-1 flex items-center gap-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={item.opacity} 
                                onChange={(e) => updateLamella(idx, { opacity: parseFloat(e.target.value) })} 
                                className="flex-1 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                            />
                            <input 
                                type="number" 
                                step="0.05" 
                                value={item.opacity} 
                                onChange={(e) => updateLamella(idx, { opacity: parseFloat(e.target.value) })} 
                                className="w-12 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Section: Orientation (Locked Feature Added) */}
        <div className="border-t border-slate-700 pt-4 relative">
             <button onClick={resetOrientation} className="absolute top-4 right-0 text-slate-500 hover:text-white transition-colors" title="Abschnitt zurücksetzen"><Undo2 className="w-4 h-4" /></button>
             <div className="flex items-center gap-2 mb-3">
                <Rotate3D className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Ausrichtung</h3>
            </div>
            <div className="flex gap-4">
                {/* X */}
                <div className={`w-1/3 transition-opacity ${lockTiltX ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 block flex items-center gap-1">
                           Neigung X 
                           <button onClick={() => setLockTiltX(!lockTiltX)} className="focus:outline-none text-slate-500 hover:text-cyan-400">
                             {lockTiltX ? <Lock size={10} /> : <Unlock size={10} />}
                           </button>
                        </label>
                        <input disabled={lockTiltX} type="number" step="1" value={tiltX} onChange={(e) => setTiltX(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                    </div>
                    <input disabled={lockTiltX} type="range" min="-360" max="360" step="1" value={tiltX} onChange={(e) => setTiltX(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:cursor-not-allowed" />
                </div>
                {/* Y */}
                <div className={`w-1/3 transition-opacity ${lockTiltY ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 block flex items-center gap-1">
                           Neigung Y
                           <button onClick={() => setLockTiltY(!lockTiltY)} className="focus:outline-none text-slate-500 hover:text-cyan-400">
                             {lockTiltY ? <Lock size={10} /> : <Unlock size={10} />}
                           </button>
                        </label>
                        <input disabled={lockTiltY} type="number" step="1" value={tiltY} onChange={(e) => setTiltY(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                    </div>
                    <input disabled={lockTiltY} type="range" min="-360" max="360" step="1" value={tiltY} onChange={(e) => setTiltY(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:cursor-not-allowed" />
                </div>
                {/* Z */}
                <div className={`w-1/3 transition-opacity ${lockTiltZ ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 block flex items-center gap-1">
                           Neigung Z
                           <button onClick={() => setLockTiltZ(!lockTiltZ)} className="focus:outline-none text-slate-500 hover:text-cyan-400">
                             {lockTiltZ ? <Lock size={10} /> : <Unlock size={10} />}
                           </button>
                        </label>
                        <input disabled={lockTiltZ} type="number" step="1" value={tiltZ} onChange={(e) => setTiltZ(parseFloat(e.target.value))} className="w-14 bg-slate-800 text-[10px] text-white border border-slate-600 rounded px-1 py-0.5 text-center font-mono" />
                    </div>
                    <input disabled={lockTiltZ} type="range" min="-360" max="360" step="1" value={tiltZ} onChange={(e) => setTiltZ(parseFloat(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:cursor-not-allowed" />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UIOverlay;