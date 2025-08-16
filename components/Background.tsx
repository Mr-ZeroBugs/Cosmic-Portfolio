"use client";

import React, { Suspense, useRef, useMemo, useCallback, useState } from 'react'; // <-- เพิ่ม useState
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Enhanced Black Hole (ไม่มีการเปลี่ยนแปลง)
function BlackHole() {
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const accretionRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    try {
      if (accretionRef.current) accretionRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      if (innerRingRef.current) innerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.8;
      if (glowRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.2 + 1;
        glowRef.current.scale.setScalar(pulse);
      }
      if (outerGlowRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 2 + Math.PI) * 0.15 + 0.9;
        outerGlowRef.current.scale.setScalar(pulse);
      }
    } catch (error) {
      console.warn('BlackHole animation error:', error);
    }
  });

  return (
    <group position={[0, 0, -120]}>
      <mesh ref={blackHoleRef}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[18, 32, 32]} />
        <meshBasicMaterial color="#FF2D00" transparent opacity={0.6} />
      </mesh>
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[22, 32, 32]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.3} side={THREE.BackSide} />
      </mesh>
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[25, 35, 64]} />
        <meshBasicMaterial color="#FFFF00" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={accretionRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[40, 80, 64]} />
        <meshBasicMaterial color="#FF4500" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[80, 120, 48]} />
        <meshBasicMaterial color="#FF8C00" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[120, 150, 32]} />
        <meshBasicMaterial color="#FFB347" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// --- HOLOGRAM FIGURE WITH POSE-CHANGE GLITCH EFFECT ---
