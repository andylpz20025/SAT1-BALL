

export interface LamellaData {
  color: string;
  opacity: number;
}

export interface SphereProps {
  // Rotation Animation Speeds per Axis
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
  lamellaDepth: number; 
  
  // New: Independent Segment Radius Controls
  segmentOuterRadius: number;
  segmentInnerRadius: number;
  
  // Material Props
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
  // NEW: Core Type for Multi-Color support
  coreType: 'solid' | 'segmented';
  // NEW: Independent Core Colors
  coreLamellaList: LamellaData[];

  // Post Processing & Env
  enableBloom: boolean;
  bloomIntensity: number;
  enableNoise: boolean;
  noiseOpacity: number;
  enableGlitch: boolean;
  showEnvBackground: boolean;
  
  // New: Light Presets
  lightPreset: 'studio' | 'cyberpunk' | 'sunset';

  // NEW: Physics / Falling Balls
  enablePhysics: boolean;
  physicsActive: boolean; // Controls the actual drop start
  physicsBallCount: number;
  physicsGravity: number;
  physicsBounciness: number;
  physicsFriction: number; // NEW
  physicsMass: number;     // NEW

  // NEW: Floor Options
  floorReflector: boolean;
  floorShadows: boolean;
  floorGrid: boolean;
  floorColor: string;             // NEW
  floorRoughness: number;         // NEW
  floorReflectionStrength: number;// NEW
}

export interface ControlPanelProps {
  rotationSpeedX: number;
  setRotationSpeedX: (val: number) => void;
  rotationSpeedY: number;
  setRotationSpeedY: (val: number) => void;
  rotationSpeedZ: number;
  setRotationSpeedZ: (val: number) => void;

  expansion: number;
  setExpansion: (val: number) => void;
  autoAnimate: boolean;
  setAutoAnimate: (val: boolean) => void;
  animationType: 'breath' | 'wave';
  setAnimationType: (val: 'breath' | 'wave') => void;
  hoverEffect: boolean;
  setHoverEffect: (val: boolean) => void;

  scale: number;
  setScale: (val: number) => void;
  positionX: number;
  setPositionX: (val: number) => void;
  positionY: number;
  setPositionY: (val: number) => void;
  positionZ: number; 
  setPositionZ: (val: number) => void; 
  tiltX: number;
  setTiltX: (val: number) => void;
  tiltY: number;
  setTiltY: (val: number) => void;
  tiltZ: number;
  setTiltZ: (val: number) => void;
  
  // Locking states for Tilt
  lockTiltX: boolean;
  setLockTiltX: (val: boolean) => void;
  lockTiltY: boolean;
  setLockTiltY: (val: boolean) => void;
  lockTiltZ: boolean;
  setLockTiltZ: (val: boolean) => void;

  colorSpeed: number;
  setColorSpeed: (val: number) => void;
  colorDirection: number;
  setColorDirection: (val: number) => void;
  
  // New Controls
  lamellaWidth: number;
  setLamellaWidth: (val: number) => void;
  verticalStart: number;
  setVerticalStart: (val: number) => void;
  verticalEnd: number;
  setVerticalEnd: (val: number) => void;
  lamellaCount: number;
  setLamellaCount: (val: number) => void;
  lamellaDepth: number;
  setLamellaDepth: (val: number) => void;
  
  // Segment Radius Controls
  segmentOuterRadius: number;
  setSegmentOuterRadius: (val: number) => void;
  segmentInnerRadius: number;
  setSegmentInnerRadius: (val: number) => void;
  
  lamellaList: LamellaData[];
  updateLamella: (index: number, data: Partial<LamellaData>) => void;
  
  // NEW: Core Lamella List Control
  coreLamellaList: LamellaData[];
  updateCoreLamella: (index: number, data: Partial<LamellaData>) => void;
  
  // Material Controls
  roughness: number;
  setRoughness: (val: number) => void;
  metalness: number;
  setMetalness: (val: number) => void;
  clearcoat: number;
  setClearcoat: (val: number) => void;
  transmission: number;
  setTransmission: (val: number) => void;
  thickness: number;
  setThickness: (val: number) => void;
  iridescence: number;
  setIridescence: (val: number) => void;
  wireframe: boolean;
  setWireframe: (val: boolean) => void;

  coreColor: string;
  setCoreColor: (val: string) => void;
  coreOpacity: number;
  setCoreOpacity: (val: number) => void;
  coreVisible: boolean;
  setCoreVisible: (val: boolean) => void;
  // NEW: Core Type Setter
  coreType: 'solid' | 'segmented';
  setCoreType: (val: 'solid' | 'segmented') => void;

  backgroundColor: string;
  setBackgroundColor: (val: string) => void;
  
  // Effects Controls
  enableBloom: boolean;
  setEnableBloom: (val: boolean) => void;
  bloomIntensity: number;
  setBloomIntensity: (val: number) => void;
  enableNoise: boolean;
  setEnableNoise: (val: boolean) => void;
  noiseOpacity: number;
  setNoiseOpacity: (val: number) => void;
  enableGlitch: boolean;
  setEnableGlitch: (val: boolean) => void;
  showEnvBackground: boolean;
  setShowEnvBackground: (val: boolean) => void;
  
  // New: Light Preset Control
  lightPreset: 'studio' | 'cyberpunk' | 'sunset';
  setLightPreset: (val: 'studio' | 'cyberpunk' | 'sunset') => void;

  // NEW: Physics Controls
  enablePhysics: boolean;
  setEnablePhysics: (val: boolean) => void;
  physicsActive: boolean;
  setPhysicsActive: (val: boolean) => void;
  physicsBallCount: number;
  setPhysicsBallCount: (val: number) => void;
  physicsGravity: number;
  setPhysicsGravity: (val: number) => void;
  physicsBounciness: number;
  setPhysicsBounciness: (val: number) => void;
  physicsFriction: number;
  setPhysicsFriction: (val: number) => void;
  physicsMass: number;
  setPhysicsMass: (val: number) => void;

  // NEW: Floor Controls
  floorReflector: boolean;
  setFloorReflector: (val: boolean) => void;
  floorShadows: boolean;
  setFloorShadows: (val: boolean) => void;
  floorGrid: boolean;
  setFloorGrid: (val: boolean) => void;
  floorColor: string;
  setFloorColor: (val: string) => void;
  floorRoughness: number;
  setFloorRoughness: (val: number) => void;
  floorReflectionStrength: number;
  setFloorReflectionStrength: (val: number) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      circleGeometry: any;
      ringGeometry: any;
      planeGeometry: any;
      shadowMaterial: any;
    }
  }
}
