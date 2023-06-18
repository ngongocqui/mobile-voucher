import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  phone: "",
  email: "",
  avatar: "",
  token: "",
  gender: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileInfo: (state, action) => {
      const fields = action.payload;
      Object.keys(fields).map((k) => {
        state[k] = fields[k];
      });
    },
    resetProfile: () => initialState,
  },
});

export const { updateProfileInfo, resetProfile } = profileSlice.actions;

export const profileInfo = (state) => state.profile;

export default profileSlice.reducer;
