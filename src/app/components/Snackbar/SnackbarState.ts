export interface SnackbarState {
  open: boolean;
  message: string;
}

export interface ShowSnackbarAction {
  type: "SHOW_SNACKBAR";
  payload: string;
}

export interface HideSnackbarAction {
  type: "HIDE_SNACKBAR";
}

export type SnackbarActionTypes = ShowSnackbarAction | HideSnackbarAction;
