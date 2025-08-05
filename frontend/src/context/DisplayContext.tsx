import { createContext, useReducer, Dispatch, ReactNode } from 'react';

type State = {
  ticket: string;
  showTicketForm: boolean;
  showMemberForm: boolean;
  showDriveForm: boolean;
}

type Action = { 
  type: "LOAD_TICKET"; 
  payload: { 
    id: string; 
  }
} | { 
  type: "DISMISS_TICKET";
} | {
  type: "PREVIEW_TICKET_FORM";
} | {
  type: "DISMISS_TICKET_FORM";
} | {
  type: "PREVIEW_DRIVE_FORM";
} | {
  type: "DISMISS_DRIVE_FORM";
} | {
  type: "PREVIEW_MEMBER_FORM";
} | {
  type: "DISMISS_MEMBER_FORM";
} 

type ContextType = State & {
  dispatch: Dispatch<Action>; 
}

export const DisplayContext = createContext<ContextType | null>(null);

export const displayReducer = (state: State, action: Action) => {
  switch(action.type) {
    case "LOAD_TICKET":
      return { ...state, ticket: action.payload.id };
    case "DISMISS_TICKET":
      return { ...state, ticket: "" };
    case "PREVIEW_TICKET_FORM":
      return { ...state, showTicketForm: true };
    case "DISMISS_TICKET_FORM":
      return { ...state, showTicketForm: false };
    case "PREVIEW_MEMBER_FORM":
      return { ...state, showMemberForm: true };
    case "DISMISS_MEMBER_FORM":
      return { ...state, showMemberForm: false };
    case "PREVIEW_DRIVE_FORM":
      return { ...state, showDriveForm: true };
    case "DISMISS_DRIVE_FORM":
      return { ...state, showDriveForm: false };
    default:
      return state;
  }
} 

export const DisplayContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(displayReducer, {
    ticket: "",
    showTicketForm: false,
    showMemberForm: false,
    showDriveForm: false,
  });

  return (<DisplayContext.Provider value={{...state, dispatch}}>
    {children}
  </DisplayContext.Provider>)
}




