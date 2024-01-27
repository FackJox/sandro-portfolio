/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 mountains.glb --transform --instanceall 
Files: mountains.glb [1.16MB] > /run/media/jack/401B6F37347316A7/Projects/dev/sandro-new/sandro-portfolio/public/mountains-transformed.glb [1.14MB] (1%)
*/

import React, { useRef, useMemo, useContext, createContext } from 'react'
import { useGLTF, Merged, PerspectiveCamera, useAnimations } from '@react-three/drei'

const context = createContext()
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/mountains-transformed.glb')
  const instances = useMemo(
    () => ({
      EverestDistantHD: nodes.EverestDistant1HD,
      EverestMidHD: nodes.EverestMidHD,
      EverestPeakHD: nodes.EverestPeakHD,
    }),
    [nodes],
  )
  return (
    <Merged meshes={instances} {...props}>
      {(instances) => <context.Provider value={instances} children={children} />}
    </Merged>
  )
}

export function Model(props) {
  const instances = useContext(context)
  const group = useRef()
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <PerspectiveCamera name="CameraAction" makeDefault={false} far={1000} near={0.1} fov={36.2} position={[-353.926, 88.438, 56.419]} rotation={[-0.42, -1.381, -0.413]} />
        <instances.EverestDistantHD name="EverestDistant1HD" position={[-101.238, 48.691, 505.312]} />
        <instances.EverestMidHD name="EverestMidHD" />
        <instances.EverestPeakHD name="EverestPeakHD" />
      </group>
    </group>
  )
}

useGLTF.preload('/mountains-transformed.glb')
