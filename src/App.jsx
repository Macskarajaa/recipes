import './App.css'
import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { RecipesForm } from './pages/RecipesForm'
import { Recipes } from './pages/Recipes'

import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Header } from './components/Header'


function App() {

  return (
    <div className='container'>
    <Header/>
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/recipes' element={<Recipes />}></Route>
          <Route path='/addnew' element={<RecipesForm />}></Route>
          <Route path='/edit/:id' element={<RecipesForm />}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>


      </Routes>
    </div>
  )
}

export default App
