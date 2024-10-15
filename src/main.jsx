import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

     <AuthProvider  >
     <RouterProvider router={Routes} />
     </AuthProvider>
)
