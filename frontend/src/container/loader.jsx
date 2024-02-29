import React from 'react'
import Loading from './../assets/loading.png'
import './spina.css'
function Loader() {
    return (
        <img className="spin" src={Loading} alt='' />
    )
}

export default Loader