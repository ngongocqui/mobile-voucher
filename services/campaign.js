import API from "../utils/request";

export const getCampaigns = (params) => {
  return API.get(`campaigns`, {
    params,
  });
};
