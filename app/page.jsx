'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const StillCarousel = dynamic(() => import('@/components/canvas/StillCarousel'), { ssr: false })

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const HeroText = dynamic(() => import('@/components/canvas/HeroText'), { ssr: false })

const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const MotionCarousel = dynamic(() => import('@/components/canvas/MotionCarousel'), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='flex w-full flex-col overflow flex-wrap items-center md:flex-row'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start justify-center text-center'>
        <h2>Filmmaker and High Altitude DP</h2>
        </div>
           
      </div>

      <div className='flex w-full flex-col flex-wrap items-center'>
      <div className='flex w-full flex-col items-start justify-center text-center'>
        <View className='flex w-full flex-col items-center justify-center'>
            <Suspense fallback={null}>
              <HeroText route='/blob' scale={0.6} position={[0, 0, 0]} rotation={[0,0,0]}/>
              <Common />
            </Suspense>
          </View>
        </div>
        {/* first row */}
        
        <div className='relative w-full'>
          <View className='relative h-96 w-full'>
            <Suspense fallback={null}>
              <StillCarousel />
            </Suspense>
          </View>
        </div>

        {/* second row */}
        <div className='relative w-full'>
        <View className='relative h-96 w-full'>
            <Suspense fallback={null}>
              <MotionCarousel route='/blob' scale={2} position={[0, 0, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
       

        {/* <div className='relative h-48 w-full sm:w-1/2'>
          <View orbit className='relative h-full animate-bounce sm:h-48 sm:w-full'>
            <Suspense fallback={null}>
              <Duck route='/blob' scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div className='w-full p-6 sm:w-1/2'>
          <h2 className='mb-3 text-3xl font-bold leading-none text-gray-800'>Dom and 3D are synchronized</h2>
          <p className='mb-8 text-gray-600'>
            3D Divs are renderer through the View component. It uses gl.scissor to cut the viewport into segments. You
            tie a view to a tracking div which then controls the position and bounds of the viewport. This allows you to
            have multiple views with a single, performant canvas. These views will follow their tracking elements,
            scroll along, resize, etc.
          </p>
        </div> */}

      </div>
    </>
  )
}
