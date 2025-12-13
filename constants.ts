
// The colors observed in the reference image (Sat.1 style ball)
// Order: Blue, Purple, Red, Orange, Yellow, Light Green, Cyan/LightBlue
export const BALL_COLORS = [
  "#0057b8", // Deep Blue
  "#800080", // Purple
  "#c40030", // Red
  "#ff7f00", // Orange
  "#fecb00", // Yellow
  "#78be20", // Light Green
  "#00b5e2", // Cyan
  "#ffffff"  // White filler is handled separately, but these are the main slices
];

export const DEFAULTS = {
  rotationSpeedX: 0,
  rotationSpeedY: 1.5,
  rotationSpeedZ: 0,
  
  expansion: 0.02,
  autoAnimate: true,
  animationType: 'breath' as const,
  hoverEffect: true,
  
  scale: 1.0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  tiltX: 0,
  tiltY: 0,
  tiltZ: 12, // Converted from 0.2 rad to approx 12 degrees
  
  colorSpeed: 0,
  colorDirection: 1,
  
  lamellaWidth: 40,
  verticalStart: 90,
  verticalEnd: -90,
  lamellaCount: 7,
  lamellaDepth: 0.01,
  
  segmentOuterRadius: 1.0, // New
  segmentInnerRadius: 0.99, // New (Matches default core depth)
  
  roughness: 0.2,
  metalness: 0.1,
  clearcoat: 0.1,
  transmission: 0.0,
  thickness: 1.0,
  iridescence: 0.0,
  wireframe: false,
  
  coreColor: '#f0f0f0',
  coreOpacity: 1.0,
  coreVisible: true,
  coreType: 'solid' as const, // New default
  
  backgroundColor: '#0f172a',
  
  enableBloom: false,
  bloomIntensity: 1.0,
  enableNoise: false,
  noiseOpacity: 0.05,
  enableGlitch: false,
  showEnvBackground: false,
  
  lightPreset: 'studio' as const
};

export const ANIMATION_CONFIG = {
  rotationSpeed: 0.5,
  expansionSpeed: 1.5,
  maxExpansion: 0.2,
};