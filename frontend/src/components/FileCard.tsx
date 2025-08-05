import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFile, downloadFile } from "../api/FileApi";
import useAuthContext from "../hooks/useAuthContext";
import { MouseEvent, useState } from "react";

export default function FileCard({ data }: { data: Metadata }) {
  const { id } = useAuthContext(); 
  const [fileDownloadError, setFileDownloadError] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending: removalPending, isError, error } = useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  const handleRemoval = (e: MouseEvent<HTMLButtonElement>) => {
    mutate(data._id);
  }

  const handleDownload = async (e: MouseEvent<HTMLButtonElement>) => {
    const returnName = data.filename.split("=")[1];  
    const json = await downloadFile(data.filename, returnName);
    if(Object.hasOwn(json, "error")) {
      setFileDownloadError(json.error);
    };
  }

  return (<article>
    <span>{isError ? error.message : ""}</span>
    {Object.entries(data).map(([key, value], idx) => (
      <div key={idx}>
        {key} - {String(value)}
      </div>)
    )}
    <button onClick={handleDownload}>Download File</button>
    <span>{fileDownloadError}</span>
    <button onClick={handleRemoval} disabled={data && (id !== data.metadata.user_id)}>{removalPending ?"Deleting File" :"Remove File"}</button>
  </article>);
}
