import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { Children } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { auth } from '../firebaseApp'
import { createUserWithEmailAndPassword, deleteUser, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { deleteAvatar, updateAvatar } from '../myBackend'
import { EmailAuthProvider } from 'firebase/auth/web-extension'

export const MyUserContext = createContext() //tartály az adatoknak 

export const MyUserProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({})

  useEffect(()=>{
    const unsubsrcibe = onAuthStateChanged(auth,(currentUser)=>{
      setMsg({})
      setUser(currentUser)
    })
    return ()=>unsubsrcibe()
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

  const resetPassword = async (email)=> {
    let success = false
    try {
      await sendPasswordResetEmail(auth,email)
      setMsg({resetPw:"A jelszó visszaállítási email elküldve!"})
      console.log(msg);
      
      success = true
    } catch (error) {
      setMsg({err:error.message})
    }finally{
      
    }

    console.log(msg);
    
  }

  const avatarUpdate = async (file) => {
    try {
      const uploadResult = await uploadImage(file)
      console.log(uploadResult);
      if(uploadResult?.url) await updateProfile(auth.currentUser,{photoURL:uploadResult.url})
        //el kell tárolni a public_id-t
      await updateAvatar(user.uid, uploadResult.public_id)
        setUser({...auth.currentUser})
        setMsg(null)
        setMsg({updateProfile:"Sikeres profilmódosítás!"})
      
    } catch (error) {
        setMsg({err:error.message})
    }
  }

  const deleteAccount = async (password) => {
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email,password)
      await reauthenticateWithCredential(auth.currentUser,credential)
      await deleteUser(auth.currentUser)
      setMsg(null)
      setMsg({serverMsg:"Felhasználói fiók törölve!"})
    } catch (error) {
      console.log(error);
      if(error.code=="auth/wrong-password") setMsg({err:"Hibás jelszó!"})
      else setMsg({err:"Hiba történt a hiba törlésekor!"})
    }
  }

  const handleDelete = async ()=>{
    if(window.confirm("biztosan ki akarod törölni a felhasználói fiókodat?")){
      const pw=prompt("add meg a jelszavad a törléshez")
      await deleteAvatar(user.uid)
      await deleteAccount(pw)
    }
  }



  


  return (
    <MyUserContext.Provider value={{user, signUpUser, logOutUser,signInUser,msg, avatarUpdate, deleteAccount, handleDelete, resetPassword, setMsg}}>
      {children}
      </MyUserContext.Provider>

  )
}

