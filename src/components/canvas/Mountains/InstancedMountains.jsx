import React, { useRef, useMemo, useContext, createContext, useEffect } from 'react'
import { useGLTF, Merged } from '@react-three/drei'

const context = createContext()
export function InstancesMountains({ children, ...props }) {
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



export function InstancedMountains(visible, props) {
  const instances = useContext(context);
  console.log('InstancedMountains rendering', instances);

  useEffect(() => {
    console.log("model rendering", instances);
  }, [instances]);

  const group = useRef();
  
  instances.needsUpdate = true
  
  return (
    <group ref={group} dispose={null} {...props}>
      {visible && (
        <group name='Scene'>

      <instances.EverestDistantHD name="EverestDistant1HD" position={[-101.238, 48.691, 505.312]} />
        <instances.EverestMidHD name="EverestMidHD" />
        <instances.EverestPeakHD name="EverestPeakHD" />
        </group>
      )}
    </group>
  )
}

useGLTF.preload("/mountains.glb");
