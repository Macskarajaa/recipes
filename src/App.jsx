import './App.css'
import { Home }  from './pages/Home'
import { Recipes } from './pages/Recipes'
import { RecipesForm }  from './pages/RecipesForm'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>  
     <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recipes" element={<Recipes />}></Route>
      <Route path="/addnew" element={<RecipesForm />}></Route>
     </Routes>
    </>
  )
}

export default App
