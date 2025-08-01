import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { getTickets, postTicket } from '../api/TicketApi';
import TicketForm from './TicketForm';


export default function Tickets() {
  const { pageNumber } = useParams();
  const [filter, setFilter] = useQueryState({
    query: "",
    page: pageNumber,
    order: -1,
    sortType: "createdAt"
  });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tickets", filter],
    queryFn: () => getTickets(filter),
  });
 
  if(isPending) {
    return <div>Loading Tickets...</div>
  }

  if(isError) {
    return <div>Error: {error.message}</div>
  }
  
  return (<div>
    <TicketForm />
  </div>)
}
