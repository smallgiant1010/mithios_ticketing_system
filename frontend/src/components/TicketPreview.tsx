import { deleteTicket } from "../api/TicketApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthContext from '../hooks/useAuthContext';

export default function TicketPreview({ _id, title, priority, issued_user, updatedAt, team}: TicketPreview) {
  const queryClient = useQueryClient();
  const {username} = useAuthContext();
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });

  return (<div onClick={}>
    <div>Title: {title}</div>
    <div>Priority: {priority}</div>
    <div>Ticket ID: {_id}</div>
    <div>Team: {team}</div>
    <div>Last Updated: {updatedAt}</div>
    <div>Are you the Issued User? {issued_user === username}</div>
    <button onClick(e => {
      e.preventDefault();
      mutate(_id);
    })>{isPending ? "Closing Ticket..." :"Resolve Ticket"}</button>
    <span>{isError ? error.message : ""}</span>
  </div>);
}
