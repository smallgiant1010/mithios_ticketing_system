export const postSignup = async (userData: UserData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return {
    ...data,
    status: response.status,  
  };
}

export const getUserInfo = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/retrieveUserInfo`, {
    credentials: "include",
  });
  
  const data = await response.json();
  return {
    ...data,
    status: response.status,  
  };
}

export const getAllUsers = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/users`, { credentials: "include" });

  const data = await response.json();
  return {
    ...data,
    status: response.status,
  }
}
