import React from 'react'

const StateContainer = (props) => {
    return (<div className={`${props.height}  ${props.width} ${props.bg} text-center items-center flex `}>
        .
    </div>)
}

export const StateusContainer = (props) => {
    return (
        <div className='flex flex-row gap-x-[3px] items-center '>
            <StateContainer height='text-[20px]' bg="text-secondary-700" width="w-[1px]" />
            <StateContainer height='text-[25px]' bg="text-secondary-600" width="w-[2px]" />
            <StateContainer height='text-[30px]' bg="text-secondary-500" width="w-[3px]" />
            <StateContainer height='text-[35px]' bg="text-secondary-400" width="w-[4px]" />
            <StateContainer height='text-[40px]' bg="text-secondary-300" width="w-[5px]" />
            <StateContainer height='text-[45px]' bg="text-secondary-200" width="w-[6px]" />
            <StateContainer height='text-[50px]' bg="text-secondary-100" width="w-[7px]" />

        </div>
    )
}
function breadCrump() {
    return (
        <div>breadCrump</div>
    )
}

export default breadCrump