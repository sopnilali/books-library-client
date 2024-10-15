import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import AOS from 'aos'; 
import 'aos/dist/aos.css';

const Mainlayout = () => {

    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <div className='max-w-7xl mx-auto text-black dark:bg-slate-800'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Mainlayout;