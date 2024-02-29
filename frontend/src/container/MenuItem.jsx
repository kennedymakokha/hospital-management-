import React from 'react'
import { Link } from 'react-router-dom'

function MenuItem(props) {
    return (
        <div className='flex h-40 sm:w-1/3 w-full  p-2'>
            <div className='flex h-full w-full bg-slate-400  rounded-md '>
                <div className='flex h-full items-center text-slate-100 justify-center w-1/3'>
                    <div className='w-10 h-10 items-center justify-center border border-1 flex border-slate-300 rounded-full shadow-2xl shadow-inner'>{props?.item?.src}</div>
                </div>
                <Link to={props.item.path}> <div className='flex h-full text-slate-100 sm:text-[20px] text-[16px] font-semibold items-center justify-center w-1/3'>
                    {props?.item?.title}
                </div></Link>
                <div className='flex h-full items-center justify-center w-1/3'>
                    {props?.item?.count}
                </div>
            </div>
        </div>
    )
}

export default MenuItem