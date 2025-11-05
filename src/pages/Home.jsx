import React from 'react'
import { useNavigate } from 'react-router'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <div  style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Recipebook</h1>
      <button onClick={()=>navigate("/recipes")}>Főzz, posztolj, inspirálj !</button>
      <button onClick={()=>navigate("/addnew")}>addnew</button>
    </div>
  )
}

