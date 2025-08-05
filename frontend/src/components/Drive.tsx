import DriveFilter from "./DriveFilter";
import DriveForm from "./DriveForm";
import useDisplayContext from "../hooks/useDisplayContext";
import useAuthContext from "../hooks/useAuthContext";

export default function Drive() {
  const { showDriveForm, dispatch } = useDisplayContext();
  const { role } = useAuthContext();

  return(<div>
    <button disabled={role === "Any"} onClick={e => dispatch({ type: "PREVIEW_DRIVE_FORM" })}>
      Add Files
    </button>
    {showDriveForm && <DriveForm />}
    <DriveFilter />
  </div>);
}
