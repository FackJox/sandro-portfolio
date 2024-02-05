'use client'
import React, { Suspense, useRef, useState, useEffect } from "react";
import { useFrame } from '@react-three/fiber';
import { useVideoTexture } from '@react-three/drei';
import gsap from 'gsap';

const drei = '/drei.webm';
const matrixShort = '/matrixShort.webm';
const galaxyShort = '/galaxyShort.webm';

const NUMBER_OF_SEGMENTS = 5;
const PLANE_WIDTH = 1; // Assuming a plane width similar to StillCarousel
const PLANE_GAP = 0.1; // Assuming a gap similar to StillCarousel


export function CylinderSplit({ VideoSrc, rotation, position, ...props }) {
    let texture;
    if (typeof window !== 'undefined') {
      texture = useVideoTexture(VideoSrc, {
        start: true, // Add this line
        muted: true, // Mute the video before it's loaded
      });
    }

  const thetaLength = (2 * Math.PI) / NUMBER_OF_SEGMENTS;
  const height = (1024 / 720) / thetaLength * 1.07;

  const cylinderArgs = [2, 2, height, 16, 1, 1, 1, thetaLength];

  return (
    <mesh position={[0, 0, 0]} rotation={rotation} >
      <cylinderGeometry
        attach="geometry"
        args={cylinderArgs}
      />
      <Suspense fallback={<meshBasicMaterial wireframe />}>

      <meshBasicMaterial map={texture ? texture : undefined} toneMapped={false} />
      </Suspense>
    </mesh>
  );
}

export default function MotionCarousel(props) {
  const groupRef = useRef();
  const [activeSegment, setActiveSegment] = useState(0);
  const isDown = useRef(false);
  const startX = useRef(0);
  const progress = useRef(0);
  const speedDrag = -0.3;

  const handleDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleUp = () => {
    isDown.current = false;
  };

  const handleMove = (e) => {
    if (!isDown.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX.current) * speedDrag;
    progress.current += mouseProgress;
    startX.current = x;
  };

  useFrame(() => {
    if (groupRef.current) {
      const segments = groupRef.current.children;
      const segmentAngle = (2 * Math.PI) / NUMBER_OF_SEGMENTS;
      const active = Math.floor(progress.current / (PLANE_WIDTH + PLANE_GAP)) % NUMBER_OF_SEGMENTS;
      setActiveSegment(active);

      segments.forEach((segment, index) => {
        const angle = segmentAngle * (index - active);
        gsap.to(segment.rotation, {
          y: angle,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    }
  });

  useEffect(() => {
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleUp);
    window.addEventListener('pointercancel', handleUp);

    return () => {
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, []);

  return (
    <>
     {/* <OrbitControls
        enableDamping={true}
        dampingFactor={0.04}
        enableRotate
        enableZoom
        zoomSpeed={1}
        maxPolarAngle={Math.PI}
        screenSpacePanning={false}
        target={[0, 0, 0]}

      // minDistance={35}
      // maxDistance={10000}
      />

      <PerspectiveCamera
        makeDefault
        fov={65}
        far={6000}
        near={0.001}
        position={[0, 0, 0]}
      /> */}
      <group ref={groupRef} {...props}>
      <React.Suspense fallback={<meshBasicMaterial wireframe />}>
 

        <CylinderSplit
          rotation={[0, (2 * Math.PI / NUMBER_OF_SEGMENTS) * 1, 0]}
          VideoSrc={drei}
        />
        <CylinderSplit
          rotation={[0, (2 * Math.PI / NUMBER_OF_SEGMENTS)* 2 , 0]}
          VideoSrc={drei}
        />
        <CylinderSplit
          rotation={[0, (2 * Math.PI  / NUMBER_OF_SEGMENTS) * 3 , 0]}
          VideoSrc={galaxyShort}
        />
        <CylinderSplit
          rotation={[0, (2 * Math.PI  / NUMBER_OF_SEGMENTS) * 4 , 0]}
          VideoSrc={matrixShort}
        />
        <CylinderSplit
          position={[0, 0, 0]}
          rotation={[0, (2 * Math.PI  / NUMBER_OF_SEGMENTS) * 5 , 0]}
          VideoSrc={galaxyShort}
        />
        </React.Suspense>
      </group>
    </>
  );
}
