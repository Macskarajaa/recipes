import { useContext } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const {signUpUser, msg, logOutUser} =useContext(MyUserContext)



  const handleSubmit=(event)=>{
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get('email'),data.get('password'),data.get('displayName'));

    signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
    logOutUser()
    
  }

  return (
    <div
      style={{
        marginTop: "2rem",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >

      <div>
        <h3>Sign UP</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{display:'block'}}>Email</label>
            <input name="email" placeholder="email" type="email" />
          </div>
          <div>
            <label>Password</label>
            <input name="password" placeholder="password " type="password" />
          </div>
          <div>
            <label>Username</label>
            <input name="displayName" placeholder="username " type="text" />
          </div>
          <button type="submit">Sign UP</button>
        </form>
        
      </div>
            {msg && (msg?.err || msg?.signUp) && <p style={{color:'red'}}>{msg.err || msg?.signUp}</p>}

    </div>

  );
};
