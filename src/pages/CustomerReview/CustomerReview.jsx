import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerReview = () => {

    const [customerData, setCustomerData] = useState([])
    console.log(customerData);

    useEffect( ()=> {
        fetch('https://books-library-server-pink.vercel.app/api/customer-review')
        .then(res => res.json())
        .then(data => setCustomerData(data))
    },[])

    return (
        <>
        <div class="py-4  mx-auto max-w-screen-xl ">
    <div class="mx-auto max-w-screen-sm text-center mb-8">
        <h2 class="mb-2 text-3xl lg:text-4xl tracking-tight font-semibold text-gray-900 dark:text-white">Customer Review</h2>
    </div> 
    <div class="grid gap-4 mx-2 lg:grid-cols-3">
        {
            customerData.map(review => 
                <article 
              data-aos="flip-right"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              
              class=" p-6 hover:shadow-none bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
               <div className='flex justify-center item-center'>
                <div className='flex  justify-center'>
                <div className='my-10 mx-4 w-36 '>  
                    <img src={review.reviewer_image} alt="" />
                    <h2 class=" text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white ">{review?.reviewer_name}</h2>
                </div>
               <div>
              
               </div>
               <div className='flex items-center'>
                  <p class="font-light text-gray-500 dark:text-gray-400">{review.reviewer_description.slice(0,180)}</p>
               </div>
                </div>
               
               
               </div>
                <div class="flex justify-between items-center -my-4 mb-1">
                      <div>
                      </div>

                </div>
              </article> 
                
                )
        }
                 
              
    </div>  
</div>  
      </>
    );
};

export default CustomerReview;