import { useEffect, createContext, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';

type State = {
  username: string;
  id: string;
  role: string;
}

type Action = {
  type: "LOGIN",
  payload: State
} | {
  type: "LOGOUT";
}

type ContextType = State & {
  dispatch: Dispatch<Action>;
}

export const AuthContext = createContext<ContextType | null>(null);

export const authReducer = (state: State, action: Action) => {
  if(action.type === "LOGIN") return { username: action.payload.username, id: action.payload.id, role: action.payload.role };
  else if(action.type === "LOGOUT") return { username: "", id: "", role: "" }
  else return state;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    username: "",
    id: "",
    role: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (<AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
