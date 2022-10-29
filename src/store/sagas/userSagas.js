/* eslint-disable prettier/prettier */
import { takeLatest, call, put } from "redux-saga/effects";
// import homeServices from '../services/';

import {
  login,
  loginSuccess,
  loginError,
  updateProfile,
  updateProfileSuccess,
  updateProfileError,
} from "../reducers/userSlice";

import { signInUser } from "../../services/APIs/users";
// import apis from '../../services/apis';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { showMessage, hideMessage } from "react-native-flash-message";

const storeUserAndTokens = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem("user", jsonValue);
    await AsyncStorage.setItem("access", data.access);
    await AsyncStorage.setItem("refresh", data.refresh);
  } catch (e) {
    // saving error
    console.log(e);
    alert("Error in storing data");
  }
};

function* loginFlow(action) {
  try {
    const response = yield call(signInUser, action.payload);
    console.log(response, "log in");
    // const {data:{data:{userdetail,usertypedetail}}} = response;
    // const {...response.data.data.usertypedetail, ...response.data.data.userdetail} = user;
    yield put(loginSuccess(response.data.data));
    yield call(storeUserAndTokens(response.data.data));
    // showMessage({
    //   message: "Login success !!!",
    //   type: "success",
    // });
    // yield call(storeTokens(response.data.data.token));
  } catch (errorPromise) {
    const error = yield errorPromise;
    yield put(loginError({ message: "Login" }));
    //  showMessage({
    //   message: "Login failed !!!",
    //   type: "danger",
    // });
    // yield put(eventListError(error));
    // console.log('error in user', error);
    // console.log('error in user', error.response);
  }
}

function* userWatcher() {
  yield takeLatest(login, loginFlow);
}

export default userWatcher;
