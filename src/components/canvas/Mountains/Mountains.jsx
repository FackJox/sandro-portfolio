import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations, CameraShake, OrbitControls } from '@react-three/drei'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import { useStore } from '@/helpers/store'
import { CameraRig } from '@/components/canvas/CameraRig'

export default function Mountains({ props, setContextValue }) {
  const group = useRef()
  const CameraActionRef = useRef()

const [isAnimationPlaying, setIsAnimationPlaying] = useState(useStore.getState().isAnimationPlaying)
  const { nodes, materials, animations } = useGLTF('/models/mountains.glb', true)
  const { mixer, actions } = useAnimations(animations, group)
  const [cameraActionCurrent, setCameraActionCurrent] = useState()
  const [finalPosition, setFinalPosition] = useState()
  const [finalRotation, setFinalRotation] = useState()

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        setIsAnimationPlaying(newState.isAnimationPlaying)
      },
      (state) => {
        state.isAnimationPlaying !== isAnimationPlaying
      },
    )

    return () => {
      unsubscribe()
    }
  }, [])




  useEffect(() => {
    setCameraActionCurrent(CameraActionRef.current)
  }, [CameraActionRef.current])



  useEffect(() => {
    setContextValue({
      mixer,
      actions,
      setFinalPosition,
      setFinalRotation,
      cameraActionCurrent,
    })
  }, [mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent])

  return (
    <group ref={group} dispose={null} {...props}>
      <group name='Scene'>
        <PerspectiveCamera
          name='Camera1'
          makeDefault={false}
          far={10000}
          near={0.1}
          fov={36.2 + 0}
          position={[-353.93, 88.44, 56.42]}
          rotation={[-0.42, -1.38, -0.41]}
        />
        <PerspectiveCamera
          name='Camera2'
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={36.2}
          position={[-353.93, 88.44, 56.42]}
          rotation={[1.46, -0.69, 1.4]}
        />
        <PerspectiveCamera
          name='Camera3'
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={36.2}
          position={[-119.1, 114.33, 72.58]}
          rotation={[-0.08, -0.74, -0.05]}
        />
        <PerspectiveCamera
          name='Camera4'
          makeDefault={false}
          far={10000}
          near={0.1}
          fov={36.2}
          position={[-99.19, 118.3, 48.1]}
          // position={[-99.19, 5418.3, 48.1]}
          rotation={[-1.62, 0.04, 1.6]}
        />
        <PerspectiveCamera
          name='CameraAction'
          key='CameraAction'
          ref={CameraActionRef}
          makeDefault={true}
          far={1000000}
          near={0.1}
          fov={36.2 + 20}
          position={[-119.1, 114.33, 72.58]}
          rotation={[-0.08, -0.74, -0.05]}
        />

   
        {CameraActionRef.current && finalPosition && finalRotation && !isAnimationPlaying ? (
          <CameraRig finalPosition={finalPosition} finalRotation={finalRotation} camera={cameraActionCurrent} />
        ) : (
          console.log('camerarigdismounted')
        )}

        <mesh
          name='EverestDistant1HD'
          castShadow
          receiveShadow
          geometry={nodes.EverestDistant1HD.geometry}
          position={[-101.24, 48.69, 505.31]}
        >
          {/* <MeshDistortMaterial distort={0.1} speed={6} wireframe={true} emissive={'#fcc600'} /> */}
          <meshStandardMaterial map={materials.DistantMountainMat.map} />
        </mesh>
        <mesh
          name='EverestDistant2HD'
          castShadow
          receiveShadow
          geometry={nodes.EverestDistant2HD.geometry}
          position={[-100.5, 67.3, -555.05]}
        >
          <meshStandardMaterial map={materials.DistantMountainMat.map} />
        </mesh>
        <mesh name='EverestPeakHD' castShadow receiveShadow geometry={nodes.EverestPeakHD.geometry}>
          <meshStandardMaterial map={materials.PeakMountainMat.map} />
        </mesh>
        <mesh name='EverestMidHD' castShadow receiveShadow geometry={nodes.EverestMidHD.geometry}>
          <meshStandardMaterial map={materials.MidMountainMat.map} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/mountains.glb')