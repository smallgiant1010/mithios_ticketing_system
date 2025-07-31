export const postTicket = async (formData: FormData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/create`, {
    method: "POST",
    credentials: "include",   
    body: formData
  });

  return response.json();
}

type Filter = {
  query: string;
  sortType: string;
  order: number;
  page: number;
}

export const getTickets = async (filter: Filter) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/getPage`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  });

  return response.json();
}

export const getSpecificTicket = async (id: string) => { 
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/getSpecific?${id}`, {
    credentials: "include",
  });
  
  return response.json();
}

export const getUserTickets = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/user`, {
    credentials: "include",
  });

  return response.json();
}

export const deleteTicket = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/remove?${id}`, {
    credentials: "include",
  });
  
  return response.json();
}

type Modifications = {
  title: string;
  priority: number;
  team: string;
}

export const updateTicket = async (id: string, mods: Modifications ) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/update?${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    credentials: "include",
    body: JSON.stringify(mods),
  });

  return response.json();
}
