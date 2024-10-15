import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Header from '../components/Header/Header';
import Mainlayout from '../components/layout/Mainlayout';
import Addbook from '../components/Books/Addbook';
import AllBooks from '../components/Books/AllBooks';
import SingleBooks from '../components/Books/SingleBooks';
import BookDetails from '../components/Books/BookDetails';
import UpdateBook from '../components/Books/UpdateBook';
import Login from '../pages/Login/Login';
import Borrowedbook from '../components/Books/Borrowedbook';
import Home from '../pages/Home/Home';
import ReadBook from '../pages/ReadBook/ReadBook';
import PrivateRoutes from './PrivateRoutes';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Register from '../pages/Register/Register';

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: '/',
          element:<Home/>,
          errorElement:<ErrorPage/>
        },
        {
            path: '/add-book',
            element:<PrivateRoutes><Addbook/></PrivateRoutes>, // private
            errorElement:<ErrorPage/>
        },
        {
            path: '/all-books/',
            element:<AllBooks/>,
            errorElement:<ErrorPage/>,
        },
        {
            path: '/books/:cname',
            element:<SingleBooks/>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://books-library-server-pink.vercel.app/api/books/${params?.cname}`)
        },
        {
            path: '/book-details/:id',
            element:<PrivateRoutes><BookDetails/></PrivateRoutes>, // private
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://books-library-server-pink.vercel.app/api/book-details/${params?.id}`)
        },
        {
            path: '/books-update/:id',
            element:<PrivateRoutes><UpdateBook/></PrivateRoutes>,
            errorElement:<ErrorPage/>,
            loader:({params})=> fetch(`https://books-library-server-pink.vercel.app/api/book-details/${params?.id}`)
        },
        {
            path: '/borrow-books/',
            element:<PrivateRoutes><Borrowedbook/></PrivateRoutes>, // private
            errorElement:<ErrorPage/>,
            loader:()=> fetch(`https://books-library-server-pink.vercel.app/api/borrow-books/`)
        },
        {
          path: '/login',
            element:<Login/>,
            errorElement:<ErrorPage/>,
        },
        {
          path: '/register',
            element:<Register/>,
            errorElement:<ErrorPage/>,
        }
      ]
    },
    {
      path:"/read-book/:id",
      element:<ReadBook/>,
      loader:({params})=> fetch(`https://books-library-server-pink.vercel.app/api/book-details/${params.id}`)
    }
  ]);

export default Routes;