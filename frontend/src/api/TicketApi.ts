export const postTicket = async (formData: FormData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/create`, {
    method: "POST",
    credentials: "include",   
    body: formData
  });
 
  const data = await response.json();
  return {
    ...data,
    status: response.status,  
  };
}

export const getTickets = async (filter: TicketFilter) => {
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(filter).map(([key, value]) => [key, String(value)])));
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/getPage?${queryParams.toString()}`, {
    credentials: "include",
  });

  const data = await response.json();
  return {
    data,
    status: response.status,  
  };
}

export const getSpecificTicket = async (id: string) => { 
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/getSpecific?id=${id}`, {
    credentials: "include",
  });
    
  const data = await response.json();
  return {
    ...data,
    status: response.status,  
  };
}

export const getUserTickets = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/user`, {
    credentials: "include",
  });
 
  const data = await response.json();
  return {
    data,
    status: response.status,  
  };
}

export const deleteTicket = async (id: string) => {
  const queryParams = new URLSearchParams({ id });
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/remove?${queryParams.toString()}`, {
    method: "DELETE",
    credentials: "include",
  });
   
  const data = await response.json();
  return {
    ...data,
    status: response.status,  
  };
}

export const updateTicket = async (id: string, mods: TicketDetails ) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/update?${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    credentials: "include",
    body: JSON.stringify(mods),
  });

  const data = await response.json();
  return {
    ...data,
    status: response.status,  
  };
}
