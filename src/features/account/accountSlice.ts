import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { setBasket } from "../basket/basketSlice";
import { store } from "../../app/store/configureStore";
import { showSnackbar } from "../../app/components/Snackbar/snackBarSlice";
import { SavedAdress } from "../../app/models/address";
import { UpdateUserDto } from "../../app/models/updateuser";

interface AccountState {
  user: User | null;
  updateUserDto: UpdateUserDto | null;
  savedAdress: SavedAdress | null;
  status: string;
}

const initialState: AccountState = {
  user: null,
  updateUserDto: null,
  savedAdress: null,
  status: "idle",
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const userDto = await agent.Account.current();
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const fetchSavedAddress = createAsyncThunk<SavedAdress>(
  "account/fetchSavedAddress",
  async (_, thunkAPI) => {
    try {
      const address = await agent.Account.savedAdress();
      return address;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateUser = createAsyncThunk<User, UpdateUserDto>(
  "account/updateUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.updateProfile(data);
      const { basket, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOutUser: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      router.navigate("/");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      store.dispatch(
        showSnackbar({ message: "Your session expired", severity: "error" })
      );
      router.navigate("/");
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "idle";
    });
    builder.addCase(updateUser.pending, (state) => {
      state.status = "updating";
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.status = "idle";
      console.log("error");
    });
    builder.addCase(fetchSavedAddress.fulfilled, (state, action) => {
      state.savedAdress = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchSavedAddress.pending, (state) => {
      state.status = "fetchingAdress";
    });
    builder.addCase(fetchSavedAddress.rejected, (state) => {
      state.savedAdress = null;
      state.status = "idle";
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
        setUser(action.payload);
      }
    );
    builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
      throw action.payload;
    });
  },
});

export const { signOutUser, setUser } = accountSlice.actions;
