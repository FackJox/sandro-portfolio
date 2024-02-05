// https://cydstumpel.nl/

import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import { easing } from 'maath'
import '../../helpers/utils'


function Rig(props) {
  const ref = useRef()
  const isDown = useRef(false)
  const startX = useRef(0)
  const progress = useRef(0)
  const speedDrag = 0.01


  useEffect(() => {
    const handleMouseDown = (event) => {
      handleDown(event.detail);
    };
    const handleMouseUp = (event) => {
      handleUp();
    };
    const handleMouseMove = (event) => {
      handleMove(event.detail);
    };
    const handleTouchStart = (event) => {
      handleDown(event.detail);
    };
    const handleTouchEnd = (event) => {
      handleUp();
    };
    const handleTouchMove = (event) => {
      handleMove(event.detail);
    };

    document.addEventListener('motioncarousel:mousedown', handleMouseDown);
    document.addEventListener('motioncarousel:mouseup', handleMouseUp);
    document.addEventListener('motioncarousel:mousemove', handleMouseMove);
    document.addEventListener('motioncarousel:touchstart', handleTouchStart);
    document.addEventListener('motioncarousel:touchend', handleTouchEnd);
    document.addEventListener('motioncarousel:touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('motioncarousel:mousedown', handleMouseDown);
      document.removeEventListener('motioncarousel:mouseup', handleMouseUp);
      document.removeEventListener('motioncarousel:mousemove', handleMouseMove);
      document.removeEventListener('motioncarousel:touchstart', handleTouchStart);
      document.removeEventListener('motioncarousel:touchend', handleTouchEnd);
      document.removeEventListener('motioncarousel:touchmove', handleTouchMove);
    };
  }, []);

  const handleDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handleUp = () => {
    isDown.current = false;
  };

  const handleMove = (e) => {
    if (!isDown.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseProgress = (x - startX.current) * speedDrag;
    progress.current += mouseProgress;
    startX.current = x;
  };

  useFrame((state, delta) => {
    ref.current.rotation.y = progress.current; // Rotate contents based on mouse drag
    state.events.update() // Raycasts every frame rather than on pointer-move
    // easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta) // Move camera
    // state.camera.lookAt(0, 0, 0) // Look at center
  })
  return <group ref={ref} {...props} />
}

function Carousel({ radius = 1.4, count = 8 }) {


  

  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${Math.floor(i % 10) + 1}_.jpg`}
      position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
  })
  return (
    <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  )
}

export default function MotionCarousel (props) {

  return (
    <group {...props}>

    <Rig rotation={[0, 0, 0.15]}>
      <Carousel />
    </Rig>
    </group>
  )
}