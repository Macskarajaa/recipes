import { useContext } from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { MyUserContext } from '../context/MyUserProvider'
import { RxAvatar } from "react-icons/rx";


export const Header = () => {
    const { user, logOutUser } = useContext(MyUserContext)
    console.log(user);

    const navigate = useNavigate()
    return (
        <div className='header'>
            <FaHome onClick={() => navigate("/")} className='recipesHome' size={50} style={{ position: "absolute", top: "5px", left: "5px" }} />
            {user ?
                <div className='headerBtn-container' style={{ position: "absolute", top: "5px", right: "5px" }}>
                    <span onClick={() => navigate("/profile")}>
                        {user?.photoURL ?
                            <img src={user.photoURL} className="profileIcon" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", cursor:"pointer", border:"1px solid #39375bff" }} alt="előnézet" />
                            :
                            <RxAvatar size={50} />
                        }
                    </span>

                    <button id='samplebutton' onClick={() => logOutUser()}>Kijelentkezés</button>
                </div>

                :
                <div className='headerBtn-container' style={{ position: "absolute", top: "5px", right: "5px" }}>
                    <button className='headerBtn' onClick={() => navigate("/signin")} >Bejelentkezés</button>
                    <button className='headerBtn' onClick={() => navigate("/signup")} >Regisztráció</button>
                </div>
            }


        </div>
  );
};