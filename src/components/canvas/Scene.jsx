'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, AdaptiveDpr, useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, Suspense } from 'react'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

const Sky = dynamic(() => import('@/components/canvas/Sky/Sky'), { ssr: false })
const Mountains = dynamic(() => import('@/components/canvas/Mountains/Mountains'), { ssr: false })
const InstancedMountains = dynamic(() => import('@/components/canvas/Mountains/InstancedMountains').then((mod) => mod.InstancedMountains), { ssr: false })
const InstancesMountains = dynamic(() => import('@/components/canvas/Mountains/InstancedMountains').then((mod) => mod.InstancesMountains), { ssr: false })

export default function Scene({ ...props }) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const { nodes } = useGLTF('/mountains.glb');

  useEffect(() => {
    if (nodes) {
      setModelLoaded(true);
      console.log("model Loaded1", modelLoaded )
    }
  }, [nodes]);

  useEffect(() => {
    console.log("model Loaded2", modelLoaded);
  }, [modelLoaded]);

  const scalingParams = {
    scaleY: 5,
    scaleXZ: 4.3,
    posMult: 2.4,
  }
  const cameraRef = useRef();

  const canvasRef = useRef()
  return (
    <Canvas ref={canvasRef}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      <r3f.Out />
      <AdaptiveDpr pixelated />
      <Sky />
      <EffectComposer>
        <DepthOfField
          focusDistance={0.9} // where to focus
          focalLength={0.2} // focal length
          bokehScale={6} // bokeh size
        />
      </EffectComposer>
      <Mountains />
      <group position={[0, -250, 0]}>
        <mesh
          position={[0, -50, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry attach="geometry" args={[103500, 103500]} />
          <meshStandardMaterial attach="material" color="black" />
        </mesh>

        <Suspense fallback={null}>
        <InstancesMountains>
          <InstancedMountains
            key='top'
            visible={modelLoaded}
            position={[2500 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />
           
         <InstancedMountains
            key='bottom'
            visible={modelLoaded}

            position={[-2800 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />

          <InstancedMountains
            key='left'
            visible={modelLoaded}

            position={[0, 0, -3200 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />
            
          <InstancedMountains
            key='right'
            visible={modelLoaded}

            position={[0, 0, 3400 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            /> 

        
          <InstancedMountains
            key='topleft'
            visible={modelLoaded}

            position={[2800 * scalingParams.posMult, 0, -3200 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />

          <InstancedMountains
            key='topright'
            visible={modelLoaded}

            position={[2800 * scalingParams.posMult, 0, 3300 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />

          <InstancedMountains
            key='bottomleft'
            visible={modelLoaded}

            position={[-2600 * scalingParams.posMult, 0, -3000 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />  
          <InstancedMountains
            key='bottomright'
            visible={modelLoaded}

            position={[-2000 * scalingParams.posMult, 0, 3200* scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={true}
            recieveShadows={true}
            />  


                
        </InstancesMountains>
        
        </Suspense>
      </group>
      <Preload all />
    </Canvas>
  )
}
