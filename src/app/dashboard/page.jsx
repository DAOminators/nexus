import React from 'react'

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
              <div className="flex flex-col items-center justify-between">
                  <h5 className="font-cyberalert text-5xl text-yellow-500">WALLET ADDRESS</h5>
                  <p className="text-3xl font-cyberalert">0x1234567890</p>
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