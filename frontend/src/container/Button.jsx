import React from 'react'

function Button(props) {
    return (
        <div
            onClick={props.onClick}
            className={`${props.width ? `w-${props.width}` : "w-28"} ${props.height ? `h-${props.height}` : "h-8"}
        ${props.primary && "bg-[#007bff]"}
        ${props.secondary && "bg-[#6c757d]"}
        ${props.danger && "bg-[#dc3545]"}
        "bg-[#007bff]"
          flex items-center justify-center shadow-xl rounded-md uppercase text-slate-100 text-sm font-bold gap-x-1 px-3 py-2`}>
            {props.icon}
            {props.title}
        </div>
    )
}
export function ButtonSM(props) {
    return (
        <div
            onClick={props.onClick}
            className={` w-10 h-5
         ${props.primary && "bg-[#007bff]"}
         ${props.secondary && "bg-[#6c757d]"}
         ${props.danger && "bg-[#dc3545]"}
         "bg-[#007bff]"
          flex items-center justify-center shadow-xl rounded-md text-slate-100 text-[10px] font-bold px-3 py-2`}>{props.title}</div>
    )
}
export default Button