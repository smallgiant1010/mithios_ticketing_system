import { createContext, useReducer, ContextProvider } from 'react';

export const displayContext = createContext<string>("");

export const displayReducer = (state: { ticket: string }, action: ({ type: "PREVIEW", payload: { id: string } } | { type: "DISMISS" })) => {
  if(action.type === "PREVIEW") return { ticket: action.payload.id };
  else if(action.type === "DISMISS") return { ticket: "" };
  else return state;
}

export const DisplayContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(displayReducer, {
    ticket: "",
  });

  return (<DisplayContext.Provider value={{...state, dispatch}}>
    {children}
  </DisplayContext.Provider>)
}




