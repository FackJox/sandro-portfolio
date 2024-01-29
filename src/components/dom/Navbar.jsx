'use client'
import Link from "next/link"
import Image from 'next/image'

export function Navbar() {

  return (
    <>
      <nav className='fixed z-50 flex items-center h-10 md:h-14 justify-between w-full no-underline bg-black select-none'>
        <div className='ml-3 md:ml-6 flex pb-2 items-center justify-center'>
          <Link href='/' className=''>
            <p className='text-2xl md:text-3xl font-bold text-gold'>sandro gh</p>
          </Link>
        </div>

        <div className="flex items-end justify-end m-3 md:m-6 ">
        <div className='flex items-center w-full h-full justify-center'>
          <Link href='https://www.youtube.com/@SandroGH5' rel='noopener noreferrer' target='_blank'>
            <Image src='/icons/yt.svg' alt='youtube' width={32} height={32} className="h-5"/>
          </Link>
        </div>

        <div className='flex items-center w-full h-full ml-2 md:ml-4 justify-center'>
          <Link href='https://www.instagram.com/sandro.g.h' rel='noopener noreferrer' target='_blank'>
            <Image src='/icons/insta.svg' alt='instagram' width={32} height={32} className="h-5"/>
          </Link>
        </div>
        </div>
      </nav>
    </>
  )
}
