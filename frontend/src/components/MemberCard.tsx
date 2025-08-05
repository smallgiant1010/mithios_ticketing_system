export default function MemberCard({ data }: { data: { _id: string, username: string, role: string,}}) {
  const { _id, username, role } = data;

  return (<div>
      <div>{_id}</div>
      <div>{username}</div>
      <div>{role}</div>
    </div>
  );
}
