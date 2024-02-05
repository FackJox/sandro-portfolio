'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense, useState } from 'react'


const StillCarousel = dynamic(() => import('@/components/canvas/StillCarousel'), { ssr: false })
const HeroText = dynamic(() => import('@/components/canvas/HeroText'), { ssr: false })
const MotionCarousel = dynamic(() => import('@/components/canvas/MotionCarousel'), { ssr: false })
const Sky = dynamic(() => import('@/components/canvas/Sky/Sky'), { ssr: false })
const Mountains = dynamic(() => import('@/components/canvas/Mountains/Mountains'), { ssr: false })





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
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = (e) => {
    const totalScroll = e.target.scrollHeight - e.target.clientHeight;
    const currentScroll = e.target.scrollTop;
    setScrollPercentage((currentScroll / totalScroll) * 100);
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-40">

        <View className="w-full h-full">
          < Suspense fallback={null} >
            <Sky />
            <Mountains scroll={scrollPercentage}/>
            <Common color={['lightblue', 0]} />

          </Suspense >
        </View>
      </div>

      <div className='fixed top-0 left-0 w-screen h-full z-40 overflow-auto' onScroll={handleScroll}>

        <div className='flex flex-col items-center justify-start w-screen bg-transparent z-40'>


          <div className='flex relative w-full h-96 mt-48 '>
            <View className="w-full h-full">
              <Suspense fallback={null}>
                <HeroText scale={0.6} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                <Common color={['lightblue', 0]} />
              </Suspense>
            </View>
          </div>



          <div className='flex items-center w-screen h-48 p-6 bg-black z-40'>
            <p className='font-Poppins text-xl text-yellow text-center bg-transparent z-40'>
              My name is Sandro, I&apos;m a freelance film maker, photographer and part time ski bum.
            </p>
          </div>

          <div className='flex relative w-full h-96 py-6 bg-transparent z-40'>
            <View className='w-full h-full'>
              <Suspense fallback={null}>
                <StillCarousel scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                <Common color={['lightblue', 0]} />

              </Suspense>
            </View>
          </div>


          <div className='flex items-center w-screen h-48 p-6 bg-black'>
            <p className='font-Poppins text-xl text-yellow text-center'>
              I love people, cameras and mountains and have spent the last decade bringing those passions together.
            </p>
          </div>

          <div className='flex relative w-full h-96 bg-transparent z-40'>
            <View className='w-full h-full' >
              <Suspense fallback={null}>
                <MotionCarousel scale={1} position={[0, 0, 1.5]} />
                <Common color={['lightblue', 0]} />
              </Suspense>
            </View>
          </div>

          <div className='flex items-center w-screen h-48 p-6 bg-black z-40'>
            <p className='font-Poppins text-xl text-yellow text-center w-screen bg-transparent z-40'>
              Previous clients include: <br />
              Red Bull TV, Epic TV, Montane, Berghaus, Osprey and North Face
            </p>
          </div>


          <div className='flex items-center justify-center h-96 w-screen p-6  bg-transparent z-40'>
            <div className='flex-col items-center '>
              <p className='text-center text-xl font-bold text-yellow px-4'>
                If your story involves mountains or people, I&apos;d love to help tell it... 
                </p>
            
            </div>
          </div>

          <div className='flex-col items-center justify-center w-screen p-6 pb-32 bg-black z-40'>
            <div className='flex items-center w-full h-full justify-center'>
           
              <p className='text-center text-2xl text-gold py-6 '>
                sandro.gromen-hayes@live.com
              </p>
            </div>

            <div className='flex items-center w-full h-full justify-center '>
            <div className='flex items-center justify-center  '>
              <Link href='https://www.youtube.com/@SandroGH5' rel='noopener noreferrer' target='_blank'>
                <Image src='/icons/yt.svg' alt='youtube' width={64} height={64} className="h-8" />
              </Link>
            </div>
              <div className='flex items-center justify-center'>
              <Link href='https://www.instagram.com/sandro.g.h' rel='noopener noreferrer' target='_blank'>
                <Image src='/icons/insta.svg' alt='instagram' width={64} height={64} className="h-8" />
              </Link>
            </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}