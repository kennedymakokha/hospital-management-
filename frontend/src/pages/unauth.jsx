import React from 'react'
import SVG from './../assets/Unauthorized.gif'
function UnAnauth() {
    return (
        <div className='flex items-center justify-center bg-[#b9b2b2] h-screen w-screen'>
            <img src={SVG} alt='' />
        </div>
    )
}

export default UnAnauth