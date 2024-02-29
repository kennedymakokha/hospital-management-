import React from 'react'
import underline from './../assets/underline.png'

function TitleContainer(props) {
    return (
        <div className='w-full flex  items-center justify-center py-2 flex-col'>
            <h2 className='text-center text-slate-500 font-bold'>{props.title}</h2>
            <img src={underline} className='py-1' alt='' />
        </div>
    )
}


export const MetaDatacontainer = (props) => (
    <h1 className='font-bold text-sm  p-2 text-slate-600'>{props.title}:<span className='font-semibold  px-2'>{props.value}</span></h1>
)
export default TitleContainer