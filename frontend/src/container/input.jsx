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
                    onBlur={props.onBlur}
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

            <textarea rows={props.cols ? props.cols : "4"} cols="50"
                type={props.type ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                onChange={props.onChange}
                value={props.value}
                className="  appearance-none text-[14px] focus:outline-none    rounded w-full  px-1 text-black" />
        </div>
    )
}



export function SelectInput(props) {
    let { options, value, onChange, label } = props
    const [data, setData] = useState(options)



    const [searchKey, setSearchKey] = useState('')
    const [typing, setTyping] = useState(true)
    const [typingTimeout, setTypingTimeout] = useState(0)

    // function filterArrayByInput(array, searchText) {
    //     return array.filter(item => {
    //         // Convert both the item value and search text to lowercase for case-insensitive comparison
    //         const itemText = item.label.toLowerCase();
    //         const searchQuery = searchText.toLowerCase();

    //         // Check if the item contains the search text
    //         // setData(itemText.includes(searchQuery))
    //         return;
    //     });
    // }

    function filterArrayByInput(arrayOfObjects, searchText) {
        return arrayOfObjects.filter(object => {
            // Convert the object values to lowercase for case-insensitive comparison
            const objectValues = Object.values(object).map(value => {
                value?.toString()?.toLowerCase()

            });
            // console.table(objectValues(value => value.includes(searchText.toLowerCase())))
            // Check if any object value includes the search text
            return objectValues.some(value => value.includes(searchText.toLowerCase()));
        });
    }
    const changeName = (event) => {


        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setSearchKey(event)

        setTypingTimeout(
            setTimeout(function () {
                filterArrayByInput(options, event)
                setTyping(false)
            }, 1000)
        )

    }

    return (
        <div className='flex flex-col mx-1'>
            <label className="block text-slate-500 capitalize text-sm font-bold mb-1 flex">
                {props.label}{props.required && <span className='text-red-500 flex items-center justify-center w-4 '> * </span>}
            </label>
            {props.search && typing ?

                <input
                    type={props.type ? props.type : "text"} placeholder={props.placeholder} name={props.name}
                    onChange={(e) => changeName(e.target.value)}
                    value={props.value}
                    className="shadow h-10 appearance-none text-[14px] border rounded w-full  px-1 text-black" />
                : <select className="shadow h-10 appearance-none text-[14px] border rounded w-full  px-1 text-black"
                    value={value} onChange={onChange}>
                    {data.map((option) => (
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