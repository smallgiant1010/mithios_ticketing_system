import useAuthContext from './useAuthContext';
import { useState } from 'react';

export default function useLogout() {
  const { dispatch } = useAuthContext();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_PREFIX + "/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if(response.status > 200) {
        setErrors(data["error"]);
      } else {
        setErrors("");
        dispatch({ type: "LOGOUT" });
      }
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return {errors, loading, logout};
};
