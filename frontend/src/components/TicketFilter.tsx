import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../api/TicketApi';
import TicketPreview from "./TicketPreview";
import useTicketFilter from "../hooks/useTicketFilter";

export default function TicketFilter() {
  const { filters: { query, localQuery, sortType, page, order, resolved }, setters: { setLocalQuery, setSortType, setPage, setOrder, setResolved } } = useTicketFilter();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tickets", query, sortType, page, order, resolved],
    queryFn: () => getTickets({ query, sortType, page, order, resolved }),
  }); 

  if(isError) {
    return <div>Error: {error.message}</div>
  }

  return (<div className='container ticket-page-layout'>
    <section className="filter">
      <div>
        <label className="default-label-style" htmlFor="fSortType">Sort By: </label>
        <select name="fSortType" value={sortType} onChange={e => setSortType(e.target.value)}>
          <option value="team">Team</option>
          <option value="priority">Priority</option>
          <option value="createdAt">First Created</option>
          <option value="updatedAt">Recently Updated</option>
        </select>
      </div>
      <div>
        <label className="default-label-style" htmlFor="fOrder">Order By: </label>
        <select name="fOrder" value={order} onChange={e => setOrder(parseInt(e.target.value))}>
          <option value={1}>Ascending</option>
          <option value={-1}>Descending</option>
        </select>
      </div>
      <div>
        <label className="default-label-style" htmlFor="fResolved">Status: </label>
        <select name="fResolved" value={String(resolved)} onChange={e => setResolved(e.target.value === "true")}>
          <option value="false">Active</option>
          <option value="true">Resolved</option>
        </select>
      </div>
      <input className="default-field-style searchBar" type="text" value={localQuery} onChange={e => setLocalQuery(e.target.value)} placeholder="Search Tickets..."/>
    </section>
    <section id='tickets-layout'>
      {isPending ? (<div>Loading Tickets...</div>) : data["data"]?.map((ticket: TicketPreview) => <TicketPreview key={ticket._id} data={ticket} />)}
    </section>
    <section className='page-counter'>
      <button className='page-button default-button-style' onClick={e => setPage(p => p - 1)} disabled={page === 1}>Previous Page</button>
      <span className='page-number'>{page}</span>
      <button className='page-button default-button-style' disabled={!data?.data || data.data.length < 20} onClick={e => setPage(p => p + 1)}>Next Page</button>
    </section>
  </div>);
}
