import React from 'react'
import AnimatedText from './AnimatedText'

function CurrentProjects() {
  return (
    <div className='p-4'>
        <AnimatedText text="Current Projects" time="0.5" className="font-cyberalert text-4xl text-yellow-500" customText="日本語組版処理" />
        <ul>
          <AnimatedText text="Project 1" time="1" className="font-helvetica text-2xl text-white" customText="12345" preStyle='font-helvetica text-2xl bg-yellow-500 text-black'/>
          <AnimatedText text="Project 2" time="1" className="font-helvetica text-2xl text-white" customText="12345" preStyle='font-helvetica text-2xl bg-yellow-500 text-black'/>
          <AnimatedText text="Project 3" time="1" className="font-helvetica text-2xl text-white" customText="12345" preStyle='font-helvetica text-2xl bg-yellow-500 text-black'/>
          <AnimatedText text="Project 4" time="1" className="font-helvetica text-2xl text-white" customText="12345" preStyle='font-helvetica text-2xl bg-yellow-500 text-black'/>
        </ul> 
    </div>
  )
}

export default CurrentProjects