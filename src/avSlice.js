import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
      img: "https://pixabay.com/images/download/microphone-1074362_640.jpg",
      name: "Projectors",
      cost: 200,
      quantity: 0,
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_640.jpg",
      name: "Speaker",
      cost: 35,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/microphone-1074362_640.jpg",
      name: "Microphones",
      cost: 45,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/whiteboard-849812_640.jpg",
      name: "Whiteboards",
      cost: 80,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/signage-1063070_640.jpg",
      name: "Signage",
      cost: 80,
      quantity: 0,
    },
  ],
  reducers: {
    incrementAvQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity < 10) {
        state[index].quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
