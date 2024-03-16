import logo from './../assets/logibg.png';

import { useState } from 'react';
import IconCounterContainer from './IconCounterContainer';
import Button from './Button';
import MenuItem from './MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Search from './search';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import { useLogoutMutation } from '../features/slices/usersApiSlice';
import { logout } from '../features/slices/authSlice';
import { Menus } from './menuData.jsx';
// import  {}

function Layout(props) {
    const [open, setOpen] = useState(true)

    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch()


    const LogOutHandler = async () => {
        await logoutApiCall().unwrap()
        dispatch(logout({ id: userInfo.id, token: localStorage.getItem('token') }))
        navigate('/')
    }
    return (
        <div className='flex h-auto  min-h-screen flex-col'>
            <div className='flex h-auto min-h-screen '>
                <div className={`${open ? "sm:w-72 w-20" : "w-20"} duration-300 p-5 pt-8  bg-slate-600 relative`}>
                    {open ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="sm:flex hidden w-6 h-6 absolute cursor-pointer -right-3 top-9 border-2 border-primary-100  rounded-full  bg-slate-100"
                        onClick={() => setOpen(!open)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="sm:flex hidden w-6 h-6 absolute cursor-pointer -right-3 top-9 border-2 border-primary-100  rounded-full  bg-slate-100"
                            onClick={() => setOpen(!open)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>}

                    <div className='flex gap-x-4 items-center flex-col'>
                        <img src={logo} alt='' className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>
                            HMS
                        </h1>
                    </div>
                    <ul className='pt-6'>
                        {Menus.map((menu, i) => (
                            <Link key={i} to={menu.path}>
                                {menu?.roles.map(element => {
                                    if (element === userInfo?.role) {
                                        return (
                                            <li key={i} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer
                                        p-2 hover:text-slate-600 hover:bg-primary-100 rounded-md ${menu.gap ? "mt-9" : "mt-2"} ${i === 0 && "bg-primary-100"}`}>
                                                {menu.src}
                                                <span className={`${!open && "hidden"}  origin-left duration-200`}> {menu.title}</span>
                                            </li>)
                                    }
                                })}
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="p-7  text-2xl font-semibold flex-1 bg-gray-100 sm:w-full w-2/3">
                    <div className='sm:h-14 mb-4 h-10 w-full bg-primary-100 shadow-md rounded-[6px] flex justify-center items-center '>
                        <div className='sm:h-10 h-6 w-full sm:px-5 px-1  flex space-between '>
                            <div className=' h-full w-full sm:w-[70%] sm:flex hidden  flex items-between  justify-between'>
                                <Search />
                                <div className='flex h-10 items-center gap-x-3  px-5  '>
                                    <IconCounterContainer count={10} icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-100">
                                        <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                                        <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                                    </svg>} />
                                    <IconCounterContainer count={1} icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-slate-100">
                                        <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                                        <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                                    </svg>} />
                                </div>
                            </div>
                            <div className='flex h-full w-full  sm:w-[30%]    items-between '>

                                <div className='flex  w-full h-full bg-white  justify-between px-2 rounded-md '>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="sm:flex hidden sm:h-10 h-6 sm:w-10 w-6 text-slate-300">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" sm:hidden flex  text-slate-300 w-6 h-6">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>

                                    <div className="   lg:max-w-sm">
                                        <Dropdown title={` ${userInfo?.name}`}
                                            items={[
                                                { title: "profile", fun: () => navigate(`/profile`) },
                                                { separator: true, title: "Log Out", fun: () => { LogOutHandler(); console.log("Logout") } }
                                            ]}
                                        />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
            {/* <div className='flex h-screen w-screen -z-10 bg-slate-100 '></div> */}
        </div>
    );
}

export default Layout;
