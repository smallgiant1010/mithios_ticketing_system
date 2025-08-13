import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, FormEvent } from "react";
import { postFiles } from "../api/FileApi";
import useAuthContext from "../hooks/useAuthContext";
import useDisplayContext from "../hooks/useDisplayContext";

export default function DriveForm() {
  const { username, id } = useAuthContext(); 
  const queryClient = useQueryClient();
  const [metadata, setMetadata] = useState({
    bundleName: "",
    phase: "any",
    username: "",
    user_id: "",
  });
  const [files, setFiles] = useState<File[]>([]); 
  useEffect(() => console.log(files), [files]);

  const [fileError, setFileError] = useState("");
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: (formData: FormData) => postFiles(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });

  useEffect(() => {
    setMetadata(prev => {
      if(prev.username === username && prev.user_id === id) return prev;
      return { ...prev, username, user_id: id };
    });
    console.log("Updating metadata with:", username, id);
  }, [username, id, setMetadata]);

  const { dispatch } = useDisplayContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("metadata", JSON.stringify(metadata));
    for(const blob of files) {
      formData.append("files", blob);
    }
    const response = await mutateAsync(formData);
    if(response && response.status === 200) {
      dispatch({ type: "DISMISS_DRIVE_FORM" });
    }
  }

  return (<form className="default-form-style" onSubmit={handleSubmit}>
    <div>
    <label htmlFor="fTitle" className="default-label-style">Name of File Bundle</label>
    <input name="fTitle" type="text" className="default-field-style" value={metadata.bundleName} onChange={e => setMetadata(prev => ({ ...prev, bundleName: e.target.value }))}/>
    </div>

    <div>
    <label htmlFor="fPhase" className="default-label-style">Phase</label>
    <select name="fPhase" className="default-select-style" value={metadata.phase} onChange={e => setMetadata(prev => ({ ...prev, phase: e.target.value }))}>
      <option value="phase 1">Phase 1</option>
      <option value="phase 2">Phase 2</option>
      <option value="phase 3">Phase 3</option>
      <option value="any">Any Phase</option>
    </select>
    </div>

    <div>
    <label htmlFor="fileUploads">Files: </label>
    <input type="file" className="default-file-style" onChange={e => {
      if(e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files);
        if(files.length + newFiles.length <= 10) setFiles(prev => ([...prev, ...newFiles]));
        else setFileError("A maximum of 10 files are allowed at once.");
      }
    }} />
    <span>{fileError}</span>
    </div>

    <div>
      <button onClick={e => dispatch({ type: "DISMISS_DRIVE_FORM" })}>
        Cancel
      </button>
      <button type="submit">{isPending ? "Uploading Files..." : "Upload Files"}</button>
      <span>{data && (Object.hasOwn(data, "error") ? data["error"] : "")}</span>
    </div>
  </form>)
}
