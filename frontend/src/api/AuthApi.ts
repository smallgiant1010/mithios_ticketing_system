export const postSignup = async (...UserData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return {
    ...response.json(),
    status: response.status,  
  };
}

export const getUserInfo = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/retrieveUserInfo`, {
    credentials: "include",
  });
  
  return {
    ...response.json(),
    status: response.status,  
  };
}


