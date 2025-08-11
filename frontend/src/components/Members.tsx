import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from '../api/AuthApi';
import MemberForm from "./MemberForm";
import MemberCard from "./MemberCard";
import useDisplayContext from "../hooks/useDisplayContext";
import useAuthContext from "../hooks/useAuthContext";

export default function Members() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["members"],
    queryFn: getAllUsers,
  }); 

  const { showMemberForm, dispatch } = useDisplayContext();
  const { role } = useAuthContext();

  if(isError) {
    return (<div>{error.message}</div>);
  }

  return (<div id="member-page">
    <button className="default-button-style add-member-button" disabled={role !== "Manager"} onClick={e => dispatch({ type: "PREVIEW_MEMBER_FORM" })}>Add Member</button>
    {showMemberForm && <MemberForm />}
    <div id="member-list">
      {isPending ? <div>Loading Members...</div> : <>
          {data["users"].map((user: { _id: string, username: string, role: string, email: string }) => <MemberCard key={user._id} data={user}/>)}
        </>
      }
    </div>
  </div>);
}
