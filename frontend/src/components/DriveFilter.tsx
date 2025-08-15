import { getFiles } from "../api/FileApi";
import { useQuery } from "@tanstack/react-query";
import { useQueryState, parseAsInteger } from "nuqs";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import FileCard from "./FileCard";

export default function DriveFilter() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [query, setQuery] = useQueryState("query", { defaultValue: "" });
  const [debouncedQuery] = useDebounce(query, 300);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["files", debouncedQuery, page],
    queryFn: () => getFiles({ query: debouncedQuery , page }),
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, setPage]);


  return (<div className="container">
    <section className="filter">
      <div>
        <label htmlFor="fQuery" className="default-label-style" >Search Keywords: </label>
        <input type="text" className="default-field-style" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" />
      </div>
    </section>
    <section className="tickets-layout">
      {isPending ? <div>Loading Drive...</div> : null}
      {isError ? <div>Error: {error.message}</div>: null}
      {data?.files && data.files.map((metadata: Metadata) => <FileCard key={metadata._id} data={metadata} />)}
    </section>
    <section className='page-counter'>
      <button className="page-button default-button-style" onClick={e => setPage(p => p - 1)} disabled={page === 1}>Previous Page</button>
      <div>{page}</div>
      <button className="page-button default-button-style" onClick={e => setPage(p => p + 1)} disabled={!data?.files || data.files.length < 20}>Next Page</button>
    </section>
  </div>)
}
