'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Preload, AdaptiveDpr, useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import {  useRef, Suspense } from 'react'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

const Sky = dynamic(() => import('@/components/canvas/Sky/Sky'), { ssr: false })
const Mountains = dynamic(() => import('@/components/canvas/Mountains/Mountains'), { ssr: false })




export default function Scene({ ...props }) {

  const canvasRef = useRef()

  return (
    <Canvas ref={canvasRef}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.AgXToneMapping
        gl.setClearColor(new THREE.Color(0x000000), 1);
        gl.autoClear = true;
        gl.clearDepth();
      }}
      className="canvas"
      dpr={window.devicePixelRatio}


    >

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
        <Suspense fallback={null}>
          <Mountains />
         

        </Suspense>
      <Preload all />
    </Canvas>
  )
}
