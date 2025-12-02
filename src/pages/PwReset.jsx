import React from 'react'
import { useContext } from 'react'
import { MyUserContext } from '../context/MyUserProvider'
import { MyToasty } from '../components/MyToasty'

export const PwReset = () => {
    const {msg,resetPassword,setMsg} = useContext(MyUserContext)
  
    console.log(msg);
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data.get("email"));
        resetPassword(data.get("email"))
    }
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Password reset</h2>

        <form onSubmit={handleSubmit} className="signin-form">

          <label>Email</label>
          <input
          name='email'
            type="email"
            placeholder='email'
            required

          />
          <button type="submit" className="signin-btn">
            Log In
          </button>
        </form>
      </div>
      {msg && <MyToasty {...msg} /> }
    </div>
  )
}