import React from 'react'
import AnimatedText from './AnimatedText'

function CurrentProjects() {
  return (
    <div className='m-4 w-1/2 flex flex-col items-center'>
        <AnimatedText text="Current Projects" time="0.5" className="py-4 font-cyberalert text-5xl text-yellow-500" customText="日本語組版処理" />
        <ul className='p-4 w-full'>
          <li className='flex justify-between w-full'>
              <AnimatedText text="Project 1" time="1" className="font-helvetica text-3xl text-yellow-500" customText="12345" preStyle='font-helvetica text-3xl bg-yellow-500 text-black'/>
              
              <AnimatedText text="Address 1" time="1" className="font-helvetica text-3xl text-white" customText="12345" preStyle='font-helvetica text-3xl bg-yellow-500 text-black'/>
          </li>
        </ul> 
    </div>
  )
}

export default CurrentProjects