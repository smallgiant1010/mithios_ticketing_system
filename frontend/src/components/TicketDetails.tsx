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
    const response: Response = await mutateAsync({ _id, details });
    if(response && response.ok) dispatch({ type: "DISMISS_TICKET" });
  }

  return (<form className="default-form-style modal-content member-form" onSubmit={handleSubmit}>
      <div className='default-login-group'>
        <label htmlFor="fTitle" className="default-label-style">Title</label>
        <input className="default-field-style" name="fTitle" type="text" value={details.title} onChange={e => setDetails(prev => ({ ...prev, title: e.target.value }))}/>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "title") ? mutationErrorData.title : "")}</span>
      </div>

      <div className='default-login-group'>
        <label htmlFor="fDescription" className="default-label-style">Description</label>
        <textarea className='textarea default-field-style' name="fDescription" value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: e.target.value }))}/>
      </div>
      
      <div className='default-login-group'>
        <label htmlFor="fPriority" className="default-label-style">Priority: {details.priority}</label>
        <input className="default-range-style" name="fPriority" type="range" min="1" max="5" value={details.priority} onChange={e => setDetails(prev => ({ ...prev, priority: Number(e.target.value) }))}/>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "priority") ? mutationErrorData.priority : "")}</span>
      </div>
      
      <div className='default-login-group'>
        <label htmlFor="fTeam" className="default-label-style">Team</label>
        <select name="fTeam" className="default-select-style" value={details.team} onChange={e => setDetails(prev => ({ ...prev, team: e.target.value }))}>
          <option value="Programmer">Programmer</option>
          <option value="Artist">Artist</option>
          <option value="Manager">Manager</option>
          <option value="Any">Any</option>
        </select>
        <span>{mutationErrorData && (Object.hasOwn(mutationErrorData, "team") ? mutationErrorData.team : "")}</span>
      </div>
      <div id='image-previews'>
        {Object.hasOwn(data, "image_str") && data["image_str"].map((img_str: string, idx: number) => <img src={img_str} className='image-preview' key={idx} alt={`Visual Details related to Ticket ${_id}`} />)}   
      </div>
      <div className='dual-button-layout'>
        <button className='default-button-style' onClick={e => dispatch({ type: "DISMISS_TICKET" })}>Close</button>
        <button className='default-button-style' disabled={id === data.issued_user_id} type="submit">{isPending ? "Saving Changes..." : "Save Changes"}</button>
      </div>
      <span>{isError ? error.message : ""}</span>
    </form>);
}
