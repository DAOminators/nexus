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
            <div className='bg-white text-black h-1/2 flex items-center justify-center'>
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 mix-blend-hue"></div>
                <Image
                  src="/images/home/rotate.gif"
                  alt="Rotating GIF"
                  width={500}
                  height={500}
                  className='object-contain'
                />
              </div>
            </div>
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
            <div className='flex items-center justify-end px-2 my-3 bg-white text-black h-1/4 text-7xl text-right'>
              Sell your Research
            </div>
            <div className='flex items-center justify-start px-2 my-3 bg-secondary text-white h-1/4 text-7xl text-left'>
              Fair Contributions
            </div>
            <div className='flex items-center justify-end px-2 my-3 bg-white text-black h-1/4 text-7xl text-right'>
              Decentralized Code Sharing
            </div>
            <div className='flex items-center justify-start px-2 my-3 bg-secondary text-white h-1/4 text-7xl text-left'>
              Single Monorepo
            </div>
            <div className='flex items-center justify-end px-2 my-3 bg-white text-black h-1/4 text-7xl text-right'>
              NFT papers
            </div>
            <div className='flex items-center justify-start px-2 my-3 bg-secondary text-white h-1/4 text-7xl text-left'>
              Entirely in Solidity
            </div>
            <div className='flex items-center justify-end px-2 my-3 bg-white text-black h-1/4 text-7xl text-right'>
              All Web3
            </div>
            <div className='flex items-center justify-start px-2 my-3 bg-secondary text-white h-1/4 text-7xl text-left'>
              Secure Researh
            </div>
            <p className='p-4 w-1/2 bg-white text-black text-2xl'>
            We built a Research DAO that changes how people collaborate on  research. It’s simple, secure, and fair. 
            <br />
            <br />
    
            In our platform, anyone can contribute to research without  fear of being exposed, sabotaged, or having their ideas  stolen. A monorepo keeps everything organized and tracks   contributions transparently, while identities stay private.
    
            <br />
            <br />
            When the research is complete, it’s turned into an NFT—a  digital badge of ownership. Contributors get credit and can  sell their work or earn from it, all without middlemen.
    
            <br />
            <br />
            We’ve created a space where research is open, safe, and   rewarding. A world where ideas thrive, and the people behind  them get what they deserve.

            </p>
              <div className="flex justify-between">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 mix-blend-hue"></div>
                <Image
                  src="/images/home/hand.png"
                  alt="Rotating GIF"
                  width={500}
                  height={500}
                  className='object-contain '
                />
              </div>

                <div className='flex justify-end'>
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500 mix-blend-hue"></div>
                    <Image
                      src="/images/home/internet.png"
                      alt="Rotating GIF"
                      width={500}
                      height={500}
                      className='object-contain'
                    />
                  </div>
                </div>
              </div>
      <div className='h-[150vh] z-50 bg-yellow-500 text-black text-center flex flex-col items-center justify-between'>
        <div></div>
        <div></div>
        <div></div>

        <TransitionLinkno className="font-sddystopian text-9xl cursor-pointer" href="/dashboard" label="JOIN NOW" />
        <TransitionLinkno className="font-sddystopian text-9xl cursor-pointer" href="/dashboard" label="JOIN NOW" />
        <TransitionLinkno className="font-sddystopian text-9xl cursor-pointer" href="/dashboard" label="JOIN NOW" />
      </div>
      <Footer />
    </div>
  )
}

export default HOME