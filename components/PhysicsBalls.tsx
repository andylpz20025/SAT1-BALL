import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import Ball3D from './Ball3D';
import { SphereProps } from '../types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
    }
  }
}

interface PhysicsBallData {
    position: Vector3;
    velocity: Vector3;
    rotationVelocity: Vector3;
    scaleOffset: number;
    radius: number;
    mass: number; // NEW
}

// Custom Physics Engine with Sphere-Sphere Collision for Stacking
export const PhysicsBalls: React.FC<SphereProps> = (props) => {
    const { 
        physicsBallCount, physicsGravity, physicsBounciness, 
        physicsFriction, physicsMass, // NEW props
        scale, segmentOuterRadius, physicsActive
    } = props;
    
    const groupsRef = useRef<(Group | null)[]>([]);
    const physicsState = useRef<PhysicsBallData[]>([]);
    
    // Initialize balls whenever active state changes to true or count changes
    useEffect(() => {
        if (!physicsActive) return;

        const balls: PhysicsBallData[] = [];
        const baseRadius = scale * segmentOuterRadius;

        for (let i = 0; i < physicsBallCount; i++) { 
            const scaleOffset = 0.8 + Math.random() * 0.4;
            const r = baseRadius * scaleOffset;
            
            balls.push({
                position: new Vector3(
                    (Math.random() - 0.5) * 20, // Wider Spread X
                    15 + Math.random() * 80,    // High start for many balls
                    (Math.random() - 0.5) * 20  // Wider Spread Z
                ),
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.1,
                    0,
                    (Math.random() - 0.5) * 0.1
                ),
                rotationVelocity: new Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                ),
                scaleOffset: scaleOffset,
                radius: r,
                mass: Math.pow(r, 3) * physicsMass // Mass ~ Volume * Density (physicsMass prop)
            });
        }
        physicsState.current = balls;
    }, [physicsActive, physicsBallCount, scale, segmentOuterRadius, physicsMass]);

    useFrame((state, delta) => {
        if (!physicsActive) return;

        const floorY = -3.0;
        const balls = physicsState.current;
        const count = balls.length;

        // 1. Update Physics (Gravity & Floor)
        for (let i = 0; i < count; i++) {
            const ball = balls[i];
            
            // Apply Gravity
            ball.velocity.y -= physicsGravity * 0.15;
            
            // Update Position
            ball.position.add(ball.velocity);
            
            // Floor Collision
            if (ball.position.y < floorY + ball.radius) {
                ball.position.y = floorY + ball.radius;
                ball.velocity.y *= -physicsBounciness;
                
                // Friction logic (affected by physicsFriction prop)
                // If friction is 1, slow down significantly. If 0, slide forever.
                const frictionFactor = 1 - (physicsFriction * 0.1); 
                ball.velocity.x *= frictionFactor;
                ball.velocity.z *= frictionFactor;

                if (Math.abs(ball.velocity.y) < 0.05) ball.velocity.y = 0;
            }

            // Wall constraints (optional, keep them in view)
            if (ball.position.x < -25) { ball.position.x = -25; ball.velocity.x *= -0.5; }
            if (ball.position.x > 25) { ball.position.x = 25; ball.velocity.x *= -0.5; }
            if (ball.position.z < -15) { ball.position.z = -15; ball.velocity.z *= -0.5; }
            if (ball.position.z > 15) { ball.position.z = 15; ball.velocity.z *= -0.5; }
        }

        // 2. Solve Sphere-Sphere Collisions (Stacking with Mass)
        // Simple iterative solver
        const iterations = 3; 
        
        for (let iter = 0; iter < iterations; iter++) {
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const b1 = balls[i];
                    const b2 = balls[j];
                    
                    const dx = b2.position.x - b1.position.x;
                    const dy = b2.position.y - b1.position.y;
                    const dz = b2.position.z - b1.position.z;
                    
                    const distSq = dx*dx + dy*dy + dz*dz;
                    const minDist = b1.radius + b2.radius;
                    
                    if (distSq < minDist * minDist && distSq > 0.0001) {
                        const dist = Math.sqrt(distSq);
                        const overlap = minDist - dist;
                        
                        // Normal vector
                        const nx = dx / dist;
                        const ny = dy / dist;
                        const nz = dz / dist;
                        
                        // Mass-based displacement (Lighter object moves more)
                        const totalMass = b1.mass + b2.mass;
                        const m1Ratio = b1.mass / totalMass;
                        const m2Ratio = b2.mass / totalMass;

                        // Position Correction
                        const moveX = nx * overlap;
                        const moveY = ny * overlap;
                        const moveZ = nz * overlap;
                        
                        // Inverse Application: b1 moves by b2's mass ratio (if b2 is heavy, b1 moves a lot)
                        b1.position.x -= moveX * m2Ratio;
                        b1.position.y -= moveY * m2Ratio;
                        b1.position.z -= moveZ * m2Ratio;
                        
                        b2.position.x += moveX * m1Ratio;
                        b2.position.y += moveY * m1Ratio;
                        b2.position.z += moveZ * m1Ratio;
                        
                        // Velocity Transfer (Elastic collision approximation with mass)
                        // This simplifies nicely for piles, essentially blending velocities weighted by mass
                        const friction = 0.9;
                        
                        // Standard impulse transfer is complicated in loop, 
                        // approximate by weighted averaging for stack stability
                        const avgVx = (b1.velocity.x * m1Ratio + b2.velocity.x * m2Ratio) * friction;
                        const avgVy = (b1.velocity.y * m1Ratio + b2.velocity.y * m2Ratio) * friction;
                        const avgVz = (b1.velocity.z * m1Ratio + b2.velocity.z * m2Ratio) * friction;

                        // Apply averaged velocity back (stabilizes the pile)
                        b1.velocity.x = avgVx; b1.velocity.y = avgVy; b1.velocity.z = avgVz;
                        b2.velocity.x = avgVx; b2.velocity.y = avgVy; b2.velocity.z = avgVz;
                    }
                }
            }
        }

        // 3. Update Visuals
        for (let i = 0; i < count; i++) {
            const grp = groupsRef.current[i];
            const ball = balls[i];
            if (grp && ball) {
                grp.position.copy(ball.position);
                grp.rotation.x += ball.rotationVelocity.x;
                grp.rotation.y += ball.rotationVelocity.y;
                grp.rotation.z += ball.rotationVelocity.z;
            }
        }
    });
    
    // Reset array ref when count changes
    groupsRef.current = groupsRef.current.slice(0, physicsBallCount);

    if (!physicsActive) return null;

    return (
        <group>
            {Array.from({ length: physicsBallCount }).map((_, i) => (
                <group 
                    key={i} 
                    ref={(el) => { groupsRef.current[i] = el; }}
                    // Start off-screen before physics update snaps them
                    position={[0, -100, 0]} 
                >
                    <Ball3D 
                        {...props} 
                        // Override pos/tilt, handled by physics container
                        positionX={0} positionY={0} positionZ={0} 
                        tiltX={0} tiltY={0} tiltZ={0}
                        scale={props.scale * (physicsState.current[i]?.scaleOffset || 1)}
                        hoverEffect={false} // Performance optimization
                    />
                </group>
            ))}
        </group>
    );
};