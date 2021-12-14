import { AppDispatch, ReduxStore } from "@store/types";

export interface IAsyncThunkConfig {
  state: ReduxStore;
  dispatch: AppDispatch;
}
