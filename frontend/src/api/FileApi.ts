export const getFiles = async (filter: FileFilter) => {
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(filter).map(([key, value]) => [key, String(value)])));
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/files?${queryParams.toString()}`, {
    credentials: "include",
  });

  const data = await response.json(); 
  return {
    ...data,
    status: response.status,  
  };
}

export const postFiles = async (formData: FormData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/upload`, {
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

export const deleteFile = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/delete/${id}`, { 
    method: "DELETE",
    credentials: "include",
  }); 

  const data = await response.json(); 
  return {
    ...data,
    status: response.status,  
  };
}

export const downloadFile = async (fileName: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/download/${fileName}`, {
    credentials: "include",
  });

  return {};
}
