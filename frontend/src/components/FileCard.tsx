import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDownloadFile from "../hooks/useDownloadFile";
import { deleteFile } from "../api/FileApi";
import useAuthContext from "../hooks/useAuthContext";
import type { FormEvent } from "react";

export default function FileCard({ data }) => {
  const { id } = useAuthContext(); 
  const queryClient = useQueryClient();
  const { mutate, isPending: removalPending, isError, error } = useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["files"]);
    },
  });
  
  const handleRemoval = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(data._id);
  }

  return (<article>
    <span>{isError ? error.message : ""}</span>
    {Object.entries(data).map(([key, value]) => (
      <div>{key} - {value}</div>
    ))}
    <button onClick={}>Download File</button>
    <button onClick={handleRemoval} disabled={data && (id !== data.user_id)}>{removalPending ?"Deleting File" :"Remove File"}</button>
  </article>);
}
