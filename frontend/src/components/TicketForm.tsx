import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, FormEvent } from 'react';

export default function TicketForm() {
  const queryClient = useQueryClient();
  const [ticketInfo, setTicketInfo] = useState({
    title: "",
    description: "",
    images: [],
    priority: 1,
    team: "Any",
  });
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: (formData: FormData) => postTicket(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    
    for(const [key, value] of Object.Entries(ticketInfo)) {
      formData.append(key, value); 
    };

    mutate(formData);
  };

  return (<form onSubmit={handleSubmit} className="default-form-style">
    <div>
      <label htmlFor="fTitle" className="default-label-style">Title</label>
      <input type="text" onChange={e => setTicketInfo(prev => {...prev, title: e.target.value})} className="default-field-style"/>
      <span>{data?.title ? data.title : ""}</span>
    </div> 
    <div> 
      <label htmlFor="fDescription" className="default-label-style">Description</label>
      <input type="textarea" onChange={e => setTicketInfo(prev => {...prev, description: e.target.value})} className="default-field-style"/>
    </div>
    <div> 
      <label htmlFor="fTeam" className="default-label-style">Team</label>
      <select id="default-select-style" onChange={e => setTicketInfo(prev => {...prev, team: e.target.value})}>
        <option value="Programmer">Programmer</option> 
        <option value="Artist">Artist</option>
        <option value="Manager">Manager</option>
        <option value="Any">Any</option>
      </select>
      <span>{data?.team ? data.team : ""}</span>
    </div>
    <div>
      <label htmlFor="fPriority" className="default-label-style">Priority</label>
      <input type="range" min="1" max="5" onChange={e => setTicketInfo(prev => {...prev, priority: Number(e.target.value}))} className="default-field-style" />   
      <span>{data?.priority ? data.priority : ""}</span>
    </div>
    <div> 
      <label htmlFor="fImages" className="default-label-style">Screenshots</label>
      <input type="file" onChange={e => {
        if(e.target.files) {
          setTicketInfo(prev => { ...prev, images: [...prev.images, Array.from(e.target.files)]});
        }
      }} className="default-field-style" />
      <span>{data?.image_str ? data.image_str : ""}</span>
    </div>
    <button type="submit" className="default-button-style">{isPending ? "Posting..." : "Post Ticket"}</button>
  </form>);
}
