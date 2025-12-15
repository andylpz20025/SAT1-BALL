
// The colors observed in the reference image (Sat.1 style ball)
// Order provided by user
export const BALL_COLORS = [
  "#93278F", // Rot-Violett
  "#662D91", // Violett
  "#2E3192", // Dunkelblau
  "#0054A6", // Mittelblau
  "#0071BC", // Blau-Cyan
  "#00AEEF", // Cyan
  "#00A99D", // Türkis
  "#00A651", // Dunkelgrün
  "#8DC63F", // Hellgrün
  "#D9E021", // Gelb-Grün
  "#FFF200", // Gelb
  "#FBB03B", // Gold-Gelb
  "#F7941D", // Orange
  "#F15A24", // Hellrot
  "#ED1C24", // Rot
  "#BE1E2D", // Dunkelrot
  "#ffffff"  // White filler is handled separately
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
  
  // Orientation defaults
  tiltX: -45,
  tiltY: 0,
  tiltZ: -30,
  
  colorSpeed: 0,
  colorDirection: 1,
  
  lamellaWidth: 15,
  verticalStart: 85,
  verticalEnd: -85,
  lamellaCount: 16,
  lamellaDepth: 0.001,
  
  segmentOuterRadius: 1, 
  segmentInnerRadius: 1, 
  
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