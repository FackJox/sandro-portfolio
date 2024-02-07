'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { usePrevious } from 'react-use'
import gsap from 'gsap'
import CarouselItem from './StillCarouselItem'
import { lerp, getPiramidalIndex } from '../../helpers/utils'
import images2 from '../data/images'

/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 2.5,
  height: 5,
  gap: 0.5
}

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: 'power3.out'
})

/*------------------------------
Carousel
------------------------------*/
const StillCarousel = ({stillData}, props) => {
  
  const images = stillData
  
  const [$root, setRoot] = useState()
  const $post = useRef()

  const [activePlane, setActivePlane] = useState(null)
  const prevActivePlane = usePrevious(activePlane)
  const { viewport } = useThree()

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

    document.addEventListener('stillcarousel:mousedown', handleMouseDown);
    document.addEventListener('stillcarousel:mouseup', handleMouseUp);
    document.addEventListener('stillcarousel:mousemove', handleMouseMove);
    document.addEventListener('stillcarousel:touchstart', handleTouchStart);
    document.addEventListener('stillcarousel:touchend', handleTouchEnd);
    document.addEventListener('stillcarousel:touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('stillcarousel:mousedown', handleMouseDown);
      document.removeEventListener('stillcarousel:mouseup', handleMouseUp);
      document.removeEventListener('stillcarousel:mousemove', handleMouseMove);
      document.removeEventListener('stillcarousel:touchstart', handleTouchStart);
      document.removeEventListener('stillcarousel:touchend', handleTouchEnd);
      document.removeEventListener('stillcarousel:touchmove', handleTouchMove);
    };
  }, []);
 
  /*--------------------
  Vars
  --------------------*/
  const progress = useRef(0)
  const startX = useRef(0)
  const isDown = useRef(false)
  const speedDrag = -0.3
  const oldProgress = useRef(0)
  const speed = useRef(0)
  const $items = useMemo(() => {
    if ($root) return $root.children
  }, [$root])

  /*--------------------
  Diaplay Items
  --------------------*/
  const displayItems = (item, index, active) => {
    const piramidalIndex = getPiramidalIndex($items, active)[index]
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: $items.length * -0.1 + piramidalIndex * 0.1
    })
  }

  /*--------------------
  RAF
  --------------------*/
  useFrame(() => {

    progress.current = Math.max(0, Math.min(progress.current, 100))

    const active = Math.floor((progress.current / 100) * ($items.length - 1))
    $items.forEach((item, index) => displayItems(item, index, active))
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    )

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1)

    if ($post.current) {
      $post.current.thickness = speed.current
    }
  })


  /*--------------------
  Handle Down
  --------------------*/
  const handleDown = (e) => {
    if (activePlane !== null) return
    isDown.current = true
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
  }

  /*--------------------
  Handle Up
  --------------------*/
  const handleUp = () => {
    isDown.current = false
  }

  /*--------------------
  Handle Move
  --------------------*/
  const handleMove = (e) => {
    if (activePlane !== null || !isDown.current) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX.current) * speedDrag
    progress.current = progress.current + mouseProgress
    startX.current = x
    
  }

  /*--------------------
  Click
  --------------------*/
  useEffect(() => {
    if (!$items) return
    if (activePlane !== null && prevActivePlane === null) {
      progress.current = (activePlane / ($items.length - 1)) * 100 // Calculate the progress.current based on activePlane
    }
  }, [activePlane, $items])

  /*--------------------
  Render Plane Events
  --------------------*/
  const renderPlaneEvents = () => {
    return (
      <mesh
        position={[0, 0, -0.01]}
        
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
         <meshStandardMaterial transparent={true} opacity={0} />      
      </mesh>
    )
  }

  
  /*--------------------
  Render Slider
  --------------------*/
  const renderSlider = () => {
    return (
      <group ref={setRoot}>
        {images.map((item, i) => (
          
          <CarouselItem
            width={planeSettings.width}
            height={planeSettings.height}
            setActivePlane={setActivePlane}
            activePlane={activePlane}
            key={item.src}
            item={item}
            index={i}
          />
        )
  )}
      </group>
    )
  }

  return (
    <group {...props}>
      {renderPlaneEvents()}
      {renderSlider()}
    </group>
  )
}

export default StillCarousel
