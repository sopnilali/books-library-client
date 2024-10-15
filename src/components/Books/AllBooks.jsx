import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';

const AllBooks = () => {

    const {user} = useAuth();

    const [allbooks, setAllbooks] = useState([])

    useEffect( ()=> {
        fetch(`https://books-library-server-pink.vercel.app/api/all-books`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setAllbooks(data))
    },[])

    const handleFilter = ()=> {
        const reamings = allbooks.filter(data => data.qBooks > 0 )
        setAllbooks(reamings);
    }

 
    const handleDeleteBook = (id) => {
        console.log("delete book", id)
        fetch(`https://books-library-server-pink.vercel.app/api/books/${id}`, {
            method: 'DELETE',
        })
      .then((res) => res.json())
      .then(data => {

        if( data.deletedCount > 0 ) {
          toast.success('Books Deleted successfully')
          const remaining = allbooks.filter(rems => rems._id !== id)
          setAllbooks(remaining);  
        }
        })
    }

    return (
        <>
        <Helmet>
      <title>All Books and Available Book | Library</title>
    </Helmet>
        <div className='flex justify-center'>
        <button onClick={handleFilter} className='btn btn-sm dark:text-black dark:bg-green-300 dark:outline-none dark:border-none'>Filter (Available books)</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 mx-2 lg:grid-cols-4 gap-2 my-4 '>
        
                        {
                            allbooks.map(books => 
                                <div data-aos="flip-left" data-aos-duration="1000" className='border hover:shadow-none shadow-md rounded-md mt-4  '>
                                <div className='hover:underline'>
                                <Link to={`/book-details/${books?._id}`}> <img className='scale-90 h-72 w-full transition-all mt-4' src={books?.photoUrl} alt="" title="" /></Link>
                                <Link to={`/book-details/${books?._id}`}><h2 className='text-center scale-90 text-xl dark:text-white font-semibold'>{books?.bookName}</h2></Link>
                                </div>
                                <div>
                                <h2 className='text-center -mt-3 dark:text-white'><br /><span className='font-semibold'>Author Name</span> : {books?.author_name}</h2>
                                <h2 className='text-center mt-3 dark:text-white'> <span className='font-semibold '>Category:</span> {books?.bookCategory}  </h2>
                                </div>
                                <div className='flex justify-center my-3'>
                                <Rating className='rating' name="rating " defaultValue={books?.ratings} precision={0.5} readOnly />
                                <p className='mx-4'>{books?.ratings ? books?.ratings : '0'}</p>
                                </div>
                                 <div className='flex flex-col md:flex-row gap-4  mb-5 mt-2 items-center justify-center'>
                                 <Link to={`/books-update/${books?._id}`}><button className='border  w-full hover:shadow capitalize rounded-md md:px-3 py-2 mx-2 md:mx-2 dark:bg-zinc-600 dark:hover:bg-zinc-300 dark:hover:text-black bg-violet-600 hover:bg-violet-800 text-white'>Update</button></Link>
                                {user ?  <button onClick={()=> handleDeleteBook(books._id)} className='border  hover:shadow capitalize rounded-md md:px-3 py-2 mx-2 md:mx-2 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-white bg-red-600 hover:bg-red-800 text-white'>Delete</button>:  <button disabled className='border  hover:shadow capitalize rounded-md md:px-3 py-2 mx-2 md:mx-2 dark:bg-red-500 dark:hover:bg-red-400 dark:hover:text-white bg-red-600 hover:bg-red-800 text-white'>Delete</button>}
                                 </div>
                                </div>   
                                
                            )
                        }
                   
        </div>
        </>
    );
};

export default AllBooks;