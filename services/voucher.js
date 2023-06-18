import API from "../utils/request";

export const createVoucher = (token, body) => {
  return API.post(`vouchers`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
