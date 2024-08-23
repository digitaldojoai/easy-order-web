import { combineReducers } from "@reduxjs/toolkit";
import { mainApi } from "../rtk-query";
import BotSlice from "./chat-bot/redux/redux";

const reducers = combineReducers({
  BotSlice: BotSlice,
  [mainApi.reducerPath]: mainApi.reducer,
});

export default reducers;
