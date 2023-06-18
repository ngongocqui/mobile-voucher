import API from "../utils/request";

export const registerUser = (body) => {
  return API.post(`users/register`, body);
};

export const loginUser = (body) => {
  return API.post(`auth/login`, body);
};

export const getProfile = (token) => {
  return API.get(`auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
