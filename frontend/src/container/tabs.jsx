import React from 'react'
import TitleContainer from './titleContainer'

function Tab(props) {
    return (
        <div className='p-1 mb-4'>
            <div className='flex h-10 gap-x-1 w-full bg-slate-100 border'>
                {props.data.map((menu, i) => (
                    <div key={i} className={`h-full w-1/2 rounded-md  text-slate-100 `}>
                        <div onClick={() => props.onChange(menu.title)} className={`h-full capitalize  text-[15px] rounded-md w-full p-1 drop-shadow-md flex items-center justify-center  ${menu.state === true ? "bg-slate-500" : "bg-slate-600"} `}>
                            {menu.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const TabContainer = (props) => {
    return (<>
        {props.tab.title === props.tab1 && props.tab.state && <>
            <div className=' p-1 py-3'>
                <TitleContainer title={props.title} />
                {props.body}
            </div>
        </>}
    </>
    )

}

export default Tab