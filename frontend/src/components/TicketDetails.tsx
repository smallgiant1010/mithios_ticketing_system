import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, FormEvent } from 'react';
import { getSpecificTicket } from "../api/TicketApi";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDisplayContext } from "../hooks/useDisplayContext";

export default function TicketDetails({ _id }: { _id: string, authorized: boolean }) {
  const queryClient = useQueryClient();
  const [details, setDetails] = useState<TicketDetails | null>(null);
  const { id } = useAuthContext(); 
  const { dispatch } = useDisplayContext();
  const { data, isPending: detailsPending } = useQuery({
    queryKey: ["ticketDetails", _id],
    queryFn: () => getSpecificTicket(_id),
    onSuccess: (fetchedData) => setDetails(fetchedData);
  });

  const { mutateAsync, isPending, isError, error, data: mutationErrorData } = useMutation({
    mutationFn: (id: string, mods: Modifications) => updateTicket(id, mods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetails"] });
    }
  })

  if(detailsPending) {
    return <div>Loading Ticket Details...</div>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(_id, details);
    if(!isError) dispatch({ type: "DISMISS" });
  }

  return (<div>
    {id === data.issued_user_id ? <form className="default-form-style" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fTitle" className="default-label-style">Title</label>
        <input className="default-field-style" name="fTitle" type="text" value={details.title} onChange={e => setDetails(prev => ({ ...prev, title: e.target.value }))}/>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "title") ? mutationErrorData.title : "")}</span>
      </div>
      <div>
        <label htmlFor="fDescription" className="default-label-style">Description</label>
        <input className="default-field-style" name="fDescription" type="textarea" value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: e.target.value }))}/>
      </div>
      <div>
        <label htmlFor="fPriority" className="default-label-style">Priority</label>
        <input className="default-range-style" name="fPriority" type="range" min="1" max="5" value={details.priority} onChange={e => setDetails(prev => ({ ...prev, priority: Number(e.target.value) }))}/>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "priority") ? mutationErrorData.priority : "")}</span>
      </div>
      <div>
        <label htmlFor="fTeam" className="default-label-style">Team</label>
        <select name="fTeam" className="default-select-style" value={details.team} onChange={e => setDetails(prev => ({ ...prev, team: e.target.value }))}>
          <option value="Programmer">Programmer</value>
          <option value="Artist">Artist</value>
          <option value="Manager">Manager</value>
          <option value="Any">Any</value>
        </select>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "team") ? mutationErrorData.team : "")}</span>
      </div>
      <button type="submit">{isPending ? "Saving Changes..." : "Save Changes"}</button>
      <span>{isError ? error.message : ""}</span>
    </form> : {Object.entries(data).map(([key, value], idx) => (
      {key !== "image_str" && <div>{key}: {value}</div> }))}}
    {data["image_str"].length > 0 && data["image_str"].map((img_str, idx) => <img src={img_str} width={250} height={250} />)}   
    <button onClick={e => dispatch({ type: "DISMISS" })}>Close</button>
  </div>);
}
