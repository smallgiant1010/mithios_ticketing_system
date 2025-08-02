import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, FormEvent } from "react";
import { postFiles } from "../api/FileApi";
import useAuthContext from "../hooks/useAuthContext";

export default function DriveForm() {
  const {username, id} = useAuthContext();
  const queryClient = useQueryClient();
  const [metadata, setMetadata] = useState({
    filename: "",
    phase: "",
    username,
    user_id: id,
  });
  const [files, setFiles] = useState([]);
  const { mutate, isPending, data } = useMutation({
    mutationFn: (formData: FormData) => postFiles(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["files"]);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("filename", metadata.filename);
    formData.append("phase", metadata.phase);
    for(const blob of files) {
      formData.append("files", blob);
    }
    mutate(formData);
  }

  return (<form className="default-form-style" onSubmit={handleSubmit}>
    <label htmlFor="fTitle" className="default-label-style">Title</label>
    <input name="fTitle" type="text" className="default-field-style" value={metadata.filename} onChange={e => setMetadata(prev => ({ ...prev, filename: e.target.value }))}/>
    <label htmlFor="fPhase" className="default-label-style">Phase</label>
    <select name="fPhase" className="default-select-style" value={metadata.phase} onChange={e => setMetadata(prev => ({ ...prev, phase: e.target.value }))}>
      <option value="phase 1">Phase 1</option>
      <option value="phase 2">Phase 2</option>
      <option value="phase 3">Phase 3</option>
      <option value="any">Any Phase</option>
    </select>
    <label htmlFor="fileUploads">Files: </label>
    <input type="file" className="default-file-style" value={files} onChange={e => {
      if(e.target.files && e.target.files.length > 9) {
        const files = Array.from(e.target.files);
        setFiles(prev => ([...prev, ...files]));
      }
    }}
    <button type="submit">{isPending ? "Uploading Files..." : "Upload Files"}</button>
    <span>{data && (Object.hasOwn(data, "error") ? data["error"] : "")}</span>
  </form>)
}
