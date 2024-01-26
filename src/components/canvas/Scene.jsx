'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}
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
        <Mountains setContextValue={setContextValue} />

        <InstancesMountains>
          <InstancedMountains
            key='top'
            position={[1484 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='bottom'
            position={[-1893.5 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />

          <InstancedMountains
            key='left'
            position={[0, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='right'
            position={[0, 0, 2011 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />

          <InstancedMountains
            key='topleft'
            position={[1484 * scalingParams.posMult, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='topright'
            position={[1484 * scalingParams.posMult, 0, 2011 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />

          <InstancedMountains
            key='bottomleft'
            position={[-1893.5 * scalingParams.posMult, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='bottomright'
            position={[-1893.5 * scalingParams.posMult, 0, 2011 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
        </InstancesMountains>
      </group>
      <Preload all />
    </Canvas>
  )
}
