import { getFiles } from "../api/FileApi";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import FileCard from "./FileCard";

export default function DriveFilter() {
  const [page, setPage] = useQueryState("page", { default: 1 });
  const [query, setQuery] = useQueryState("query", { default: "" });
  const [applyFilters, setApplyFilters] = useState(true);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["files", query, page],
    queryFn: () => getFiles({ query, page }),
    enabled: applyFilters,
    onSuccess: () => setApplyFilters(false),
  });

  if(isPending) {
    return <div>Loading Drive...</div>
  }

  if(isError) {
    return <div>Error: {error.message}</div>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplyFilters(true);
    setPage(1);
  }

  return (<div>
    <form className="default-form-style" onSubmit={handleSubmit}>
      <label htmlFor="fQuery" className="default-label-style" >Search Keywords: </label>
      <input type="text" className="default-field-style" value={query} onChange=(e => setQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
    {data?.length > 0 && data.map((metadata) => <FileCard key={metadata._id} data={metadata} />)}
    <Link to={`?page=${page >= 2 ? page - 1 : page}`}>Previous Page</Link>
    <div>{page}</div>
    <Link to={`?page=${data.length > (20 * page) ? page + 1 : page}`}>Next Page</Link>
  </div>)
}
