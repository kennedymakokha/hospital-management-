import React, { useState } from 'react'
import { callAPI } from '../helpers'

function InputContainer(props) {
    return (
        <div className='flex flex-col mx-1'>
            <label className="block text-slate-500 capitalize text-sm font-bold mb-1 flex">
                {props.label}{props.required && <span className='text-red-500 flex items-center justify-center w-4 '> * </span>}
            </label>
            {props.type === "radio" ? props.referal ?
                <input
                    type={props.type ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                    className="shadow h-10 appearance-none text-[14px] border rounded w-full  px-1 text-black" /> : <div className='flex w-full gap-x-2 px-1'>
                    < input type="radio" name="name1" value="value1"
                        className='float-left flex text-[14px] border rounded  text-black' />
                    <span className='block text-black text-sm  mb-1 flex'>{props.label}</span>
                </div> :
                <input
                    type={props.type ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                    className="shadow h-10 appearance-none text-[14px] border rounded w-full  px-1 text-black" />}
        </div>
    )
}

export function TextArea(props) {
    return (
        <div className='flex flex-col mx-1'>
            <label className="block text-slate-500 capitalize text-sm font-bold mb-1 flex">
                {props.label}{props.required && <span className='text-red-500 flex items-center justify-center w-4 '> * </span>}
            </label>

            <textarea rows="4" cols="50"
                type={props.type ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                onChange={props.onChange}
                value={props.value}
                className="shadow  appearance-none text-[14px] border rounded w-full  px-1 text-black" />
        </div>
    )
}



export function SelectInput(props) {
    const { options, value, onChange, label } = props
    const [typing, setTyping] = useState(true)
    var newArray = (value) => options.filter(function (el) {
        return el.name === value

    });
    const startTyping = async (value) => {
        if (value.length === 3) {
            setTyping(!typing)

        }

    }

    return (
        <div className='flex flex-col mx-1'>
            <label className="block text-slate-500 capitalize text-sm font-bold mb-1 flex">
                {props.label}{props.required && <span className='text-red-500 flex items-center justify-center w-4 '> * </span>}
            </label>
            {props.search && typing ?
            
                <input
                    type={props.type ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                    onChange={(e) => startTyping(e.target.value)}
                    value={props.value}
                    className="shadow h-10 appearance-none text-[14px] border rounded w-full  px-1 text-black" />
                : <select className="shadow h-10 appearance-none text-[14px] border rounded w-full  px-1 text-black"
                    value={value} onChange={onChange}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            }

        </div>

    )
}
export function Input({ objValue, onChange, index }) {
    const { label, type, value } = objValue;
    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <div className="input">
                <input
                    type={type || "text"}
                    id={label}
                    value={value || ""}
                    onChange={(e) => onChange(e, index)}
                />
            </div>
        </div>
    );
}


export default InputContainer