import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../api/TicketApi';
import { useState, FormEvent } from 'react';
import TicketPreview from "./TicketPreview";
import useTicketFilter from "../hooks/useTicketFilter";

export default function TicketFilter({ children }) {
  const { filter, { setQuery, setSortType, setPage, setOrder, setActive} } = useTicketFilter();
  const [applyFilters, setApplyFilters] = useState(true);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tickets", filter],
    queryFn: () => getTickets(filter),
    enabled: applyFilters,
    onSuccess: () => setApplyFilters(false),
  });
 
  if(isPending) {
    return <div>Loading Tickets...</div>
  }

  if(isError) {
    return <div>Error: {error.message}</div>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplyFilters(true);
    setPage(1);
  };


  return (<div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={filter.query} onChange={e => setQuery(e.target.value)} />
      <label htmlFor="fSortType">Sort By: </label>
      <select name="fSortType" value={filter.sortType} onChange={e => setSortType(e.target.value)}>
        <option value="team">Team</option>
        <option value="priority">Priority</option>
        <option value="createdAt">First Created</option>
        <option value="updatedAt">Recently Updated</option>
      </select>
      <label htmlFor="fOrder">Order By: </label>
      <select name="fOrder" value={filter.order} onChange={e => setOrder(e.target.value)}>
        <option value={1}>Ascending</option>
        <option value={-1}>Descending</option>
      </select>
      <label htmlFor="fResolved">Status: </label>
      <select name="fResolved" value={filter.active} onChange={e => setActive(e.target.value)}>
        <option value={false}>Active</option>
        <option value={true}>Resolved</option>
      </select>
      <button type="submit">Apply Filters</button> 
    </form>
    {children}
    {data["data"]?.map((ticket: TicketPreview) => <TicketPreview key={ticket._id} data={ticket} />)}
    <Link to={`?page=${filter.page >= 2 ? filter.page - 1 : filter.page}`}>Previous Page</Link>
    <div>{filter.page}</div>
    <Link to={`page=${data["data"].length >= (20 * filter.page) ? filter.page + 1 : filter.page}`}>Next Page</Link>
  </div>)
}
