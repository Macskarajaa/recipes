import React from 'react'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router';

export const Recipes = () => {

    const navigate = useNavigate()

  return (
    <div style={{minHeight:"100vh", background:'lightyellow', position:"relative", backgroundSize:"cover", display:"flex"}}>
     <div>Receptek...</div>
      <FaHome onClick={()=>navigate("/")} style={{position:"absolute", top:"5px", left:"5px"}} />

    </div>
  )
}

