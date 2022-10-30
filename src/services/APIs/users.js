import apiHandler from "../helper";

export const registerUser = (data) => {
  return apiHandler("POST", "/auth/signup", false, false, data);
};

// export const signInUser = (data) => {
//   return apiHandler("POST", "/token/", false, false, data);
// };

export const signInUser = (data) => {
  return apiHandler("POST", "/users/mobile/login/", false, false, data);
};

export const userKYCForm = (data, id) => {
  return apiHandler("POST", "/kyc/", false, false, data, id);
};

export const socialSignIn = (data) => {
  return apiHandler("POST", "/social-login/", true, false, data);
};

// export const getProfile = (data) => {
//   return apiHandler("get", "/users/mobile/profile/", true, false, data);
//   // export const socialSignIn = data => {
//   //   return apiHandler('POST', '/social-login/', true, false, data);
// };
export const getChecklistData = ({ id }) => {
  return apiHandler("GET", `/users/checklist`, true, false, null, {
    page: id,
  });
};

export const getChecklistDetails = ({ id }) => {
  return apiHandler("GET", `/users/checklist/${id}/detail`, true, false);
};

export const userFeedback = (data) => {
  return apiHandler("POST", "/users/feedback/", true, false, data);
};

export const getUserFeedback = ({ id }) => {
  return apiHandler("GET", "/users/feedback/", true, false, null, {
    page: id,
  });
};

export const getProfile = (data) => {
  return apiHandler("get", "/users/mobile/profile/", true, false, null, data);
};

export const verifyAccount = (data) => {
  return apiHandler("PATCH", "/users/mobile/profile/", true, false, data);
};

export const changeProfileName = (data) => {
  return apiHandler("PATCH", "/users/mobile/profile/", true, true, data);
};

export const changePhoneNumber = (data) => {
  return apiHandler("PATCH", "/users/mobile/profile/", true, true, data);
};

export const changeProfilePicture = (data) => {
  return apiHandler("PATCH", "/users/mobile/profile/", true, true, data);
};

export const changeUsername = (data) => {
  return apiHandler("PATCH", "/users/mobile/profile/", true, false, data);
};

export const setFirebaseToken = (data) => {
  return apiHandler("POST", "/users/mobile/verify/", true, false, data);
};
