import { useContext, useEffect } from "react";
import { MyUserContext } from "../context/MyUserProvider";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const { signInUser, msg, setMsg } = useContext(MyUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (msg && msg?.signIn) navigate("/recipes");
  }, [msg]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInUser(data.get("email"), data.get("password"));
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h3>Sign In</h3>

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <label>Email</label>
            <input name="email" placeholder="email" type="email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input name="password" placeholder="password" type="password" />
          </div>

          <button type="submit" className="signin-btn">Sign In</button>
        </form>

        <p className="forgot-link" 
           onClick={() => { navigate("/pwreset"); setMsg({}); }}>
          Elfelejtett jelszó
        </p>
      </div>
    </div>
  );
};
