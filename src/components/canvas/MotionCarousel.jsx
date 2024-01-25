import React, { Suspense } from "react";
import { useVideoTexture, OrbitControls, PerspectiveCamera } from '@react-three/drei'
const drei = '/drei.webm';
const matrixShort = '/matrixShort.webm';
const galaxyShort = '/galaxyShort.webm';

const NUMBER_OF_SEGMENTS = 5;

export function CylinderSplit({ VideoSrc, rotation, ...props }) {
    let texture;
    if (typeof window !== 'undefined') {
      texture = useVideoTexture(VideoSrc, {
        onLoad: (texture) => {
          texture.image.play(); // Play the video
          console.log("🚀 ~ CylinderSplit ~ texture:", texture);
        },
        onError: (error) => {
          console.error("Error loading texture:", error);
        },
        start: true, // Add this line
        muted: true, // Mute the video before it's loaded
      });
    }

  const thetaLength = (2 * Math.PI) / NUMBER_OF_SEGMENTS;
  const height = (1024 / 720) / thetaLength * 1.07;

  const cylinderArgs = [2, 2, height, 16, 1, 1, 1, thetaLength];
  console.log('Cylinder Args:', cylinderArgs); // Log the cylinder arguments

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

export default function MotionCarousel() {
  console.log("test")

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
      <group >
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
