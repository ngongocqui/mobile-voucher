import API from "../utils/request";

export const getStores = (params) => {
  return API.get(`stores`, {
    params,
  });
};
