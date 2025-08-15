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

  return (<article className="file-card">
    <span>{isError ? error.message : ""}</span>
    <div className="card-headers">
      <img src="/images/file.png" alt="file icon"/>
      <h3>{data.metadata.username}</h3>
    </div>
    <div className="file-info">
      <p>File Name: {data.filename.split("=")[1]}</p>
      <p>Phase Correlation: {data.metadata.phase}</p>
      <p>Bundle Name: {data.metadata.bundleName}</p>
      <p>Uploaded At: {data.uploadDate.toString()}</p>
    </div>
    <div className="dual-button-layout">
      <button className="default-button-style" onClick={handleDownload}>Download File</button>
      <button className="default-button-style" onClick={handleRemoval} disabled={data && (id !== data.metadata.user_id)}>{removalPending ?"Deleting File" :"Remove File"}</button>
    </div>
    <span>{fileDownloadError}</span>
  </article>);
}
