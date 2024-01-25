'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'


export default function Menu({setIsVisible}) {
  const ref = useRef()

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0, duration: 2 } }}
        exit={{ opacity: 0, transition: { delay: 0, duration: 2.5 } }}
        className='ml-auto flex z-40 absolute top-16 right-5 justify-end bg-gray-800 text-icewhite menu '
        onClick={() => setIsVisible(false)}
      >
        <div className='flex-col mr-3 my-3'>
          <div className='flex'>
            <Link href='/'>
              <p className='w-36 py-3  h-8 text-xl text-right text-gold'>ABOUT</p>
            </Link>
          </div>
          <div className='flex'>
            <Link href='/'>
              <p className='w-36 py-2 h-8 text-xl text-right text-icewhite'>CONTACT</p>
            </Link>
          </div>
          <div className='flex'>
            <Link href='/'>
              <p className='w-36 py-1 h-8 text-xl text-right  text-gold'>PORTFOLIO</p>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
