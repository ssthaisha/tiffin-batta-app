import apiHandler from "../helper";

export const getActiveChefs = () => {
  return apiHandler("GET", `/chefs/active`, false, false, null, {});
};

export const subscribeToChef = ({ id, chefId, periodId }) => {
  return apiHandler(
    "GET",
    // `/subscribe/`,
    `/subscribe/${id}/${chefId}/${periodId}`,
    false,
    false,
    null
  );
};

export const getSubscribersList = ({ chefId }) => {
  return apiHandler("GET", `/subscribe/list`, false, false);
};
