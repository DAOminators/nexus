'use client'
import localFont from 'next/font/local'
import React from 'react'
import ErtdfgcvbBG from '../components/ErtdfgcvbBG'
import Image from 'next/image'
import { Papers } from '../components/3Dcomponent'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import TransitionLink from '../components/TransitionAnimated'
import TransitionLinkno from '../components/TransitionLink';
import Footer from '../components/footer'

TransitionLink
function HOME() {
  return (
    <div>
      <nav className="z-50 mix-blend-difference fixed w-full px-2 font-helvetica flex flex-row place-items-center justify-between">
        <h1>
            <TransitionLink href="/home" label="HOME" />
        </h1>
        <ul className="flex flex-row space-x-5">
            <li>
                <TransitionLink href="/about" label="About" />
            </li>
            <li>
                <TransitionLink href="/dashboard" label="Try it Out" />
            </li>
        </ul>
      </nav>
      <div className="w-full h-full fixed z-40">
        <Canvas className='w-full h-full'>
          <Environment preset="sunset" />
          <Papers />
        </Canvas>
      </div>
      <ErtdfgcvbBG />
      <div className='flex flex-col items-center justify-center h-screen w-screen z-1'>
        <div className='flex justify-center items-center h-1/2 mb-16'>
          <div className='text-biggie text-white flex items-end mix-blend-difference z-50'>
            <div className='font-agnes'>n</div>
            <div className='font-alexbrush text-yellow-500'>e</div>
            <div className='text-smallie font-pilowlava text-yellow-500'>X</div>
            <div className='text-smallie font-alexbrush'>u</div>
            <div className='text-smallie font-typefesse text-yellow-500'>S</div>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center h-1/2 w-screen mt-4 z-1'>
          <div className='flex flex-col w-1/2 h-full'>
            <div className='flex items-center justify-end px-2 bg-white text-black h-1/4 text-5xl text-center'>
              Anonymous research DAO
            </div>
            <div className='flex items-center justify-end px-2 bg-secondary text-white h-1/4 text-5xl text-center'>
              Collaborate with people
            </div>
            <div className='bg-white text-black h-1/2'> IMAGE GOES HERE TOO </div>
          </div>
          <div className=' bg-yellow-500 w-1/2 h-full text-black'>
            <Image
              src="/images/home/drawing.jpg"
              width={750}
              height={750}
              className=' shadow-yellow-500'
            />
          </div>
        </div>
      </div>
      <div className='h-[150vh]'>kuhruiehi</div>
      <div className='h-[150vh] z-50 bg-yellow-500 text-black text-center flex flex-col items-center justify-between'>
        <div></div>
        <TransitionLinkno className="font-sddystopian text-9xl cursor-pointer" href="/dashboard" label="JOIN NOW" />
      </div>
      <Footer />
    </div>
  )
}

export default HOME