function HologramFigure() {
  const figureRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Mesh>(null);
  const rightForearmRef = useRef<THREE.Mesh>(null);

  // State สำหรับควบคุม Glitch
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchDuration = useRef(0);

  const poseChangeTimer = useRef(0);
  const currentPoseIndex = useRef(0);
  const nextPoseChange = useRef(Math.random() * 5 + 3);

  const poses = useMemo(() => [
    // Pose 0: Standing straight
    {
      leftArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 12)) },
      rightArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI / 12)) },
      leftForearm: { rotation: new THREE.Quaternion(), position: new THREE.Vector3(0, -2.5, 0) },
      rightForearm: { rotation: new THREE.Quaternion(), position: new THREE.Vector3(0, -2.5, 0) },
      head: { rotation: new THREE.Quaternion() }
    },
    // Pose 1: Thinking pose
    {
      leftArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 3)) },
      rightArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, -Math.PI / 6)) },
      leftForearm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 4)), position: new THREE.Vector3(0, -2.5, 0) },
      rightForearm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 1.5, 0, 0)), position: new THREE.Vector3(-1, -1.5, 1) },
      head: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 8, Math.PI / 12)) }
    },
    // Pose 2: Pointing gesture
    {
      leftArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 6)) },
      rightArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 4, -Math.PI / 2)) },
      leftForearm: { rotation: new THREE.Quaternion(), position: new THREE.Vector3(0, -2.5, 0) },
      rightForearm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI / 6)), position: new THREE.Vector3(2.5, 0, 2) },
      head: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 6, 0)) }
    },
    // Pose 3: Crossed arms
    {
      leftArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 4, Math.PI / 1.8)) },
      rightArm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 4, -Math.PI / 1.8)) },
      leftForearm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 3)), position: new THREE.Vector3(1, -1, 0) },
      rightForearm: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI / 3)), position: new THREE.Vector3(-1, -1, 0) },
      head: { rotation: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -Math.PI / 12)) }
    }
  ], []);

  useFrame((state, delta) => {
    try {
      if (!figureRef.current) return;
      const time = state.clock.elapsedTime;
      
      // --- Pose changing logic ---
      poseChangeTimer.current += delta;
      if (poseChangeTimer.current >= nextPoseChange.current && !isGlitching) {
        currentPoseIndex.current = (currentPoseIndex.current + 1) % poses.length;
        nextPoseChange.current = Math.random() * 6 + 4;
        poseChangeTimer.current = 0;
        
        // --- TRIGGER GLITCH ---
        setIsGlitching(true);
        glitchDuration.current = 0.3; // ระยะเวลา Glitch (วินาที)
        console.log(`Switching to Pose: ${currentPoseIndex.current} - GLITCHING!`);
      }

      // --- GLITCH EFFECT LOGIC ---
      if (isGlitching) {
        figureRef.current.position.x += (Math.random() - 0.5) * 1.5;
        figureRef.current.position.y += (Math.random() - 0.5) * 1.5;
        figureRef.current.rotation.y = Math.random() * Math.PI * 2;
        
        if (headRef.current) {
          headRef.current.position.x = (Math.random() - 0.5) * 0.8;
          headRef.current.position.y += (Math.random() - 0.5) * 0.8 - 14; // Offset to keep it relative
        }

        figureRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
            child.material.opacity = Math.random();
            child.material.color.setRGB(Math.random(), Math.random(), Math.random());
          }
        });

        glitchDuration.current -= delta;
        if (glitchDuration.current <= 0) {
          setIsGlitching(false);
          // Reset head position after glitch
          if (headRef.current) {
             headRef.current.position.set(0, 14, 0);
          }
        }
      } 
      // --- NORMAL ANIMATION LOGIC ---
      else {
        const targetPose = poses[currentPoseIndex.current];
        const lerpFactor = 0.05;

        // Glitch and float movement
        const glitch = Math.sin(time * 18) * (Math.sin(time * 7) * 0.5 + 0.5) * 0.15;
        const verticalFloat = Math.sin(time * 2) * 0.08;
        figureRef.current.position.x = glitch;
        figureRef.current.position.y = -8 + verticalFloat;
        figureRef.current.rotation.y = Math.PI; // Reset rotation
        
        // Smooth transition to the target pose
        if (leftArmRef.current) leftArmRef.current.quaternion.slerp(targetPose.leftArm.rotation, lerpFactor);
        if (rightArmRef.current) rightArmRef.current.quaternion.slerp(targetPose.rightArm.rotation, lerpFactor);
        if (headRef.current) headRef.current.quaternion.slerp(targetPose.head.rotation, lerpFactor);
        
        if (leftForearmRef.current) {
          leftForearmRef.current.quaternion.slerp(targetPose.leftForearm.rotation, lerpFactor);
          leftForearmRef.current.position.lerp(targetPose.leftForearm.position, lerpFactor);
        }
        if (rightForearmRef.current) {
          rightForearmRef.current.quaternion.slerp(targetPose.rightForearm.rotation, lerpFactor);
          rightForearmRef.current.position.lerp(targetPose.rightForearm.position, lerpFactor);
        }
        
        // Opacity and color effects
        const baseOpacity = 0.75 + Math.sin(time * 15) * 0.15;
        const heavyGlitchFlicker = Math.random() < 0.06 ? Math.random() * 0.6 : 0;
        const finalOpacity = Math.max(0.15, baseOpacity - heavyGlitchFlicker);
        
        figureRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
            child.material.opacity = finalOpacity;
            if (Math.random() < 0.02) {
              child.material.color.setHex(0xFF00FF);
            } else {
              child.material.color.setHex(0x00FFFF);
            }
          }
        });
      }
    } catch (error) {
      console.warn('HologramFigure animation error:', error);
    }
  });

  return (
    <group ref={figureRef} position={[0, -8, 40]} rotation={[0, Math.PI, 0]}>
      <mesh ref={headRef} position={[0, 14, 0]}>
        <boxGeometry args={[1.8, 2.2, 1.8]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
      </mesh>
      <mesh position={[0, 12.5, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.5, 8]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
      </mesh>
      <mesh position={[0, 8.5, 0]}>
        <boxGeometry args={[2.5, 5, 1.2]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
      </mesh>
      <group ref={leftArmRef} position={[-2.2, 9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.4, 3, 8]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
        </mesh>
        <mesh ref={leftForearmRef} position={[0, -2.5, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 2.5, 8]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[2.2, 9, 0]}>
        <mesh>
          <cylinderGeometry args={[0.35, 0.4, 3, 8]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
        </mesh>
        <mesh ref={rightForearmRef} position={[0, -2.5, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 2.5, 8]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
        </mesh>
      </group>
      <mesh position={[-0.7, 3, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 8, 8]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
      </mesh>
      <mesh position={[0.7, 3, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 8, 8]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.75} wireframe />
      </mesh>
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[4, 4, 0.3, 24]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.4} wireframe />
      </mesh>
    </group>
  );
}


// (โค้ดส่วนที่เหลือไม่มีการเปลี่ยนแปลง)

function FloatingCodeGeometry() {
  const codeFragments = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    try {
      if (codeFragments.current) {
        codeFragments.current.children.forEach((child, i) => {
          const speed = 0.02 + (i % 3) * 0.01;
          child.position.z += speed;
          if (child.position.z > 80) {
            child.position.z = -200 - Math.random() * 50;
            child.position.x = (Math.random() - 0.5) * 150;
            child.position.y = (Math.random() - 0.5) * 80;
          }
          child.rotation.x += 0.005;
          child.rotation.y += 0.003;
          if (Math.random() < 0.005) {
            child.position.x += (Math.random() - 0.5) * 3;
            child.position.y += (Math.random() - 0.5) * 2;
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
              child.material.opacity = Math.random() * 0.8 + 0.2;
            }
          }
        });
      }
    } catch (error) {
      console.warn('FloatingCodeGeometry animation error:', error);
    }
  });

  return (
    <group ref={codeFragments}>
      {[...Array(15)].map((_, i) => {
        const shapes = [
            <boxGeometry key="shape-box-1" args={[3, 1, 0.3]} />,
            <boxGeometry key="shape-box-2" args={[1.5, 2, 0.3]} />,
            <cylinderGeometry key="shape-cylinder" args={[0.5, 0.5, 2, 6]} />
        ];
        return (
          <mesh 
            key={i}
            position={[ (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 80, -150 - (i * 10) ]}
          >
            {shapes[i % 3]}
            <meshBasicMaterial 
              color={i % 3 === 0 ? "#00FF00" : i % 3 === 1 ? "#FF00FF" : "#FFFF00"} 
              transparent 
              opacity={0.7}
              wireframe 
            />
          </mesh>
        );
      })}
      {[...Array(25)].map((_, i) => (
        <mesh 
          key={`particle-${i}`}
          position={[ (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 60, -100 - (i * 8) ]}
        >
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function EnhancedParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 300;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 300;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.8, 0.6);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return col;
  }, []);

  useFrame((state) => {
    try {
      if (particlesRef.current) {
        particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        if (Math.random() < 0.03) {
          particlesRef.current.rotation.x += (Math.random() - 0.5) * 0.01;
          particlesRef.current.rotation.z += (Math.random() - 0.5) * 0.01;
        }
      }
    } catch (error) {
      console.warn('EnhancedParticles animation error:', error);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1} transparent opacity={0.8} sizeAttenuation vertexColors blending={THREE.AdditiveBlending} />
    </points>
  );
}

function LayeredNebula() {
  const nebula1Ref = useRef<THREE.Mesh>(null);
  const nebula2Ref = useRef<THREE.Mesh>(null);
  const nebula3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    try {
      if (nebula1Ref.current) nebula1Ref.current.rotation.y = state.clock.elapsedTime * 0.003;
      if (nebula2Ref.current) nebula2Ref.current.rotation.y = -state.clock.elapsedTime * 0.002;
      if (nebula3Ref.current) nebula3Ref.current.rotation.x = state.clock.elapsedTime * 0.001;
    } catch (error) {
      console.warn('LayeredNebula animation error:', error);
    }
  });

  return (
    <group>
      <mesh ref={nebula1Ref} position={[0, 0, -300]}>
        <sphereGeometry args={[150, 16, 16]} />
        <meshBasicMaterial color="#4A148C" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      <mesh ref={nebula2Ref} position={[50, 20, -280]}>
        <sphereGeometry args={[120, 16, 16]} />
        <meshBasicMaterial color="#7B1FA2" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh ref={nebula3Ref} position={[-30, -15, -320]}>
        <sphereGeometry args={[100, 16, 16]} />
        <meshBasicMaterial color="#8E24AA" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

const Background: React.FC = () => {
  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault();
    console.log('WebGL context lost, attempting recovery...');
  }, []);

  const handleContextRestored = useCallback(() => {
    console.log('WebGL context restored');
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-b from-black via-purple-900 to-black flex items-center justify-center">
          <div className="text-white text-sm animate-pulse">Loading holographic interface...</div>
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 8, 100], fov: 75, near: 0.1, far: 1000 }}
          dpr={[1, 2]}
          performance={{ min: 0.4, max: 1, debounce: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance", stencil: false, depth: true }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000');
            gl.domElement.addEventListener('webglcontextlost', handleContextLost);
            gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);
          }}
        >
          <fog attach="fog" args={['#000011', 100, 300]} />
          
          <ambientLight intensity={0.15} color="#1a1a3e" />
          <directionalLight position={[10, 10, 10]} intensity={0.3} color="#6A1B9A" />
          <pointLight position={[0, 0, -120]} intensity={2} color="#FF6B00" distance={200} />
         
          <Stars radius={400} depth={150} count={5000} factor={4} saturation={0.3} fade speed={0.3} />
         
          <HologramFigure />
          <BlackHole />
          <LayeredNebula />
          <FloatingCodeGeometry />
          <EnhancedParticles />

          <EffectComposer multisampling={4}>
            <Bloom intensity={2} luminanceThreshold={0.2} luminanceSmoothing={0.6} height={1024} opacity={1.2} />
            <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Background;