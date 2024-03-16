import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

// function PrivateRoute() {
//     const { userInfo } = useSelector(state => state.auth)
//     if (!userInfo) {
//         return <Navigate to="/landing" replace />;
//     }

//     return children;
//     ;

// }

const ProtectedRoute = ({ children, roles }) => {
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
        if (!roles.includes(userInfo?.role)) {
            navigate("/403");
        }

    }, [userInfo])

    return (<>{children}</>)


}

export default ProtectedRoute