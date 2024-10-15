import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, linkWithCredential, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const githubSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,githubProvider);
    }


    const logoutUser = ()=>{
        setLoading(true);
        return signOut(auth)
    }



    const userInfo = {
        user,
        loading,
        loginUser,
        createUser,
        googleSignIn,
        githubSignIn,
        logoutUser,
    }





    useEffect(()=> {
        const unSubscribe =  onAuthStateChanged(auth, currentUser =>{ 
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail}
            setUser(currentUser) 
            setLoading(false);
            // if user exists then issue a taken
            if(currentUser){
               
                axios.post('https://books-library-server-pink.vercel.app/api/jwt', loggedUser, {
                    withCredentials:true })
                    .then(res => {
                        console.log( 'token response',res.data);
                    })
            }           
            else {
                axios.post('https://books-library-server-pink.vercel.app/api/logout', loggedUser, 
                { withCredentials:true })
                .then(res => {
                    console.log(res.data);
                })
            }
            
          })


          return () => {
              unSubscribe();
          }
      },[])
    


    return (
        <AuthContext.Provider value = {userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;