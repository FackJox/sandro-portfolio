'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Sky as DaySky } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import NightSky from './NightSky'

import { animateFogColor, hexToRgb } from '@/helpers/colours'

export default function Sky() {
  const [sunPosition, setSunPosition] = useState([])
  const [sunRotating, setSunRotating] = useState(true)
  const [showNightSky, setShowNightSky] = useState(true)
  const [fogColour, setFogColor] = useState(0x4a3f40)
  const [dayNightCycle, setDayNightCycle] = useState(true)
  const [sunCycle, setSunCycle] = useState(false)
  const [wireMesh, setWireMesh] = useState(false)
  const prevSunCycleRef = useRef(null)
  const localSunCycleRef = useRef(new THREE.Vector3(-353.93, 88.44, 56.42))

  const toggleDayNightCycle = async () => {
    setDayNightCycle(sunCycle)

    while (localSunCycleRef.current.y >= -100) {
      await new Promise((resolve) => {
        setTimeout(resolve, 750)
      })
    }

    setSunRotating(!sunRotating)
    console.log('day night status', dayNightCycle)
  }

  const initialSunPos = new THREE.Vector3(-353.93, 88.44, 56.42).clone().add(new THREE.Vector3(0, -1000, 0))

  useEffect(() => {
    setSunPosition(initialSunPos.toArray())
  }, [])

  const distanceFromCenter = 450000
  const sunCentre = new THREE.Vector3(-353.93, 88.44, 56.42)
  const orbitAxis = new THREE.Vector3(-(180 * Math.PI) / 180, (90 * Math.PI) / 180, (180 * Math.PI) / 180)
  const speed = 0.06

  useFrame(() => {
    if (wireMesh) {
      setSunPosition(initialSunPos.toArray())
    }

    if (sunPosition.length > 0 && sunRotating) {
      const prevSunPos = new THREE.Vector3().fromArray(sunPosition)
      const nextSunPos = prevSunPos
        .clone()
        .sub(sunCentre)
        .applyAxisAngle(orbitAxis, (speed * Math.PI) / 180)
        .add(sunCentre)

      if (dayNightCycle || initialSunPos.distanceTo(nextSunPos) > 1) {
        localSunCycleRef.current = nextSunPos
        setSunPosition(nextSunPos.toArray())
      }
    }
  })

  useEffect(() => {
    const currentCondition = localSunCycleRef.current.y < 1
    if (prevSunCycleRef.current === currentCondition) {
      return
    }

    const startColor = currentCondition ? 0x808080 : 0x4a3f40
    const endColor = currentCondition ? 0x4a3f40 : 0x808080

    animateFogColor(hexToRgb(startColor), hexToRgb(endColor), 5500, setFogColor)

    prevSunCycleRef.current = currentCondition
  }, [localSunCycleRef.current])

  useEffect(() => {
    if (localSunCycleRef.current.y < -100) {
      setShowNightSky(true)
      // setSunRotating(false)
    } else {
      setShowNightSky(false)
    }
  }, [localSunCycleRef.current])

  return (
    <>
      <directionalLight intensity={0.2} position={sunPosition} />
      <fogExp2 attach='fog' color={fogColour} density={0.0016} />
      {showNightSky && <NightSky />}
      <DaySky
        azimuth={0.25}
        turbidity={1.5}
        rayleigh={0.5}
        elevation={-20000}
        inclination={0}
        distance={distanceFromCenter}
        sunPosition={sunPosition}
      />
    </>
  )
}