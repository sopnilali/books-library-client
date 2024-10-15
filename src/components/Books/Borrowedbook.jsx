import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';

const Borrowedbook = () => {
  const [Data, setData] = useState(['']);

  const {user} = useAuth();
  console.log(user);

    useEffect(()=> {
      fetch(`https://books-library-server-pink.vercel.app/api/borrow-books?email=${user?.email}`,{
        credentials: "include"
      })
      .then(res => res.json())
      .then(data => setData(data))
    },[])

  

    const handleBorrowDelete = (book)=> {

      
      try{
             
        fetch(`https://books-library-server-pink.vercel.app/api/book-detail/${book.BookId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            qBooks: book.qBooks + 1
          }),
        })
        .then((res) => res.json())
        .then(data => console.log(data))  


      fetch(`https://books-library-server-pink.vercel.app/api/borrow-books/${book._id}`, {
            method: 'DELETE',
        })
      .then((res) => res.json())
      .then(data => {

        if( data.deletedCount > 0 ) {
          toast.success('Borrow Book Returned successfully')
          const remaining = Data.filter(rems => rems._id !== book._id)
          setData(remaining);  
        }
        })

      }
      catch(err) {
        console.log(err);
      }
    }

    return (
        <>
             <Helmet>
      <title>Borrowed Books List  | Library</title>
    </Helmet>
        <div className="max-w-7xl mx-auto">
        <div class="flex flex-col overflow-x-auto">
  <div class="sm:-mx-6  lg:-mx-8">
    <div class="inline-block min-w-full  py-2 sm:px-6 lg:px-8">
      <div class="overflow-x-auto border ">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="bg-neutral-50 border text-center font-medium dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" class="px-6 py-4">Image</th>
              <th scope="col" class="px-6 py-4 ">Name</th>
              <th scope="col" class="px-6 py-4">Category</th>
              <th scope="col" class="px-6 py-4">Borrowed Date</th>
              <th scope="col" class="px-6 py-4">Return Date</th>
              <th scope="col" class="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
          {
      Data.length > 0 ?  Data.map( borrowed => 
      <tr className=" text-center border-b dark:text-white dark:border-neutral-500">
            <td className="capitalize  flex justify-center border-r botft "><Link to={`/book-details/${borrowed?.BookId}`}><img className="w-[50px] py-2" src={borrowed.BookPhoto} alt="" /></Link></td>
            <td className="capitalize border-r text-center"><Link className="hover:text-emerald-600 " to={`/book-details/${borrowed?.BookId}`}>{borrowed?.bookName}</Link></td>
            <td className="capitalize border-r"><Link className="hover:text-emerald-600" to={`/books/${borrowed?.bookCategory}`}>{borrowed?.bookCategory}</Link></td>
            <td className="capitalize border-r">{borrowed?.borrowDate}</td>
            <td className="capitalize border-r">{borrowed?.returnDate}</td>
            <td><button onClick={()=> handleBorrowDelete(borrowed)} className="btn btn-sm md:btn-sm outline-none hover:bg-gray-700 bg-red-600 text-white">Return</button> </td>
          </tr> 

    )
    : <><h2 className="text-xl dark:text-white text-black my-2">Not Available</h2></>
    }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

        </div>
        </>
    );
};

export default Borrowedbook;