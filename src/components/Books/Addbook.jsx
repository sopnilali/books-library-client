import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import useAuth from '../../hooks/useAuth';

const Addbook = () => {

  const { user } = useAuth()

  const [CategoryData, setCategoryData] = useState([])
  console.log(CategoryData);

  useEffect( ()=> {
    fetch('https://books-library-server-pink.vercel.app/api/book-category', {
    })
    .then(res => res.json())
    .then(data => setCategoryData(data))
  },[])

  const handleAddBook = (event) => {
    event.preventDefault();
    const form = event.target
    const bookName = form.bookName.value
    const email = user.email
    const bookCategory = form.bookCategory.value
    const qBook = form.qBook.value
    const qBooks = parseInt(qBook)
    const author_name = form.author_name.value
    const rating = form.rating.value
    const ratings = parseFloat(rating)
    const photoUrl = form.photoUrl.value
    const bookPDF = form.bookpdf.value
    const shortDes = form.shortDes.value
    const bookData = {bookName, bookCategory, email, qBooks, author_name, ratings, photoUrl,bookPDF, shortDes}
    console.log(bookData);

try {
  axios.post("https://books-library-server-pink.vercel.app/api/books", bookData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  .then(data => {
    form.reset()
    console.log(data);
    if(data.data.acknowledged == true) {

      toast.success('Added Book successfully')
    }
  }
)
  ;
} catch (error) {
  console.log(error);
}

  }

  
  return (
    <>
    <Helmet>
      <title>Add Book Data | Library</title>
    </Helmet>
        <div className="max-w-7xl mx-auto ">

            <div className=" mt-5 border dark:border-none outline-none rounded-lg  ">
  <div className=" flex-col py-2 my-5 ">
    <div className="text-center my-4 ">
      <h1 className="text-5xl font-bold text-center my-4 dark:text-white">Add New Product</h1>
    </div>
    <div className="card dark:bg-slate-800 dark:border dark:shadow-md  w-full  bg-base-100">
      <form onSubmit={handleAddBook} className="card-body ">
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white"> Name</span>
          </label>
          <input type="text" placeholder="Enter Name" name='bookName' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Book Category</span>
          </label>
            <select className='input input-bordered' name="bookCategory" id="">
            <option  disabled selected className="capitalize ">Select Category</option>
            {
              CategoryData.map(BookCategory =>
              <option className="capitalize " value={BookCategory.Category_Name}>{BookCategory.Category_Name}</option>
              )
            }
            </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Quantity of the book</span>
          </label>
          <input type="number" placeholder="Enter Quantity.." name='qBook' className="input input-bordered outline-none" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Author Name</span>
          </label>
          <input type="text" placeholder="Author Name..." name='author_name' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white"> Photo URL</span>
          </label>
          <input type="text" placeholder="Enter Photo URL" name='photoUrl' className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Rating</span>
          </label>
            <Rating className='rating ' name="rating" defaultValue={1} precision={0.5} size="large" />
        </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white">Short Description</span>
          </label>
          <textarea className="textarea textarea-bordered" name='shortDes' placeholder="Enter Short Details..."></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text dark:text-white"> PDF URL</span>
          </label>
          <input type="text" placeholder="PDF URL" name='bookpdf' className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral capitalize text-lg dark:bg-slate-100 dark:text-black dark:outline-none dark:border-none">Add Book</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
        </>
    );
};

export default Addbook;