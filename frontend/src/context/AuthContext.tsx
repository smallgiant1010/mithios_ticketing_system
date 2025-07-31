import { createContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';

type State = {
  username: string;
  id: string;
}

type Action = {
  type: "LOGIN",
  payload: State
} | {
  type: "LOGOUT";
}

type ContextType = {
  dispatch: Dispatch<Action>;
  username: string;
  id: string;
}

export const AuthContext = createContext<ContextType | null>(null);

export const authReducer = (state: State, action: Action) => {
  switch(action.type) {
    case "LOGIN":
      return { username: action.payload.username, id: action.payload.id };
    case "LOGOUT":
      return { username: "", id: ""}
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    username: "",
    id: "",
  });

  return (<AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
