import { useLoader, extend, useFrame } from '@react-three/fiber'
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

extend({ TextGeometry })

export default function HeroText() {
  const ref1 = useRef()
  const ref2 = useRef()
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['HIGH ALTITUDES', 'HOSTILE ENVIRONMENTS'];
  const color  =  '#FCC300' 
  const font = useLoader(FontLoader, '/fonts/brandon_black.json')
  const config = useMemo(() => ({ font, size: 3, height: 0.001, depth: 0 }), [font])

  useLayoutEffect(() => {
    void ref1.current.geometry.center()
    void ref2.current.geometry.center()
  }, [texts])

  useFrame(() => {
    
    ref1.current.position.x -= 0.12
    ref2.current.position.x -= 0.12

    if(ref1.current.position.x < -30 && textIndex === 0) {
      setTextIndex(1);
      ref2.current.position.x = 10
    }
    if(ref2.current.position.x < -30 && textIndex === 1) {
      setTextIndex(0);
      ref1.current.position.x = 10
    }
  })

  return (
    <>
      <mesh ref={ref1} visible={textIndex === 0}>
        <textGeometry args={[texts[0], config]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ref2} visible={textIndex === 1}>
        <textGeometry args={[texts[1], config]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  )
}