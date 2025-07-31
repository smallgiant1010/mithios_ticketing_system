import useAuthContext from "./useAuthContext";
import { useState } from 'react';

export const useLogin = () => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      } else {
        setErrors(null);
        dispatch({ type: "LOGIN", payload: data });
      }
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return {errors, loading, login};
}
