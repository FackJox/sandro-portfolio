'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const StillCarousel = dynamic(() => import('@/components/canvas/StillCarousel'), { ssr: false })
const HeroText = dynamic(() => import('@/components/canvas/HeroText'), { ssr: false })
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
    <div className='flex flex-col items-center w-screen overflow-auto justify-start'> 
      <div className='flex items-center mb-4 sm:mb-8 w-full h-2/6'> 
        <p className='font-Poppins text-lg sm:text-xl md:text-2xl text-yellow text-center'>
          My name is Sandro, I&apos;m a freelance film maker, photographer and part time ski bum.
        </p>
      </div>

      <div className='w-screen '> 
        <div className='relative w-screen'> 
        <View className='w-full h-screen'>
            <Suspense fallback={null}>
              <HeroText route='/blob' scale={0.6} position={[0, 0, 0]} rotation={[0,0,0]}/>
              <Common />
            </Suspense>
          </View>
        </div>
        <div className='flex items-center mb-4 sm:mb-8 w-screen h-2/6'> 
          <p className='font-Poppins text-lg sm:text-xl md:text-2xl text-yellow px-4 sm:px-8 md:px-16 text-center'>
            I love people, cameras and mountains and have spent the last decade bringing those passions together.
          </p>
        </div>

        <div className='relative w-screen'> 
        <View className='w-full h-screen'>
            <Suspense fallback={null}>
              <StillCarousel />
              <Common />

            </Suspense>
          </View>
        </div>
        <div className='flex items-center mb-4 sm:mb-8 w-screen h-2/6'> 
          <p className='font-Poppins text-lg sm:text-xl md:text-2xl text-yellow px-4 sm:px-8 md:px-16 text-center'>
            In between I worked on Netflix&apos;s &apos;14 Peaks&apos; as a high altitude DP and produced climbing
            content for Red Bull TV, Epic TV, Montane, Berghaus and Osprey.
          </p>
        </div>
        <div className='relative w-screen'>
          <View className='w-full h-screen'>
            <Suspense fallback={null}>
              <MotionCarousel route='/blob' scale={2} position={[0, 0, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>

        <div className='flex items-center mb-4 sm:mb-8 w-screen h-screen'>
        <p className='font-Poppins text-lg sm:text-xl md:text-2xl text-yellow px-4 sm:px-8 md:px-16 text-center w-screen'>
            In 2018 I filmed the first Afghan woman as she summited Noshaq, the countries highest peak. In 2022 I flew a
            drone over K2 as the first Pakistani woman reached the top.
          </p>
        </div>

        <div className='flex flex-col items-center justify-center h-screen w-screen'> 
          <div className='h-1/4 w-screen'></div> 

          <div className='h-1/2 grid grid-cols-1 grid-rows-5 place-items-center w-screen'> 
            <div className='flex items-center col-span-1 row-start-2'>
              <p className='w-screen text-center text-5xl md:text-6xl font-bold text-syellow'>CONNECT</p>
            </div>
            
            <div className='flex items-center col-span-1 row-start-3 pt-8 md:pt-0 w-screen'>
              <p className='text-center text-xl md:text-4xl text-syellow px-4 w-screen'>
                If your story involves mountains or people, I&apos;d love to help tell it.
              </p>
            </div>

            <div className='flex items-center col-span-1 row-start-4 w-screen'>
              <p className='text-center text-xl md:text-4xl font-medium uppercase text-yellow w-screen'>
                sandro.gromen-hayes@live.com
              </p>
            </div>
            <div className='flex items-center row-start-5 w-screen justify-center'>
              <Link href='https://www.youtube.com/@SandroGH5' rel='noopener noreferrer' target='_blank'>
                <Image src='/img/contact/yt.svg' alt='youtube' width={62} height={62} />
              </Link>
            </div>

            <div className='flex items-center row-start-5 w-screen justify-center'>
              <Link href='https://www.instagram.com/sandro.g.h' rel='noopener noreferrer' target='_blank'>
                <Image src='/img/contact/insta.svg' alt='instagram' width={62} height={62} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}