import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";

type CredentialData = { 
  username: string, 
  email: string, 
  password: string, 
  role: string
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<CredentialData>({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        }),
        credentials: "include",
      });
      
      const data = await response.json();

      if(response.status > 200) {
        setErrors(data);
      }
      else {
        console.log(data);
        // navigate("/");
      }
    } catch(err) {
      console.log("ERROR: ", err);
    } finally {
      setLoading(false);
    }
  };


  return (<div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="fUser" className="default-label-style" >Username: </label>
      <input name="fUser" type="text" className="default-field-style" onChange={(e) => setUsername(e.target.value)}/>
      <span>{errors["username"]}</span>
      <label htmlFor="fPassword" className="default-label-style" >Password: </label>
      <input name="fPassword" type="password" className="default-field-style" onChange={(e) => setPassword(e.target.value)}/>
      <span>{errors["password"]}</span>
      <button type="submit" className="default-buttom-style">
        {loading ? "Loggin In..." : "Login"}
      </button>
    </form>
    <Link to="/" id="forgot-password-link">
      I Forgot My Password
    </Link>    
  </div>)
};
