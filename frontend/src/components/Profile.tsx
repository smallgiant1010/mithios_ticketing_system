import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/AuthApi";
import useLogout from "../hooks/useLogout";
import { MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSelectRole from "../hooks/useSelectRole";

export default function Profile() { 
  const { isPending, data} = useQuery({
    queryKey: ['profile'],
    queryFn: getUserInfo,
  });

  const { errors, loading, logout } = useLogout();

  const navigate = useNavigate();

  const { selectRole } = useSelectRole();

  useEffect(() => {
    if(data && data.status > 200) {
      navigate("/login");
    }
  }, [data, navigate])

  if(isPending) {
    return <div>Loading User Profile...</div>;
  }

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    logout();
    navigate("/login");
  };

  return (<div id="profile-container">
    <div className="profile-card">
      <img src={selectRole(data["role"])} width={128} height={128} alt="icons"/>
      <div>
        <div>User ID: {data["_id"]}</div>
        <div>Role: {data["role"]}</div>
        <div>Username: {data["username"]}</div>
        <div>Email: {data["email"]}</div>
        <div>Password: {data["password"]}</div>
      </div>
    </div>
    <button className="default-button-style logout-button" onClick={handleLogout}>{loading ? "Logging Out..." : "Logout"}</button>
    <span>{errors}</span>
  </div>);
}
