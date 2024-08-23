import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  chat: {
    from?: "user" | "assistant";
    loading?: boolean;
    text?: string;
    fileId?: string[];
    isSummary?: boolean;
    audio?: HTMLAudioElement;
    files?: any;
    messageId?: string;
  }[];
  toggle: boolean;
  collapsed: boolean;
  broken: boolean;
} = {
  chat: [],
  toggle: false,
  collapsed: false,
  broken: false,
};

const BotSlice = createSlice({
  name: "BotSlice",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setBroken: (state, action) => {
      state.broken = action.payload;
    },
  },
});

export const { setChat, setToggle, setCollapsed, setBroken } = BotSlice.actions;

export default BotSlice.reducer;
