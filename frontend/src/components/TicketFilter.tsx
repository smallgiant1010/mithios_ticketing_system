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

  return (<div>
    <section>
      <input type="text" value={localQuery} onChange={e => setLocalQuery(e.target.value)} placeholder="Search Tickets..."/>
      <label htmlFor="fSortType">Sort By: </label>
      <select name="fSortType" value={sortType} onChange={e => setSortType(e.target.value)}>
        <option value="team">Team</option>
        <option value="priority">Priority</option>
        <option value="createdAt">First Created</option>
        <option value="updatedAt">Recently Updated</option>
      </select>
      <label htmlFor="fOrder">Order By: </label>
      <select name="fOrder" value={order} onChange={e => setOrder(parseInt(e.target.value))}>
        <option value={1}>Ascending</option>
        <option value={-1}>Descending</option>
      </select>
      <label htmlFor="fResolved">Status: </label>
      <select name="fResolved" value={String(resolved)} onChange={e => setResolved(e.target.value === "true")}>
        <option value="false">Active</option>
        <option value="true">Resolved</option>
      </select>
    </section>
    {isPending ? (<div>Loading Tickets...</div>) : data["data"]?.map((ticket: TicketPreview) => <TicketPreview key={ticket._id} data={ticket} />)}
    <button onClick={e => setPage(p => p - 1)} disabled={page === 1}>Previous Page</button>
    <div>{page}</div>
    <button disabled={!data?.data || data.data.length < 20} onClick={e => setPage(p => p + 1)}>Next Page</button>
  </div>)
}
