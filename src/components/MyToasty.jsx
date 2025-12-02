import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { MyUserContext } from '../context/MyUserProvider'
import { useNavigate } from 'react-router'

export const MyToasty = ({err,signUp,resetPw}) => {
    const {setMsg,msg} = useContext(MyUserContext);
    console.log(resetPw);
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(msg?.err){
            toast.error(msg?.err,{position:"top-left"})
            setMsg(null)
        }else if(msg?.signUp){
            toast.success(msg.signUp,{position:"top-left"})
            setTimeout(() => {
                navigate('/signin')
            }, 2000);
            setMsg(null)
        }else if(msg?.resetPw){ 
            toast.success(msg.resetPw,{position:"top-left"})
            navigate("/signin")
            setMsg(null)
        }else if(msg?.serverMsg){
            toast.success(msg.serverMsg,{position:"top-left"})
            setMsg(null)
        }
    },[msg])
  return null;
}