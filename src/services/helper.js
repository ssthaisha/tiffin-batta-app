import axios from "axios";
// import {API_URL} from 'config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, API_URL5 } from "../constants";
const axiosApiInstance = axios.create();
// Response interceptor for API calls

const logout = async () => {
  try {
    const fblogout = await auth()?.signOut();
    console.log(fblogout, "logouttt");
    const rs = await AsyncStorage.removeItem("user");
    // const lang = await AsyncStorage.removeItem("language");
    console.log(lang, "check lang");
    dispatch(setUser(null));
    console.log(rs, "check rs");
    const b = await AsyncStorage.setItem("loggedIn", "yes");
  } catch (err) {
    console.log(err, "error tira");
    const rs = await AsyncStorage.removeItem("user");
    const b = await AsyncStorage.setItem("loggedIn", "yes");
    dispatch(setUser(null));
  }
};
async function refresh_token() {
  console.log("Refreshing access token");
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    let res = await axios.post(
      "https://dev-safetyknot-api.ideabreed.net/api/v1/token/refresh/",
      { refresh: refreshToken }
    );
    console.log(res, "refresh responce");
    //save token in asyncStorage
    // const res1 = await AsyncStorage.setItem(
    //   "refreshToken",
    //   refresh_token
    // );
    // const res2 = await AsyncStorage.setItem(
    //   "accessToken",
    //   access_token
    // );
  } catch (e) {
    try {
      const fblogout = await auth()?.signOut();
      console.log(fblogout, "logouttt");
      const rs = await AsyncStorage.removeItem("user");
      // const lang = await AsyncStorage.removeItem("language");
      console.log(lang, "check lang");
      dispatch(setUser(null));
      console.log(rs, "check rs");
      const b = await AsyncStorage.setItem("loggedIn", "yes");
    } catch (err) {
      console.log(err, "error tira");
      const rs = await AsyncStorage.removeItem("user");
      const b = await AsyncStorage.setItem("loggedIn", "yes");
      dispatch(setUser(null));
    }
  }
}

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      console.log("errors", await refresh_token());

      originalRequest._retry = true;
      const access_token = await refreshAccessToken(); // imp
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

const getHeader = async (auth, form) => {
  let header = {};
  if (auth) {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        header = {
          Authorization: `Bearer ${token}`,
        };
      }
    } catch (e) {
      // Restoring token failed
    }
  }
  if (!form) {
    header = {
      ...header,
      "Content-Type": "application/json",
    };
  } else {
    header = {
      ...header,
      "Content-Type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    };
  }
  // Accept: 'multipart/form-data',

  return header;
};

/**
 * Create Axios Request handler
 * @param requestType
 * @param url
 * @param auth
 * @param form
 * @param {object} data
 * @param params
 */
const apiHandler = async (
  requestType,
  url,
  auth,
  form,
  data = undefined,
  params = undefined,
  onUploadProgress = undefined
) => {
  const headers = await getHeader(auth, form);
  return axiosApiInstance({
    baseURL: API_URL5,
    url,
    method: requestType,
    headers,
    data,
    params,
    onUploadProgress,
  });
};

export default apiHandler;
