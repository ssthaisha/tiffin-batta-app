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
  return apiHandler("GET", `/subscribe/list/${chefId}`, false, false);
};

export const acceptSubscriptionRequest = ({ id }) => {
  return apiHandler("GET", `/subscribe/approve/${id}`, false, false);
};

export const updateMyLocation = ({
  chefId,
  customerId,
  latitude,
  longitude,
}) => {
  return apiHandler(
    "POST",
    `/locations/update/${chefId}/${customerId}`,
    false,
    false,
    { latitude, longitude }
  );
};
