import { useContext } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { useNavigate } from "react-router";
import { useEffect } from "react";


export const SignIn = () => {
  const {signInUser, msg} = useContext(MyUserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    {msg && msg?.signIn && navigate('/recipes')}
  },[msg])

  
  const handleSubmit=(event)=>{
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      console.log(data.get('email'),data.get('password'));
      //firebase backend függvény meghívása:
      signInUser(data.get('email'),data.get('password'))

      

      //navigate('/recipes')
  }



  return (
    <div
      style={{
        marginTop: "2rem",
        width: "100vw",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input name="email" placeholder="email" type="email" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" placeholder="password " type="password" />
          </div>
          <button>Sign In</button>
        </form>
      </div>
      {msg && msg?.err && <p style={{color:'red'}}>{msg.err}</p>}

    </div>
  );
};
