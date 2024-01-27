'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, AdaptiveDpr, useGLTF } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import { useState, useEffect, useRef, Suspense } from 'react'

import Sky from '@/components/canvas/Sky/Sky'
import Mountains from '@/components/canvas/Mountains/Mountains'
import { InstancedMountains, InstancesMountains } from '@/components/canvas/Mountains/InstancedMountains'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

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
    scaleY: 1,
    scaleXZ: 4.3,
    posMult: 2.4,
  }
 
  // Everything defined in here will persist between route changes, only children are swapped
  const canvasRef = useRef()
  return (
    <Canvas ref={canvasRef}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      {/* @ts-ignore */}
      <r3f.Out />
      <AdaptiveDpr pixelated />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.9} // where to focus
          focalLength={0.2} // focal length
          bokehScale={6} // bokeh size
        />
      </EffectComposer>
      <Sky />

      <group position={[0, -100, 0]}>
        <Mountains />
        <Suspense fallback={null}>
        <InstancesMountains>
    
          <InstancedMountains
            key='top'
            visible={modelLoaded}
            position={[1484 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />
          <InstancedMountains
            key='bottom'
            visible={modelLoaded}

            position={[-1893.5 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />

          <InstancedMountains
            key='left'
            visible={modelLoaded}

            position={[0, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />
          <InstancedMountains
            key='right'
            visible={modelLoaded}

            position={[0, 0, 2011 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />

          <InstancedMountains
            key='topleft'
            visible={modelLoaded}

            position={[1484 * scalingParams.posMult, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />
          <InstancedMountains
            key='topright'
            visible={modelLoaded}

            position={[1484 * scalingParams.posMult, 0, 2011 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />

          <InstancedMountains
            key='bottomleft'
            visible={modelLoaded}

            position={[-1893.5 * scalingParams.posMult, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            />
          <InstancedMountains
            key='bottomright'
            visible={modelLoaded}

            position={[-1893.5 * scalingParams.posMult, 0, 2011 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
            /> 
               
        </InstancesMountains>
        
        </Suspense>
        </group>
        <Preload all />
        </Canvas>
        )
      }
      