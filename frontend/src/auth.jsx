import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation, } from './features/slices/usersApiSlice';
import { setCredentials } from './features/slices/authSlice';
import logo from './assets/logibg.png';
import { toast } from 'react-toastify';
import logo1 from './assets/blood.gif'
function Auth(props) {
    const [showpass, setShowpass] = useState(false)
    const [reg, setReg] = useState(false)
    const [user, setUser] = useState({
        phone: "",
        email: "",
        password: "",
        name: '',
        confirmpassword: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation();
    const [register] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth)
    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    })
    const changeInput = async (e) => {
        const { name, value } = e.target

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const submitHandler = async (e) => {
        e.preventDefault()
        const { email, password } = user
        try {
            if (!reg) {
                const res = await login({ email, password, token: localStorage.getItem('token') }).unwrap();
                dispatch(setCredentials({ ...res }))
                props.setLogin(true)
            } else {
                console.log("registering")
                const res = await register(user).unwrap();
                setReg(!reg)
                toast.success('User Created succesfully ')

            }
        } catch (error) {
            toast.error(error?.data?.message || error.message)

        }

    }
    const InputItem = (props) => {
        console.log(props.value)
        return (
            < div className='flex flex-col' >
                <span className='text-[18px] font-semibold text-slate-100'>{props.label}:</span >
                <div className='w-full flex bg-slate-100 justify-center items-center px-2 shadow-2xl rounded-md'>
                    <input type={props.type}
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        value={props.value}
                        name={props.name}
                        className={`bg-slate-100 ${props.type === "password" ? "w-[95%]" : "w-[100%]"} h-[40px] px-2 shadow-2xl rounded-md`} />
                    {props.type === "password" && showpass && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>}
                    {props.type === "password" && !showpass && <svg
                        onClick={() => { setShowpass() }}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    }
                </div>

            </div >
        )
    }
    return (
        <div className='flex h-screen w-screen '>
            <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
                <div className="bg-gray-400 w-full  h-full relative z-0">
                    <p className="italic text-bold  font-serif">Map</p>
                    <div className="absolute h-3/4 flex flex-col h-3/4 bg-white rounded-[25px] inset-[10%] flex justify-center items-center z-10">
                        <div className='w-full h-[10%] bg-primary-100 items-center px-4 justify-between  flex  border-b-4 rounded-t-[25px]  border-b-blue-300 '>
                            <div className='flex items-center'>
                                <img src={logo} alt='' className={`cursor-pointer duration-500 h-10 w-10  hover:rotate-[360deg]`} />
                                <span className="text-slate-100 font-bold sm:text-2xl">Diabetes Center</span></div>
                            <div className='flex gap-x-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" text-slate-100 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                                <span className='font-semibold text-slate-100'>Support</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-row   h-[90%]  rounded-b-[25px]  '>
                            <div className='w-full h-full flex  rounded-b-[25px]'>
                                <div className='sm:w-1/2 w-full h-full flex items-center justify-center bg-primary-100 sm:rounded-bl-[25px] sm:rounded-b-[0] rounded-b-[25px] '>
                                    <div className='p-4 w-3/4 h-full flex flex-col   '>
                                        <h2 className='text-xl text-slate-100 uppercase text-center font-bold p-4   '>{!reg ? "Login in" : "Register Doctor"}</h2>
                                       
                                        {reg && <div className='flex flex-col'>
                                            <span className='text-[18px] font-semibold text-slate-100'>Name:</span >
                                            <div className='w-full flex bg-slate-100 justify-center items-center px-2 shadow-2xl rounded-md'>
                                                <input type='text'
                                                    onChange={changeInput}
                                                    placeholder="placeholder"
                                                    value={user.name}
                                                    name='name'
                                                    className={`bg-slate-100 h-[40px] w-[100%] px-2 shadow-2xl rounded-md`} />

                                            </div>
                                        </div>}
                                        <div className='flex flex-col'>
                                            <span className='text-[18px] font-semibold text-slate-100'>Email:</span >
                                            <div className='w-full flex bg-slate-100 justify-center items-center px-2 shadow-2xl rounded-md'>
                                                <input type='email'
                                                    onChange={changeInput}
                                                    placeholder="Email"
                                                    value={user.email}
                                                    name='email'
                                                    className={`bg-slate-100 h-[40px] w-[100%] px-2 shadow-2xl rounded-md`} />

                                            </div>
                                        </div>
                                        {reg && <div className='flex flex-col'>
                                            <span className='text-[18px] font-semibold text-slate-100'>Phone Number:</span >
                                            <div className='w-full flex bg-slate-100 justify-center items-center px-2 shadow-2xl rounded-md'>
                                                <input type='numeric'
                                                    onChange={changeInput}
                                                    placeholder="Phone Number"
                                                    value={user.phone}
                                                    name='phone'
                                                    className={`bg-slate-100 h-[40px] w-[100%] px-2 shadow-2xl rounded-md`} />

                                            </div>
                                        </div>}
                                        < div className='flex flex-col' >
                                            <span className='text-[18px] font-semibold text-slate-100'>Password:</span >
                                            <div className='w-full flex bg-slate-100 justify-center items-center px-2 shadow-2xl rounded-md'>
                                                <input type={!showpass ? "text" : 'password'}
                                                    onChange={changeInput}
                                                    value={user.password}
                                                    name="password"
                                                    className={`bg-slate-100 w-[95%] h-[40px] px-2 shadow-2xl rounded-md`} />
                                                {showpass ? <svg onClick={() => { setShowpass(!showpass) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg> : <svg
                                                    onClick={() => { setShowpass(!showpass) }}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                                }
                                            </div>


                                        </div >
                                        {reg && <div className='flex flex-col' >
                                            <span className='text-[18px] font-semibold text-slate-100'>confirm Password:</span >
                                            <div className='w-full flex bg-slate-100 justify-center items-center px-2 shadow-2xl rounded-md'>
                                                <input type={!showpass ? "text" : 'password'}
                                                    onChange={changeInput}
                                                    value={user.confirmpassword}
                                                    name="confirmpassword"
                                                    className={`bg-slate-100 w-[95%] h-[40px] px-2 shadow-2xl rounded-md`} />
                                                {showpass ? <svg onClick={() => { setShowpass(!showpass) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg> : <svg
                                                    onClick={() => { setShowpass(!showpass) }}
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>}
                                            </div>
                                        </div >}
                                        <div className='w-full flex-col flex items-center justify-center '>
                                            <div onClick={(e) => submitHandler(e)} className='w-1/2 h-10 shadow-3xl items-center justify-center flex rounded-md  bg-blue-300 hover:bg-slate-300 my-5'>
                                                <span className='text-xl font-semibold uppercase'>{!reg ? "Login" : "Register"}</span>
                                            </div>
                                            <h2 className='text-slate-300' onClick={() => setReg(!reg)}>{!reg && "Register"}</h2>
                                        </div>

                                    </div>

                                </div>
                                <div className='w-1/2 h-full sm:flex hidden  items-center justify-center p-3 '>
                                    <img src={logo1} className='w-full h-full' alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth