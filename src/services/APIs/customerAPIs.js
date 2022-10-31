import apiHandler from "../helper";

export const getActiveChefs = () => {
  return apiHandler("GET", `/chefs/active`, false, false, null, {});
};
