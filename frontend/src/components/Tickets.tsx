import TicketForm from './TicketForm';
import useDisplayContext from '../hooks/useDisplayContext';
import TicketFilter from "./TicketFilter";
import TicketFullDetails from "./TicketDetails";
import useAuthContext from "../hooks/useAuthContext";

export default function Tickets() {
  const { ticket, dispatch, showTicketForm } = useDisplayContext();
  const { role } = useAuthContext();
  return (<div>
    <button disabled={role === "Any"} onClick={e => dispatch({ type: "PREVIEW_TICKET_FORM" })}>
      Add Ticket
    </button>
    {showTicketForm && <TicketForm />}  
    <TicketFilter />
    {ticket && <TicketFullDetails _id={ticket} />}
  </div>)
}
