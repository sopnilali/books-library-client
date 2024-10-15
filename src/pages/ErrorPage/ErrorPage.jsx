import React from 'react';
import { Helmet } from 'react-helmet';


const ErrorPage = () => {
    return (
        <>
        <Helmet>
            <title>404 Not Found | Library</title>
        </Helmet>
        <div className='flex justify-center items-center'>
            <img src='../img/404.gif' alt="" />
        </div>
        </>
    );
};

export default ErrorPage;