import { useQueryState } from 'nuqs';

export default function useTicketFilter() {
  const [query, setQuery] = useQueryState('query', { default: "" });
  const [sortType, setSortType] = useQueryState('sortType', { default: "createdAt" });
  const [order, setOrder] = useQueryState('order', { default: -1 });
  const [active, setActive] = useQueryState('active', { default: true });
  const [page, setPage] = useQueryState('page', { default: 1 });

  return {
    filters: { query, sortType, order, active, page },
    setters: { setQuery, setSortType, setOrder, setActive, setPage },
  }
}
