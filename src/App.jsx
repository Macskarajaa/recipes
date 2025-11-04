import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import RecipesForm from './pages/RecipesForm'
import { Route, Routes } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/addnew" element={<RecipesForm />} />
     </Routes>
    </>
  )
}

export default App
