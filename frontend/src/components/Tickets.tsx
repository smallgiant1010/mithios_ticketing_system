import TicketForm from './TicketForm';
import useDisplayContext from '../hooks/useDisplayContext';
import TicketFilter from "./TicketFilter";
import TicketDetails from "./TicketDetails";

export default function Tickets() {
  const {ticket} = useDisplayContext();

  return (<TicketFilter>
    <TicketForm />
    {ticket && <TicketDetails data={ticket._id} />}
  </TicketFilter>)
}
