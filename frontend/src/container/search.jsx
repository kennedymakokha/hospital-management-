import React, { useState } from 'react'





function Search(props) {
    const [searchKey, setSearchKey] = useState('')
    const [typing, setTyping] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState(0)
    const changeName = (event) => {
        const self = this;

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setSearchKey(event.target.value)
        setTyping(false)
        setTypingTimeout(
            setTimeout(function () {
                console.log(searchKey)

            }, 5000)
        )

    }
    return (
        <div className='sm:flex hidden h-[40px]   border-slate-300 border bg-slate-100 justify-between items-center px-2 rounded-md '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
            <input type='text'
                onChange={changeName}
                placeholder={props.placeholder ? props.placeholder : 'Search'}
                className={`w-[95%] h-full focus:outline-none text-sm bg-slate-100`} />
        </div>
    )
}

export default Search