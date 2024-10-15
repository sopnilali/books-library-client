import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()

    if(loading){
        return <span className="loading loading-spinner "></span>
    }

    else if (user) {
        return children;
    }


    return ( 
        toast.warning('Please login first!!'),
        <ToastContainer></ToastContainer>,
    <Navigate to="/login"></Navigate>
    
    );
};

export default PrivateRoutes;