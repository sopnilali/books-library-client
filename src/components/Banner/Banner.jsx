import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div
        data-aos="zoom-in"
        data-aos-duration="500"
         className=" dark:bg-slate-800 dark:shadow-slate-500 mx-2 md:min-h-16 hover:shadow-none outline-none shadow-md rounded-md bg-base-200">
  <div className="hero-content mx-10 flex-col lg:flex-row-reverse">
    <img src="https://i.ibb.co.com/w0P2NnX/Stack-books.webp" className="md:max-w-xl rounded-lg " />
    <div>
      <h1 className="text-5xl font-bold dark:text-white">Find Exclusive Range of Books!</h1>
      <div >
      <Link to="/all-books"><button className=" dark:bg-slate-100 dark:text-black mt-5 py-3 rounded-md text-white px-4 text-sm bg-violet-700 outline-none">All Book</button></Link>
      </div>
    </div>
  </div>
</div>
    );
};

export default Banner;