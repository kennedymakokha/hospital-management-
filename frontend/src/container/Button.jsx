import React from 'react'

function Button(props) {
    return (
        <div
            onClick={props.onClick}
            className={`${props.width ? `w-${props.width}` : "w-28"} ${props.height ? `h-${props.height}` : "h-8"}
        ${props.primary && "bg-[#007bff]"}
        ${props.right && "float-right"}
        ${props.left && "float-left"}
        ${props.secondary && "text-white"}
        ${props.secondary && "bg-secondary-100"}
        ${props.danger && "bg-[#dc3545]"}
        "bg-[#007bff]"
          flex items-center mt-2 justify-center shadow-xl rounded-md uppercase text-slate-100 text-sm font-bold gap-x-1 px-3 py-2`}>
            {props.icon}
            {props.title}
        </div>
    )
}
export function ButtonSM(props) {
    return (
        <div
            onClick={props.onClick}
            className={`  h-5
         ${props.primary && "bg-[#007bff] border-primary-100"}
         ${props.outline && "bg-transparent border border-primary-100 text-black"}
         ${props.secondary && "bg-[#6c757d] border-primary-100"}
         ${props.danger && "bg-[#dc3545] border-primary-100"}
        
          flex items-center justify-center shadow-xl rounded-md  text-[10px] font-bold px-3 py-2`}>{props.title}</div>
    )
}
export default Button