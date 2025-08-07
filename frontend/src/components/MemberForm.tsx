import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, FormEvent } from "react";
import { postSignup } from "../api/AuthApi";
import useDisplayContext from "../hooks/useDisplayContext";

export default function MemberForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    role: "Any",
  });
  const { dispatch } = useDisplayContext();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: (userdata: UserData) => postSignup(userdata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    }
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(credentials);
    if(data.status === 200) {
      dispatch({ type: "DISMISS_MEMBER_FORM" });
    }
  }

  return (<form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="fUsername">Username: </label>
      <input type="text" name="fUsername" value={credentials.username} onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))} /> 
      <span>{data && data.username}</span>
    </div>

    <div>
      <label htmlFor="fEmail">Email: </label>
      <input type="email" name="fEmail" value={credentials.email} onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))} />
      <span>{data && data.email}</span>
    </div>

    <div>
      <label htmlFor="fPassword">Password: </label>
      <input type="password" name="fPassword" value={credentials.password} onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))} />
      <span>{data && data.password}</span>
    </div>

    <div>
      <label htmlFor="fRole">Role: </label>
      <select name="fRole" value={credentials.role} onChange={e => setCredentials(prev => ({ ...prev, role: e.target.value }))}>
        <option value="Programmer">Programmer</option> 
        <option value="Artist">Artist</option>
        <option value="Manager">Manager</option>
        <option value="Any">Any</option>
      </select>
      <span>{data && data.role}</span>
    </div>

    <div>
      <button onClick={e => dispatch({ type: "DISMISS_MEMBER_FORM" })}>Cancel</button>
      <button type="submit">{isPending ? "Signing Up User..." : "Create User"}</button>
    </div>
  </form>);
}
