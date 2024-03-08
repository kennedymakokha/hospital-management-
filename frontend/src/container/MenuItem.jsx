import React from 'react'
import { Link } from 'react-router-dom'

function MenuItem(props) {
    return (
        <div className='flex h-40 sm:w-1/3 w-full  p-2'>
            <Link to={props.item.path} className='flex h-full w-full bg-primary-100 items-center justify-center  rounded-md '>
                <div className='flex items-center justify-center flex-col '>
                    <div className='w-10 h-10 items-center justify-center border border-1 flex border-slate-300 rounded-full shadow-3xl shadow-inner'>
                        {props?.item?.src}
                    </div>
                    <div className='flex h-full text-slate-500 sm:text-[20px] text-[16px] font-semibold items-center justify-center'>
                        {props?.item?.title}
                    </div>
                </div>

            </Link>
        </div>
    )
}

export default MenuItem