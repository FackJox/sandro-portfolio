'use client'
import React, { useRef, useMemo, useContext, createContext, useEffect } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()
export function InstancesMountains({ children, rotation, position, ...props}) {
  console.log("🚀 ~ Instances ~ position:", position)
  console.log("🚀 ~ Instances ~ rotation:", rotation)
  const { nodes } = useGLTF('/mountains.glb')

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
      {(instances) => (
        <context.Provider value={instances}>
          {children}
          </context.Provider>
      )}
    </Merged>
  );
}



export function InstancedMountains({ visible, rotation, position, scale, ...props }) {
  const instances = useContext(context);

  useEffect(() => {
    if (group.current) {
      group.current.rotation.set(...rotation);
      group.current.position.set(...position);
      group.current.scale.set(...scale);

    }
  }, [rotation, position]);

  const group = useRef();

  return (
    <group ref={group} dispose={null} {...props}>
      {visible && (
        <group name='Scene'>
          <instances.EverestDistantHD name="EverestDistant1HD" position={[-101.238, 48.691, 505.312]} frustumCulled={false} />
          <instances.EverestMidHD name="EverestMidHD" frustumCulled={false} />
          <instances.EverestPeakHD name="EverestPeakHD" frustumCulled={false} />
        </group>
      )}
    </group>
  );
}

useGLTF.preload("/mountains.glb");
