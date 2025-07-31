import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

export default function AuthCode({ authCode, email }: { authCode: string, email: string}) {
  const [error, setError] = useState("");
  const [userCode, setUserCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(userCode === `${authCode}`) {
      navigate("/reset", { state: { email } });
    }
    else {
      setError("This Code Is Incorrect.");
    }
    setLoading(false);
  };

  return (<form onSubmit={checkAuth}>
      <div className="default-login-group">
        <label htmlFor="fCode" className="default-label-style">Authentication Code: </label>
        <input type="text" name="fCode" className="default-field-style" onChange={(e) => setUserCode(e.target.value)} />
        <span>{error}</span>
        <button type="submit" className="default-button-style">
          {loading ? "Authenticating Code..." : "Submit"}
        </button>
      </div> 
    </form>);
};
