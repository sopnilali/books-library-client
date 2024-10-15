import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useId, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBook = () => {

    const booksdetails = useLoaderData()
    
    const [CategoryData, setCategoryData] = useState([])

    axios.get('https://books-library-server-pink.vercel.app/api/book-category')
    .then(res => setCategoryData(res.data))

    const handleUpdateBook = (event) => {
        event.preventDefault();
        const form = event.target
        const bookName = form.bookName.value
        const bookCategory = form.bookCategory.value
        const qBook = form.qBook.value
        const qBooks = parseInt(qBook)
        const author_name = form.author_name.value
        const rating = form.rating.value
        const ratings = parseFloat(rating)
        const photoUrl = form.photoUrl.value
        const shortDes = form.shortDes.value
        const bookData = {bookName, bookCategory, qBooks, author_name, ratings, photoUrl, shortDes}
        console.log(bookData);
        

    fetch(`https://books-library-server-pink.vercel.app/api/book-details/${booksdetails._id}`, {
          method: 'PUT',
          headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(bookData)
          })
          .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount == 1) {
  
              toast.success('Book updated successfully')
            }
            else if(data.modifiedCount == 0){
              toast.warning('Book already updated!!')
            }
          }
        )
    
      }
    return (
        <div className="max-w-7xl mx-auto">
            <div className=" mt-5 border my-3 outline-none rounded-lg  ">
  <div className=" flex-col py-2 my-5 ">
    <div className="text-center my-4 ">
      <h1 className="text-5xl font-bold text-center my-4 dark:text-white">Update Books</h1>
    </div>
    <div className="card  w-full  bg-base-100">
      <form onSubmit={handleUpdateBook} className="card-body dark:bg-slate-800">
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white"> Name</span>
          </label>
          <input type="text" placeholder="Enter Name" defaultValue={booksdetails?.bookName} name='bookName' className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Book Category</span>
          </label>
            <select className='input input-bordered' name="bookCategory">
            <option  disabled selected className="capitalize ">Select Category</option>
            {
              CategoryData.map((BookCategory) =>
              <option className="capitalize " defaultValue={BookCategory.Category_Name}  >{BookCategory.Category_Name}</option>
              )
            }
            </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Quantity of the book</span>
          </label>
          <input type="number" placeholder="Enter Quantity.." defaultValue={booksdetails?.qBooks} name='qBook' className="input input-bordered outline-none" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Author Name</span>
          </label>
          <input type="text" placeholder="Author Name..." defaultValue={booksdetails?.author_name} name='author_name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white"> Photo URL</span>
          </label>
          <input type="text" placeholder="Enter Photo URL" defaultValue={booksdetails?.photoUrl} name='photoUrl' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Rating</span>
          </label>
            <Rating className='rating' name="rating" defaultValue={booksdetails?.ratings} precision={0.5} size="large" />
        </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Short Description</span>
          </label>
          <textarea className="textarea textarea-bordered" defaultValue={booksdetails?.shortDes} name='shortDes' placeholder="Enter Short Details..."></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral capitalize text-lg dark:border-none dark:outline-none dark:bg-white dark:text-black">Update Book</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>

    );
};

export default UpdateBook;