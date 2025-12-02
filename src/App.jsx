import './App.css'
import { Route, Routes, useLocation } from 'react-router'
import { Home } from './pages/Home'
import { RecipesForm } from './pages/RecipesForm'
import { Recipes } from './pages/Recipes'
import { MyToasty } from './components/MyToasty'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { Header } from './components/Header'
import { PwReset } from './pages/PwReset'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { MyUserContext } from './context/MyUserProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { NotFound } from './components/NotFound'
import { UserProfile } from './pages/UserProfile'
import LoadingAnimation from './components/loadingAnimation'


function Background() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className='global-bg'
      style={{ opacity: isHome ? 1 : 0.5 }}
    >
    </div>
  );
}

function App() {


  return (
    <div className='container'>
      <Header />
      <MyToasty />
      <ToastContainer />
      <LoadingAnimation>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/recipes' element={<Recipes />}></Route>
          <Route path='/addnew' element={<ProtectedRoute> <RecipesForm /> </ProtectedRoute>}></Route>
          <Route path='/edit/:id' element={<ProtectedRoute> <RecipesForm /> </ProtectedRoute>}></Route>
          <Route path='/signin' element={<SignIn />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/pwreset' element={<PwReset />}></Route>
          <Route path='/profile' element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>}> </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </LoadingAnimation>
    </div>
  )
}

export default App
