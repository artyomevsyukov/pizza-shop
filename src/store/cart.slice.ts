import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(i => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map(i => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    },
    // decrease: (state, action: PayloadAction<number>) => {
    //   state.items.map(i => {
    //     if (i.id === action.payload && i.count > 0) {
    //       i.count -= 1;
    //     }
    //     return i;
    //   });
    // },
    decrease: (state, action: PayloadAction<number>) => {
      const existed = state.items.find(i => i.id === action.payload);
      if (!existed) {
        return;
      }
      if (existed.count === 1) {
        state.items = state.items.filter(i => i.id !== action.payload);
      } else {
        state.items.map(i => {
          if (i.id === action.payload) {
            i.count -= 1;
          }
          return i;
        });
        return;
      }
    },

    delete: (state, action: PayloadAction<number>) => {
      console.log("delete: ", action.payload);
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
