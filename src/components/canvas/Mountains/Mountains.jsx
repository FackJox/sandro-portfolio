'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'


export default function Mountains(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/mountains.glb')
  const { actions } = useAnimations(animations, group)
  const [actionProgress, setActionProgress] = useState(0)
  const { camera } = useThree()
  const { actionSlider } = useControls({ actionSlider: { value: 0, min: 0, max: 100, step: 1 } })

  // const [actionSlider, setActionSlider] = useState(0)
  // const [direction, setDirection] = useState(1)

  // useFrame(() => {
  //   setActionSlider(prev => {
  //     let next = prev + direction * 0.5
  //     if (next > 100) {
  //       setDirection(-1)
  //       next = 100
  //     } else if (next < 0) {
  //       setDirection(1)
  //       next = 0
  //     }
  //     return next
  //   })
  // })

  
  useEffect(() => {
    const action = actions.Action
    if (action) {
      action.paused = true
      action.play()
      action.time = (action.getClip().duration * actionSlider) / 100
    }
  }, [actions, actionSlider])


  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      
      // Reapply the current animation time if necessary
      const action = actions.Action
      if (action) {
        action.time = (action.getClip().duration * actionSlider) / 100
      }
    }
  
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [camera, actions, actionSlider])

  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera name="CameraAction" makeDefault={true} far={1000000} near={0.1} fov={36.2} position={[-353.926, 88.438, 56.419]} rotation={[-0.42, -1.381, -0.413]} />
        {/* <OrbitControls />
        <mesh name="EverestDistant1HD" geometry={nodes.EverestDistant1HD.geometry} material={new THREE.MeshBasicMaterial({color: 'red', transparent: true, opacity: 0.9})} position={[-101.238, 48.691, 505.312]} />
        <mesh name="EverestMidHD" geometry={nodes.EverestMidHD.geometry} material={new THREE.MeshBasicMaterial({color: 'red', transparent: true, opacity: 0.9})} />
        <mesh name="EverestPeakHD" geometry={nodes.EverestPeakHD.geometry} material={new THREE.MeshBasicMaterial({color: 'red', transparent: true, opacity: 0.9})} /> */}
        <mesh name="EverestDistant1HD" geometry={nodes.EverestDistant1HD.geometry} material={materials.DistantMountainMat} position={[-101.238, 48.691, 505.312]}         castShadows={true}
            recieveShadows={true}/>
        <mesh name="EverestMidHD" geometry={nodes.EverestMidHD.geometry} material={materials.MidMountainMat}         castShadows={true}
            recieveShadows={true}/>
        <mesh name="EverestPeakHD" geometry={nodes.EverestPeakHD.geometry} material={materials.PeakMountainMat}        castShadows={true}
            recieveShadows={true} />
      </group>
    </group>
  )
}

useGLTF.preload('/mountains.glb')
