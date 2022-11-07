import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const checkUserSession = createAsyncThunk(
  "user/check-session",
  async (thunkAPI) => {
    try {
      const user = await getCurrentUser();
      const userSnapshot = await createUserDocumentFromAuth(user);
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSignUp = createAsyncThunk(
  "user/register",
  async ({ email, password, displayName }, thunkAPI) => {
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(email, password, displayName);
      const userAuth = userCredential.user;
      const userSnapshot = await createUserDocumentFromAuth(userAuth, {
        displayName,
      });
      console.log(userSnapshot);
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSignInEmail = createAsyncThunk(
  "user/log-in",
  async ({ email, password }, thunkAPI) => {
    try {
      const userAuth = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(userAuth);
      const userSnapshot = await createUserDocumentFromAuth(userAuth.user);

      return { id: userSnapshot.id, ...userSnapshot.data() };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSignInGoogle = createAsyncThunk(
  "user/google",
  async (thunkAPI) => {
    try {
      const userAuth = await signInWithGooglePopup();

      const user = userAuth.user;

      const userSnapshot = await createUserDocumentFromAuth(user);

      return { id: userSnapshot.id, ...userSnapshot.data() };
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSignOut = createAsyncThunk(
  "user/log-out",
  async (thunkAPI) => {
    try {
      return await signOutUser();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducer: {},
  extraReducers: (builder) => {
    builder
      //checkUserSession
      .addCase(checkUserSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) //signUp
      .addCase(userSignUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) //signInEmail
      .addCase(userSignInEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignInEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(userSignInEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) //signInGoogle
      .addCase(userSignInGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignInGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(userSignInGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }) //signOut
      .addCase(userSignOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(userSignOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
