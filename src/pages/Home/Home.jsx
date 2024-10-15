import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import axios from 'axios';
import HomeBooks from './HomeBooks';
import { Helmet } from 'react-helmet';
import BookReview from '../CustomerReview/CustomerReview';
import CustomerReview from '../CustomerReview/CustomerReview';

const Home = () => {


    const [CategoryData, setCategoryData] = useState([])
    
    // axios.get('https://books-library-server-pink.vercel.app/api/book-category').then(res => setCategoryData(res.data))
    
    useEffect( ()=> {
        fetch('https://books-library-server-pink.vercel.app/api/book-category', {
        })
        .then(res => res.json())
        .then(data => setCategoryData(data))
      },[])
    
    return (
        <div className='max-w-7xl mx-auto'>
            <Helmet>
                <title>Latest Books in the World | Library Home Page </title>
            </Helmet>
                  <Banner/>
        <div className='grid grid-cols-1 '>
            <div className='my-5'>
                <div className='relative'>
                <h2 className=' text-3xl font-semibold mt-4  dark:text-white text-center'>Book Category </h2>
                </div>
                <div  className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-4 my-4 items-center">
                {
                    CategoryData.map(Category => <>
                    <div 
                    data-aos="flip-left"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1000" 
                    
                    className='border dark:text-white hover:shadow-none  shadow-md rounded-md px-2 py-2'>
                       <Link to={`/books/${Category.Category_Name}`}><img className='scale-90 w-full rounded-lg transition-all' src={Category.Category_Image} alt="" /></Link>
                       <h2 className=' text-lg text-center capitalize'>{Category.Category_Name}</h2>
                       <div className='flex justify-center'><Link to={`/books/${Category.Category_Name}`}><button className=' btn btn-sm btn-neutral dark:hover:btn-accent dark:hover:text-white hover:btn-secondary border-none my-2 dark:text-black text-white hover:text-white dark:bg-slate-50  rounded-2xl outline-none capitalize'>Explore</button></Link></div>
                       
                </div>
                
                    </>)
                }
                </div>

            </div>
        </div>
        <h2 className='text-2xl text-center font-semibold  dark:text-white'>Top Popular Books</h2>
        <HomeBooks/>
    <CustomerReview/>
        </div>
    );
};

export default Home;