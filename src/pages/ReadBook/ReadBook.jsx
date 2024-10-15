import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';

const ReadBook = () => {


    const bookdescription = useLoaderData()
    console.log(bookdescription);
    const {bookName, author_name,bookPDF} = bookdescription
    return (
        <>        
        <Helmet>
            <title>Read {bookName} | Library</title>

        </Helmet>
       
        <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between'>
            <div>
            <h2 className='text-xl md:text-3xl  font-medium dark:text-white'>{bookName}</h2>
            <p className='text-lg md:text-xl dark:text-white'>By {author_name}</p>
            </div>
            <div className='dark:text-white'>
            <Link to="/">Back to Home</Link>
            </div>
            </div>
            <div>
            <object className='w-full  md:w-full h-screen md:h-screen' data={bookPDF} type="application/pdf" ></object>
            <p className='py-2 dark:text-white text-lg'>Unable to display PDF file. <a className='hover:link-warning' href={bookPDF}>Download</a> instead.</p>
            </div>
            
        </div>
        </>
    );
};

export default ReadBook;