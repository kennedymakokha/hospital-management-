import React from 'react'

function Search(props) {
    return (
        <div className='sm:flex hidden h-full   border-slate-300 border justify-center items-center px-2 rounded-md '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
            </svg>
            <input type='text' placeholder={props.placeholder ? props.placeholder : 'Search'} className={`w-96 h-full autofocus text-sm bg-transparent`} />
        </div>
    )
}

export default Search