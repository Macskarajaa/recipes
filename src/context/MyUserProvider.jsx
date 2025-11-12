import { onAuthStateChanged } from 'firebase/auth/cordova'
import React from 'react'
import { useEffect } from 'react'
import { Children } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const MyUserContext = createContext() //tartály az adatoknak 

export const MyUserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({})

  useEffect(()=>{
      onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser)
      } )
      return ()=>unsubscribe()//leiratkozunk a ki-be jelentkezés figyeléséről
  },[])

  const signUpUser =async (email,password, displayName)=>{
    console.log(email,password,displayName);
      try {
        await createUserWithEmailAndPassword(auth,email,password)
        await updateProfile(auth.currentUser,{displayName})
        await sendEmailVerification(auth.currentUser)
        console.log("email címre egy aktiváló link érkezett!");
        setMsg(prev=>delete prev.err)
        logOutUser()
      } catch (error) {
        setMsg({err:error.message})
        
      }  
  }

  const logOutUser=async()=>{
    await signOut(auth)
    setMsg(prev=> delete prev.err)
  }

  const signInUser= async(email,password)=>{
    try {
      await signInWithEmailAndPassword(auth,email,password)
      const currentUser = auth.currentUser
      if(!currentUser.emailVerified){
        setMsg({err:"Kérlek kattints az aktiváló linkre"})
        logOutUser()
        return
      }
      
      //console.log("Sikeres bejelentkezés");
      setMsg(prev=>delete prev.err)
      setMsg({signIn:true})

    } catch (error) {
      console.log(error);
      setMsg({err:error.message})
      
      
    }
  }


  return (
    <MyUserContext.Provider value={{user, signUpUser, logOutUser,signInUser,msg}}>
      {children}
      </MyUserContext.Provider>

  )
}

