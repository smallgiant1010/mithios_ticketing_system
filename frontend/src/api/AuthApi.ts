type UserData = {
  username: string;
  email: string;
  password: string;
  role: string;
}

export const postSignup = async (data: UserData) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export const getUserInfo = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_PREFIX}/auth/retrieveUserInfo`, {
    credentials: "include",
  });

  return response.json();
}


