import localFont from 'next/font/local'
import React from 'react'

function HOME() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen w-screen'>
          <div className='flex justify-center items-center h-1/2 mb-16'>
            <div className='text-biggie text-white flex items-end '>
              <div className='font-agnes'>n</div>
              <div className='font-alexbrush text-primary'>e</div>
              <div className='text-smallie font-pilowlava text-primary'>X</div>
              <div className='text-smallie font-alexbrush'>u</div>
              <div className='text-smallie font-typefesse text-primary'>S</div>
            </div>
          </div>
          <div className='flex flex-row items-center justify-center h-1/2 w-screen mt-4'>
              <div className='flex flex-col w-1/2 h-full'>
                  <div className='flex items-center justify-end px-2 bg-white text-black h-1/4 text-5xl text-center'>
                    Anonymous research DAO
                  </div>
                  <div className='flex items-center justify-end px-2 bg-secondary text-white h-1/4 text-5xl text-center'>
                    Collaborate with people
                  </div>
                  <div className='bg-white text-black h-1/2'> IMAGE GOES HERE TOO </div>
              </div>
              <div className=' bg-primary w-1/2 h-full'>here's the image</div>
          </div>
      </div>
      <div>kuhruiehi</div>
    </div>
  )
}

export default HOME