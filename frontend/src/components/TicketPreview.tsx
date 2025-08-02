import { deleteTicket } from "../api/TicketApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthContext from '../hooks/useAuthContext';
import { useState } from "react";

export default function TicketPreview({ data }: { data: TicketPreview }) {
  const { _id, title, priority, issued_user, updatedAt, team, resolved } = data;
  const queryClient = useQueryClient();
  const {username} = useAuthContext();
  const [showDetails, setShowDetails] = useState(false);
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });

  return (<div style={{ border: "5 solid black" }} onClick={e => setShowDetails(prev => !prev)}>
    <div>Title: {title}</div>
    <div>Priority: {priority}</div>
    <div>Ticket ID: {_id}</div>
    <div>Team: {team}</div>
    <div>Last Updated: {updatedAt.toString()}</div>
    <div>Is Resolved: {`${resolved}`}</div>
    <div>Are you the Issued User? {`${issued_user === username}`}</div>
    <button onClick={e => {
      e.preventDefault();
      mutate(_id);
    }}>{isPending ? "Closing Ticket..." :"Resolve Ticket"}</button>
    <span>{isError ? error.message : ""}</span>
  </div>);
}
