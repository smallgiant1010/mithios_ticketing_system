import DriveFilter from "./DriveFilter";
import DriveForm from "./DriveForm";
import useDisplayContext from "../hooks/useDisplayContext";
import useAuthContext from "../hooks/useAuthContext";
import { MouseEvent } from "react";

export default function Drive() {
  const { showDriveForm, dispatch } = useDisplayContext();
  const { role } = useAuthContext();

  const handleOverlayDriveClick = (e: MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      dispatch({ type: "DISMISS_DRIVE_FORM" });
    }
  }

  return(<div id="drive-page">
    <button className="default-button-style" disabled={role === "Any"} onClick={e => dispatch({ type: "PREVIEW_DRIVE_FORM" })}>
      Add Files
    </button>
    {showDriveForm && (<div className="modal-overlay" onClick={handleOverlayDriveClick}>
      <DriveForm />
    </div>)}
    <DriveFilter />
  </div>);
}
