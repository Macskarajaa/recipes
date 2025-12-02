import { useContext } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { useNavigate } from "react-router";
import { useState } from "react";

export const SignUp = () => {
  const { signUpUser, msg, logOutUser } = useContext(MyUserContext)
  const [loading, setLoading] = useState(false)



  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get('email'), data.get('password'), data.get('displayName'));

    signUpUser(data.get('email'), data.get('password'), data.get('displayName'))
    logOutUser()

  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h3 className="signup-title">Sign Up</h3>

        <form onSubmit={handleSubmit} className="signup-form">
          <div>
            <label>Email</label>
            <input name="email" placeholder="email" type="email" />
          </div>

          <div>
            <label>Password</label>
            <input name="password" placeholder="password" type="password" />
          </div>

          <div>
            <label>Username</label>
            <input name="displayName" placeholder="username" type="text" />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>

      {msg && (msg.err || msg.signUp) && (
        <p className="signup-error">{msg.err || msg.signUp}</p>
      )}
    </div>
  );
};
