import { all } from "redux-saga/effects";
import userSaga from "./sagas/userSagas";
export default function* watcherAll() {
  yield all([userSaga()]);
}
