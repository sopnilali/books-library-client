import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import { Helmet } from 'react-helmet';

const Login = () => {

  const { loginUser} = useAuth()
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value
    console.log(email, password);
    e.target.reset();
    
    loginUser(email, password)
    .then(result => {
      setTimeout(() => {
        toast.success("Login successful!!")
      }, 200);
      navigate('/') 
      console.log(result.user);
    })
    .catch(err => {
      toast.warning(err.message);
    })

  }

    return (
        <div>
               <Helmet>
      <title>All Books and Available Book | Library</title>
    </Helmet>
              <section className="">
      <div className="h-full">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleLogin}>
            <h2 className="text-4xl my-3 font-semibold dark:text-white"> Login Now!!</h2>
              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                name="email"
                label="Email address"
                size="lg"
                className="mb-6"
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                name='password'
                className="mb-6"
                size="lg"
              ></TEInput>

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                  type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Login
                  </button>
                </TERipple>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold dark:text-white">
                  Don't have an account?{" "}
                  <Link to='/register' className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">Register</Link>
                </p>
                              {/* <!-- Separator between social media sign in and email/password sign in --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>
              <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default Login;