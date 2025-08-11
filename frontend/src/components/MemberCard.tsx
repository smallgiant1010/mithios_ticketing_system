import useSelectRole from "../hooks/useSelectRole";

export default function MemberCard({ data }: { data: { _id: string, username: string, role: string, email: string, }}) {
  const { _id, username, role, email } = data;
  const { selectRole } = useSelectRole();
  return (<div className="profile-card">
      <img src={selectRole(role)} width={128} height={128} alt="icons"/>
      <div>
        <div>User ID: {_id}</div>
        <div>Role: {role}</div>
        <div>Username: {username}</div>
        <div>Email: {email}</div>
      </div>
    </div>);
}
