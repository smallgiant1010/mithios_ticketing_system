export default function MemberCard({ data }: { data: { _id: string, username: string, role: string, email: string, }}) {
  const { _id, username, role, email } = data;

  return (<div>
      <div>{_id}</div>
      <div>{username}</div>
      <div>{email}</div>
      <div>{role}</div>
    </div>
  );
}
