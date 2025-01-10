import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <div className='flex flex-row justify-between'>
        <Image
            src="/images/hud/Untitled-1_18.jpg"
            width={300}
            height={300}
            className=' shadow-yellow-500 mix-blend-screen'
        />
        <Image
            src="/images/hud/Untitled-1_15.jpg"
            width={300}
            height={300}
            className=' shadow-yellow-500 mix-blend-screen'
        />
    </div>
  )
}

export default Footer