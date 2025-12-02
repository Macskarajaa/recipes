import {
  onAuthStateChanged,  createUserWithEmailAndPassword,  deleteUser,  reauthenticateWithCredential,  sendEmailVerification,  sendPasswordResetEmail,  signInWithEmailAndPassword,  signOut,  updateProfile,
  EmailAuthProvider
} from 'firebase/auth'

import React, { useEffect, useState, createContext } from 'react'
import { auth } from '../firebaseApp'
import { deleteAvatar, updateAvatar  } from '../myBackend'

export const MyUserContext = createContext()

export const MyUserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({})

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setMsg({})
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const signUpUser = async (email, password, displayName) => {
    console.log(email, displayName, password);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, { displayName })
      await sendEmailVerification(auth.currentUser)

      setMsg({})
      logOutUser()
    } catch(error) {
  console.log("SIGNUP ERROR:", error.code, error.message)
  setMsg({ err: error.message })
}
  }

  const logOutUser = async () => {
    await signOut(auth)
    setMsg({})
  }

  const signInUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      
      const currentUser = auth.currentUser
      if (!currentUser.emailVerified) {
        setMsg({ err: "Kérlek kattints az aktiváló linkre" })
        logOutUser()
        return
      }

      setMsg({ signIn: true })

    } catch (error) {
      setMsg({ err: error.message })
    }
  }

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      setMsg({ resetPw: "A jelszó visszaállítási email elküldve!" })
    } catch (error) {
      setMsg({ err: error.message })
    }
  }

  const avatarUpdate = async (file) => {
    try {
      const uploadResult = await updateAvatar(file)
      if (uploadResult?.url) {
        await updateProfile(auth.currentUser, { photoURL: uploadResult.url })
      }

      await updateAvatar(user.uid, uploadResult.public_id)

      setUser(auth.currentUser)
      setMsg({ updateProfile: "Sikeres profilmódosítás!" })

    } catch (error) {
      setMsg({ err: error.message })
    }
  }

  const deleteAccount = async (password) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      )

      await reauthenticateWithCredential(auth.currentUser, credential)
      await deleteUser(auth.currentUser)

      setMsg({ serverMsg: "Felhasználói fiók törölve!" })
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setMsg({ err: "Hibás jelszó!" })
      } else {
        setMsg({ err: "Hiba történt a fiók törlésekor!" })
      }
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Biztosan ki akarod törölni a felhasználói fiókodat?")) {
      const pw = prompt("Add meg a jelszavad a törléshez")
      await deleteAvatar(user.uid)
      await deleteAccount(pw)
    }
  }

  return (
    <MyUserContext.Provider
      value={{
        user,
        signUpUser,
        logOutUser,
        signInUser,
        msg,
        avatarUpdate,
        deleteAccount,
        handleDelete,
        resetPassword,
        setMsg
      }}
    >
      {children}
    </MyUserContext.Provider>
  )
}
