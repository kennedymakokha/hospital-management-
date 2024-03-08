import React from 'react'

function IconCounterContainer(props) {
    return (
        <div className=" flex justify-center items-center">
            <div className="  relative z-0">
                {props.icon}
                <div className="absolute -top-2  -right-2 flex justify-center items-center z-10">
                    <span className='h-4 w-4 flex items-center justify-center rounded-full bg-slate-100 text-[8px]'>{props.count}</span>
                </div>
            </div>
        </div>
    )
}

export default IconCounterContainer