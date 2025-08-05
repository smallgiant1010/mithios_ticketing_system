import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, FormEvent } from 'react';
import { getSpecificTicket, updateTicket } from "../api/TicketApi";
import useAuthContext from "../hooks/useAuthContext";
import useDisplayContext from "../hooks/useDisplayContext";

export default function TicketFullDetails({ _id }: { _id: string }) {
  const queryClient = useQueryClient();
  const [details, setDetails] = useState<TicketDetails>({
    title: "",
    description: "",
    priority: 0,
    team: "",
    _id: "",
    issued_user: "",
    updatedAt: new Date(),
    resolved: false,
    issued_user_id: "",
    createdAt: new Date(),
    image_str: [""]
  });
  const { id } = useAuthContext(); 
  const { dispatch } = useDisplayContext();
  const { data, isPending: detailsPending } = useQuery({
    queryKey: ["ticketDetails", _id],
    queryFn: () => getSpecificTicket(_id),
  });

  useEffect(() => {
    if(data) setDetails(data);
  }, [data]);

  const { mutateAsync, isPending, isError, error, data: mutationErrorData } = useMutation({
    mutationFn: ({ _id , details }: { _id: string, details: TicketDetails }) => updateTicket(_id, details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticketDetails"] });
    }
  })

  if(detailsPending) {
    return <div>Loading Ticket Details...</div>
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({ _id, details });
    if(!isError) dispatch({ type: "DISMISS_TICKET" });
  }

  return (<div>
    {id === data.issued_user_id ? (<form className="default-form-style" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fTitle" className="default-label-style">Title</label>
        <input className="default-field-style" name="fTitle" type="text" value={details.title} onChange={e => setDetails(prev => ({ ...prev, title: e.target.value }))}/>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "title") ? mutationErrorData.title : "")}</span>
      </div>

      <div>
        <label htmlFor="fDescription" className="default-label-style">Description</label>
        <textarea className="default-field-style" name="fDescription" value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: e.target.value }))}/>
      </div>
      
      <div>
        <label htmlFor="fPriority" className="default-label-style">Priority</label>
        <input className="default-range-style" name="fPriority" type="range" min="1" max="5" value={details.priority} onChange={e => setDetails(prev => ({ ...prev, priority: Number(e.target.value) }))}/>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "priority") ? mutationErrorData.priority : "")}</span>
      </div>
      
      <div>
        <label htmlFor="fTeam" className="default-label-style">Team</label>
        <select name="fTeam" className="default-select-style" value={details.team} onChange={e => setDetails(prev => ({ ...prev, team: e.target.value }))}>
          <option value="Programmer">Programmer</option>
          <option value="Artist">Artist</option>
          <option value="Manager">Manager</option>
          <option value="Any">Any</option>
        </select>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "team") ? mutationErrorData.team : "")}</span>
      </div>
      
      <button type="submit">{isPending ? "Saving Changes..." : "Save Changes"}</button>
      <span>{isError ? error.message : ""}</span>
    </form>) : (
      <div> 
        {Object.entries(data).map(([key, value]) => 
          key !== "image_str" ? (<div key={key}>{key}: {String(value)}</div>) : null
        )}
      </div>
    )}
    <div>
      {Object.hasOwn(data, "image_str") && data["image_str"].map((img_str: string, idx: number) => <img src={img_str} width={250} height={250} key={idx} alt={`Visual Details related to Ticket ${_id}`} />)}   
    </div>
    <button onClick={e => dispatch({ type: "DISMISS_TICKET" })}>Close</button>
  </div>);
}
