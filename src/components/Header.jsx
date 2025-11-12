import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'
import { RxAvatar } from "react-icons/rx";


export const Header = () => {
    const {user, logOutUser} = useContext(MyUserContext)
    console.log(user);
    
    const navigate = useNavigate()
  return (
    <header className='header'>
        <div className='header-right'>
            <FaHome onClick={()=>navigate("/")} className='recipesHome' size={50} style={{position:"absolute",top:"5px",left:"5px"}} />
        {user ?
            <div>
            <RxAvatar size={30} title={user?.displayname}/>
            <button onClick={()=>logOutUser()}>Kijelentkezés</button>
            </div>
         
         :
        <div className='headerBtn-container' style={{position:"absolute",top:"5px",right:"5px"}}>
            <button className='headerBtn' onClick={()=>navigate("/signin")} >Bejelentkezés</button>
            <button className='headerBtn' onClick={()=>navigate("/signup")} >Regisztráció</button>
        </div>
    }


        </div>
    </header>
  );
};