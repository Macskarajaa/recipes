import React from 'react'
import { useNavigate } from 'react-router'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-wrapper justify-center">
      <h1 className="home-title">Recipebook</h1>

      <div className="home-btn-group">
        <button 
          className="home-main-btn"
          onClick={() => navigate("/recipes")}
        >
          Főzz, posztolj, inspirálj !
        </button>

        <button 
          className="home-secondary-btn"
          onClick={() => navigate("/addnew")}
        >
          Add New
        </button>
      </div>
    </div>
  )
}
