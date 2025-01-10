import localFont from 'next/font/local'
import React from 'react'

function HOME() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
        <div className='flex justify-center items-center h-1/2'>
          <div className='text-biggie text-primary flex'>
            <div className='font-agnes'>N</div>
            <div className='font-alexbrush'>e</div>
            <div className='font-pilowlava'>X</div>
            <div className='font-budmojiggler'>U</div>
            <div className='font-abril'>S</div>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center h-1/2 w-screen'>
            <div className='flex flex-col w-1/2'>
                <div className='bg-foreground text-black'> DESC-1 </div>
                <div className=''> DESC-2 </div>
                <div className='bg-white text-black'> IMAGE GOES HERE TOO </div>
            </div>
            <div className='w-1/2'>here's the image</div>
        </div>
    </div>
  )
}

export default HOME