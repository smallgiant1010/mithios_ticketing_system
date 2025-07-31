import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

export default function useAuthContext() {
  const authContext = useContext(AuthContext);
  if(!authContext) {
    throw new Error("Auth Context must be used within an Auth Context Provider");
  }

  return authContext;
};
