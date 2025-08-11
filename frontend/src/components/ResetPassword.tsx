import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type CredentialData = { 
  username: string, 
  email: string, 
  password: string, 
  role: string
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<CredentialData>({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [confirmationError, setConfirmationError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_PREFIX + "/auth/resetPassword", {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          newPassword: confirmPassword,
        }),
        credentials: "include",
      });
      
      const data = await response.json();
      if(response.status > 200) {
        setErrors(prev => data);
      } else {
        navigate("/login");
      }
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (<div className='container'>
    <form onSubmit={handleSubmit} className='default-form-style'>
    <div className="default-login-group">
      <label htmlFor="fPassword" className="default-label-style" >Password</label>
      <input name="fPassword" type="password" className="default-field-style" onChange={(e) => setPassword(e.target.value)}/>
    <span>{errors["password"]}</span>
    </div>
    <div className="default-login-group">
      <label htmlFor="fConfirmPassword" className="default-label-style" >Confirm Password</label>
      <input name="fConfirmPassword" type="password" className="default-field-style" onChange={(e) => {
      setConfirmPassword(e.target.value);
      setConfirmationError(e.target.value !== password ? "These Passwords Do Not Match" : "");
      }}/>
    <span>{confirmationError}</span>
    </div>

    <button type="submit" className="default-button-style">
      {loading ? "Finalizing Changes..." : "Reset"}
    </button>
    </form>
  </div>);
};
