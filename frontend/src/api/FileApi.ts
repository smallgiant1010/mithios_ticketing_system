type Filter = {
  query: string;
  page: number;
}

export const getFiles = async (filter: Filter) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/files`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
    body: JSON.stringify(filter),
  });

  return response.json();
}

export const postFiles = async (formData: FormData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/upload`, {
    method: "post",
    credentials: "include",
    body: formdata
  });

  return response.json();
}

export const deleteFile = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/file/delete/${id}`, { credentials: "include" });

  return response.json();
}


