'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Preload, AdaptiveDpr, useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import * as THREE from 'three'
import dynamic from 'next/dynamic'
import {  useRef, Suspense } from 'react'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'




export default function Scene({ ...props }) {

  const canvasRef = useRef()

  return (
    <Canvas ref={canvasRef}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.AgXToneMapping
        gl.setClearColor(new THREE.Color(0x000000), 0);
        gl.autoClear = true;
        gl.clearDepth();
      }}
      className="canvas"
      dpr={window.devicePixelRatio}
      gl={{ alpha: true }}
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
     

      <Preload all />
    </Canvas>
  )
}
