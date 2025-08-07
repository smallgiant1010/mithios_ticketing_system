import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/AuthApi";
import useLogout from "../hooks/useLogout";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() { 
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserInfo,
  });

  const { errors, loading, logout } = useLogout();

  const navigate = useNavigate();

  if(isPending) {
    return <div>Loading User Profile...</div>;
  }

  if(isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    logout();
    navigate("/login");
  };

  return (<div>
    <div>User ID: {data["_id"]}</div>
    <div>Username: {data["username"]}</div>
    <div>Email: {data["email"]}</div>
    <div>Role: {data["role"]}</div>
    <div>Password: {data["password"]}</div>
    <button onClick={handleLogout}>{loading ? "Logging Out..." : "Logout"}</button>
    <span>{errors}</span>
  </div>);
}
