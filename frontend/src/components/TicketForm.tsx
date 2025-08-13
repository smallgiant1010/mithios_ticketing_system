import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, FormEvent } from 'react';
import { postTicket } from "../api/TicketApi";
import useDisplayContext from "../hooks/useDisplayContext";

export default function TicketForm() {
  const queryClient = useQueryClient();
  const [ticketInfo, setTicketInfo] = useState({
    title: "",
    description: "",
    images: [] as File[],
    priority: 1,
    team: "Any",
    resolved: false,
  });
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: (formData: FormData) => postTicket(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });

  const { dispatch } = useDisplayContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const metadata = structuredClone(ticketInfo);
    delete (metadata as any).images;
    ticketInfo.images.forEach((blob) => formData.append("images", blob)); 
    formData.append("metadata", JSON.stringify(metadata));
    const response = await mutateAsync(formData);

    if(response && response.status === 200) {
      dispatch({ type: "DISMISS_TICKET_FORM" });
      setTicketInfo({
        title: "",
        description: "",
        images: [] as File[],
        priority: 1,
        team: "Any",
        resolved: false,
      });
    }
  };

  return (<form onSubmit={handleSubmit} className="default-form-style ticket-form member-form modal-content">
    <div className='default-login-group'>
      <label htmlFor="fTitle" className="default-label-style">Title </label>
      <input type="text" value={ticketInfo.title} onChange={e => setTicketInfo(prev => ({...prev, title: e.target.value}))} className="default-field-style"/>
      <span>{data && (Object.hasOwn(data, "title") ? data.title : "")}</span>
    </div> 
    <div className='default-login-group'> 
      <label htmlFor="fDescription" className="default-label-style">Description</label>
      <textarea className="textarea default-field-style" value={ticketInfo.description} onChange={e => setTicketInfo(prev => ({...prev, description: e.target.value}))}/>
    </div>
    <div className='default-login-group'> 
      <label htmlFor="fTeam" className="default-label-style">Team</label>
      <select className="default-select-style" value={ticketInfo.team} onChange={e => setTicketInfo(prev => ({...prev, team: e.target.value}))}>
        <option value="Programmer">Programmer</option> 
        <option value="Artist">Artist</option>
        <option value="Manager">Manager</option>
        <option value="Any">Any</option>
      </select>
      <span>{data && (Object.hasOwn(data, "team") ? data.team : "")}</span>
    </div>
    <div className='default-login-group'>
      <label htmlFor="fPriority" className="default-label-style">Priority</label>
      <input type="range" min="1" max="5" value={ticketInfo.priority} onChange={e => setTicketInfo(prev => ({...prev, priority: Number(e.target.value)}))} className="default-range-style" />   
      <span>{data && (Object.hasOwn(data, "priority") ? data.priority : "")}</span>
    </div>
    <div className='file-uploader'> 
      <label htmlFor="fImages" className="default-label-style file-upload-label">
        Upload Screenshots (2 MAX)
        <input id="fImages" multiple type="file" onChange={e => {
          if(e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files); 
            setTicketInfo(prev => ({...prev, images: [...prev.images, ...files]}));
          }
        }} className="file-input" />
      </label>
      <span>{data && (Object.hasOwn(data, "image_str") ? data.image_str : "")}</span>
      <div>
        <ul className='file-list'>
          {ticketInfo?.images.map((image, idx) => (
            <li className="file-item" key={idx}>
              <span>{image.name}</span>
              <button className="default-button-style list-buttons" onChange={e => setTicketInfo(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx )}))}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className='dual-button-layout'>
      <button className="default-button-style" onClick={e => dispatch({ type: "DISMISS_TICKET_FORM" })}>
        Cancel
      </button>
      <button type="submit" className="default-button-style">{isPending ? "Posting..." : "Post Ticket"}</button>
    </div>
  </form>);
}
