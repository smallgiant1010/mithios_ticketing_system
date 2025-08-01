import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../api/AuthApi";

export default function Profile() {
  const [profile, setProfile] = useState(null); 
  
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserInfo,
  });

  if(isPending) {
    return <div>Loading User Profile...</div>;
  }

  if(isError) {
    return <div>Error: {error.message}</div>;
  }

  return (<div>
    <div>User ID: {data["_id"]}</div>
    <div>Username: {data["username"]}</div>
    <div>Email: {data["email"]}</div>
    <div>Role: {data["role"]}</div>
  </div>);
}
