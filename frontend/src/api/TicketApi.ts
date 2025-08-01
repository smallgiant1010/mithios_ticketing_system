export const postTicket = async (formData: FormData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/create`, {
    method: "POST",
    credentials: "include",   
    body: formData
  });
 
  return {
    ...response.json(),
    status: response.status,  
  };
}

export const getTickets = async (filter: FileFilter) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/getPage`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  });

  return {
    ...response.json(),
    status: response.status,  
  };
}

export const getSpecificTicket = async (id: string) => { 
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/getSpecific?${id}`, {
    credentials: "include",
  });
    
  return {
    ...response.json(),
    status: response.status,  
  };
}

export const getUserTickets = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/user`, {
    credentials: "include",
  });
 
  return {
    ...response.json(),
    status: response.status,  
  };
}

export const deleteTicket = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/ticket/remove?${id}`, {
    credentials: "include",
  });
   
  return {
    ...response.json(),
    status: response.status,  
  };
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


  return {
    ...response.json(),
    status: response.status,  
  };
}
