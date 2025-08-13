import { deleteTicket } from "../api/TicketApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDisplayContext from "../hooks/useDisplayContext";
import useSelectRole from "../hooks/useSelectRole";
import useAuthContext from "../hooks/useAuthContext";

export default function TicketPreview({ data }: { data: TicketPreview }) {
  const { _id, title, priority, issued_user, updatedAt, team, resolved } = data;
  const queryClient = useQueryClient();
  const { dispatch } = useDisplayContext();
  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    }
  });
  const { username } = useAuthContext();
  const { selectRole } = useSelectRole();

  return (<div className="card-container" onClick={e => {
      dispatch({ type: "LOAD_TICKET", payload: { id: _id } });
    }}>
      <div className="upper-container">
        <div className="image-container">
          <img src={selectRole(team)} alt="team icon" />
        </div>
      </div>

      <div className="lower-container">
        <div className="headers">
          <h3>{issued_user}</h3>
          <h4>{title}</h4>
        </div>
        <div>
          <div className="information-box">
            <p>
              Priority Level: {priority}
            </p>
            <p>
              Resolution Status: {`${resolved}`}
            </p>
            <p>
              Last Checked On: {updatedAt.toString()} 
            </p>
          </div>
        </div>
        <div>
          <button disabled={issued_user !== username} className="default-button-style" onClick={e => {
            e.stopPropagation();
            mutate(_id);
          }}>{isPending ? "Closing Ticket..." :"Resolve Ticket"}</button>
          <span>{isError ? error.message : ""}</span>
        </div>
      </div>
    </div>);
  
  // 
  //   <div>Title: {title}</div>
  //   <div>Priority: {priority}</div>
  //   <div>Ticket ID: {_id}</div>
  //   <div>Team: {team}</div>
  //   <div>Last Updated: {updatedAt.toString()}</div>
  //   <div>Is Resolved: {`${resolved}`}</div>
  //   <div>Are you the Issued User? {`${issued_user === username}`}</div>
  //   
}
