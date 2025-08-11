import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { useLogin } from '../hooks/useLogin';

//type CredentialData = { 
//  username: string, 
//  email: string, 
//  password: string, 
//  role: string
//}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {login, errors, loading} = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
    if(!errors) {
      navigate("/profile");
    }
  };

  return (<div className="container">
    <form onSubmit={handleSubmit} className="default-form-style">
      <div className="default-login-group">
        <label htmlFor="fUser" className="default-label-style" >Username</label>
        <input name="fUser" value={username} type="text" className="default-field-style" onChange={(e) => setUsername(e.target.value)}/>
        <span>{errors ? errors["username"] : ""}</span>
      </div>
      <div className="default-login-group">
        <label htmlFor="fPassword" className="default-label-style" >Password</label>
        <input name="fPassword" value={password} type={ showPassword ? "text" : "password" } className="default-field-style" onChange={(e) => setPassword(e.target.value)}/>
        <span>{errors ? errors["password"] : ""}</span>
      </div>
      <div id="showpass-group">
        <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)}/>
        <span>Show Password</span>
      </div>
      <button type="submit" className="default-button-style">
        {loading ? "Loggin In..." : "Login"}
      </button>

      <Link to="/code" id="forgot-password-link" className="default-link-style">
        I Forgot My Password
      </Link>  
    </form>  
  </div>)
};
