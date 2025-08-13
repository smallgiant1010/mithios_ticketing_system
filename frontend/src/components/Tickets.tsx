import TicketForm from './TicketForm';
import useDisplayContext from '../hooks/useDisplayContext';
import TicketFilter from "./TicketFilter";
import TicketFullDetails from "./TicketDetails";
import useAuthContext from "../hooks/useAuthContext";
import { MouseEvent } from 'react';

export default function Tickets() {
  const { ticket, dispatch, showTicketForm } = useDisplayContext();
  const { role } = useAuthContext();

  const handleFormOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      dispatch({ type: "DISMISS_TICKET_FORM" });
    }
  };

  const handleTicketOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      dispatch({ type: "DISMISS_TICKET" });
    }
  }

  return (<div id='tickets-page'>
    <button className='default-button-style' disabled={role === "Any"} onClick={e => dispatch({ type: "PREVIEW_TICKET_FORM" })}>
      Add Ticket
    </button>
    {showTicketForm && (
      <div className='modal-overlay' onClick={handleFormOverlayClick}>
          <TicketForm />
      </div>
    )}  
    <TicketFilter />
    {ticket && (
      <div className='modal-overlay' onClick={handleTicketOverlayClick}>
        <TicketFullDetails _id={ticket} />
      </div>
    )}
  </div>)
}
