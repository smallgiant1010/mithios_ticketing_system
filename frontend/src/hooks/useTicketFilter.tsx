import { useQueryState, parseAsInteger, parseAsBoolean } from 'nuqs';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';

export default function useTicketFilter() {
  const [query, setQuery] = useQueryState('query', { defaultValue: "" });
  const [localQuery, setLocalQuery] = useState(query);
  const [debouncedQuery] = useDebounce(localQuery, 300);

  const [sortType, setSortType] = useQueryState('sortType', { defaultValue: "createdAt" });
  const [order, setOrder] = useQueryState('order', parseAsInteger.withDefault(-1));
  const [resolved, setResolved] = useQueryState('resolved', parseAsBoolean.withDefault(false));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  useEffect(() => {
    if(debouncedQuery !== query) setQuery(debouncedQuery);
    setPage(1);
  }, [query, debouncedQuery, setQuery, setPage]);

  useEffect(() => {
    setLocalQuery(query);
  }, [query, setLocalQuery]);

  return {
    filters: { query, localQuery, sortType, order, resolved, page },
    setters: { setLocalQuery, setSortType, setOrder, setResolved, setPage },
  }
}
