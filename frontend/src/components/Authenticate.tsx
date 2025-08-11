import { useState } from 'react';
import type { FormEvent } from 'react';
import AuthCode from './AuthCode';

export default function Authenticate() {
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const params = new URLSearchParams({ email });
      const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/authCode?${params.toString()}`, {
        method: "POST",
        credentials: "include",    
      });
      const data = await response.json();
      if(response.status > 200) {
        setError(data.error);
      } else {
        setAuthCode(data.authCode);
      }
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  } 

  return (<div className='container'>
    <form onSubmit={handleSubmit} className='default-form-style'>
      <div className="default-login-group">
        <label htmlFor="fEmail" className="default-label-style">Recovery Email</label>
        <input type="email" name="fEmail" className="default-field-style" onChange={(e) => setEmail(e.target.value)} />
        <span>{error}</span>
        <button type="submit" className="default-button-style">
          {loading ? "Sending Code..." : "Send Code"}
        </button>
      </div>
    </form>

    {authCode && <AuthCode authCode={authCode} email={email} />}
  </div>)
};
