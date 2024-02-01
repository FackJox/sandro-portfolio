'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'


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
    
   <></>
   
    // <div className='flex flex-col items-center w-screen h-screen overflow-auto justify-start bg-transparent'> 

    //    <div className='w-screen bg-transparent'> 
   
    //     <div className='relative w-screen py-6 bg-transparent'> 
    //     <View className='w-full h-48 bg-transparent'>
    //         <Suspense fallback={null}>
    //           <HeroText route='/blob' scale={0.6} position={[0, 0, 0]} rotation={[0,0,0]}/>
    //           <Common color={['lightblue', 0]} />
    //         </Suspense>
    //       </View>
    //     </div>
    //     <div className='flex items-center w-screen h-24 p-6 bg-transparent'> 
    //       <p className='font-Poppins text-md text-yellow text-center bg-transparent'>
    //       My name is Sandro, I&apos;m a freelance film maker, photographer and part time ski bum.
    //       </p>
    //     </div>

    //     <div className='relative w-screen py-6 bg-transparent'> 
    //     <View className='w-full h-48 bg-transparent'>
    //         <Suspense fallback={null}>
    //           <StillCarousel />
    //           <Common color={['lightblue', 0]} />

    //         </Suspense>
    //       </View>
    //     </div>
    //     <div className='flex items-center w-screen h-24 p-6 bg-transparent'> 
    //       <p className='font-Poppins text-md text-yellow text-center bg-transparent'>
    //       I love people, cameras and mountains and have spent the last decade bringing those passions together.
    //       </p>
    //     </div>

    //     <div className='relative w-screen py-6 bg-transparent'>
    //       <View className='w-full h-48 bg-transparent'>
    //         <Suspense fallback={null}>
    //           <MotionCarousel scale={2} position={[0, 0, 0]} />
    //           <Common color={['lightblue', 0]} />
    //         </Suspense>
    //       </View>
    //     </div>

    //     <div className='flex items-center w-screen h-24 p-6 bg-transparent'>
    //     <p className='font-Poppins text-md text-yellow text-center w-screen bg-transparent'>
    //         Previous clients include: <br/>
    //         Red Bull TV, Epic TV, Montane, Berghaus, Osprey and North Face
    //       </p>
    //     </div>

    //     <div className='flex flex-col items-center justify-center h-24 w-screen p-6 bg-transparent'> 
        
                        
    //         <div className='flex items-center w-screen bg-transparent'>
    //           <p className='text-center text-md text-yellow px-4 w-screen bg-transparent'>
    //             If your story involves mountains or people, I&apos;d love to help tell it. <br/>
    //             sandro.gromen-hayes@live.com
    //           </p>
    //         </div>

  
          
    //     </div>
    //   </div> 
    // </div>  
  )
}