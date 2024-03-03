import React from 'react'
import underline from './../assets/underline.png'
import { ButtonSM } from './Button'

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

export const TriageItem = (props) => {

    return (
        <div className='w-1/4 px-1 flex-col flex h-full '>
            <div className={`w-full h-[100px] flex items-center justify-center  flex-col 
        ${props.symbol === 'mm Hg' && props.lowerValue < 80 && props.upperValue < 120 && "bg-[#a6ce39]"}
        ${props.symbol === 'mm Hg' && props.lowerValue < 80 && props.upperValue > 120 && props.upperValue < 129 && "bg-[#ffec00]"}
        ${props.symbol === 'mm Hg' && props.lowerValue < 89 && props.lowerValue > 80 && props.upperValue > 130 && props.upperValue < 199 && "bg-[#ffb600]"}
        ${props.symbol === 'mm Hg' && props.lowerValue > 90 && props.upperValue > 140 && "bg-[#ba3a02] ,animate-blinkingBg"}
        ${props.symbol === 'mm Hg' && props.lowerValue > 120 && props.upperValue > 190 && "bg-[#990711] animate-blinkingBg"}
         bg-white inner-shadow shadow-sm rounded-md`}>
                <p className='font-bold text-sm '>{props.symbol === 'mm Hg' ? <>{props.lowerValue}/{props.upperValue}</> : props.value} {props.symbol}</p>
                <h2 className='text-center text-slate-500 capitalize text-sm  font-bold'>{props.title}</h2>
            </div>
        </div >)
}
export const UserItem = (props) => {

    return (
        <div className='w-1/4 px-1 flex-col flex h-full shadow-xl'>
            <div className={`w-full h-[100px] flex items-center justify-center  flex-col  bg-white inner-shadow shadow-sm rounded-md`}>
                <h2 className='text-center text-slate-500 capitalize text-sm  font-bold'>{props.title}</h2>
                <p className='font-bold text-sm '> {props.value}</p>
                <ButtonSM  onClick={props.onClick} primary title={props.buttontitle} />
            </div>
        </div >)
}
export default TitleContainer