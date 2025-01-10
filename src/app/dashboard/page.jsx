'use client'
import React from 'react'
import AnimatedText from '../components/AnimatedText'
import CurrentProjects from '../components/currentProjects'
import Waddress from './Waddress'

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
            <div className='flex flex-col w-full h-full'>
              <Waddress />
              <CurrentProjects />
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