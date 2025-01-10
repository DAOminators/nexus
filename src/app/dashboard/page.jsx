'use client'
import React from 'react'
import AnimatedText from '../components/AnimatedText'
import CurrentProjects from '../components/currentProjects'
import Waddress from './Waddress'
import Footer from './footer'
import Image from 'next/image'
import TransitionLink from '../components/TransitionLink'
import TransitionAnimated from '../components/TransitionAnimated'

function Dashboard() {
  return (
    <div className='m-5'>
        <div className='flex flex-col w-full'>
          <div className="flex items-center">
            {/* <p>+</p> */}
            <div className="top-0 h-line w-[95vw] bg-white mx-auto"></div>            {/* <p>+</p> */}
          </div>
          <div className='h-[95vh] flex flex-row justify-between items-center'>
            <div className='flex flex-col items-center justify-between'>
              <p>+</p>
              <div className="left-0 h-[90vh] w-line bg-white"></div>
              <p>+</p>
            </div>
            <div className='flex flex-col w-full h-full justify-between'>
              <Waddress />
              <div className="flex justify-between">
                <CurrentProjects />
                <div className="">
                  <div className="relative cursor-pointer">
                    <Image
                      src="/images/hud/button.jpg"
                      width={300}
                      height={300}
                      className='shadow-yellow-500 mix-blend-screen'
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <TransitionAnimated 
                        href="/home" 
                        className="text-yellow-500 text-2xl font-sddystopian font-bold" 
                        label="NEW PROJECT" 
                        time={1} 
                        preStyle=""
                      />
                    </div>
                  </div>
                  <div className="relative cursor-pointer">
                    <Image
                      src="/images/hud/button.jpg"
                      width={300}
                      height={300}
                      className='shadow-yellow-500 mix-blend-screen'
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <TransitionAnimated 
                        href="/home" 
                        className="text-yellow-500 text-2xl font-sddystopian font-bold" 
                        label="JOIN A PROJECT" 
                        time={1} 
                        preStyle=""
                      />
                    </div>
                  </div>
                  <div className="relative cursor-pointer">
                    <Image
                      src="/images/hud/button.jpg"
                      width={300}
                      height={300}
                      className='shadow-yellow-500 mix-blend-screen'
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <TransitionAnimated 
                        href="/marketplace" 
                        className="text-yellow-500 text-2xl font-sddystopian font-bold" 
                        label="MARKETPLACE" 
                        time={1} 
                        preStyle=""
                      />
                    </div>
                  </div>
                    
                  
                </div>
              </div>
              <Footer />
            </div>
            <div className='flex flex-col items-center justify-between'>
              <p>+</p>
              <div className="left-full h-[90vh] w-line bg-white"></div>
              <p>+</p>
            </div>
          </div>
          <div className="flex">
            {/* <p>+</p> */}
          <div className="top-full h-line w-[95vw] bg-white mx-auto"></div>
            {/* <p>+</p> */}
          </div>
        </div>
    </div>
  )
}

export default Dashboard