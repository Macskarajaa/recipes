import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router';
import { readRecipes } from '../myBackend';
import { RecipeCard } from '../components/RecipeCard';
import { Header } from '../components/Header';


export const Recipes = () => {

    const navigate = useNavigate()

  return (
    <div style={{minHeight:"100vh", background:'lightyellow', position:"relative", backgroundSize:"cover", display:"flex"}}>
      <div className='cardContainer' style={{textAlign:"center", paddingTop:"50px"}}>
        {Recipes&&Recipes.lenght>0 && recipes.map(obj=><RecipeCard key={obj.id} {...obj}/>)}
        {Recipes&&Recipes.lenght==0 && <h4>Nincsenek Receptek</h4>}

      </div>
     <div>Új recept hozzáadása</div>
      <FaHome onClick={()=>navigate("/")} style={{position:"absolute", top:"5px", left:"5px"}} />

    </div>
  )
}



