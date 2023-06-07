import React, { forwardRef, Ref, useRef } from "react";
import { RootState } from "../../store/configureStore";
import { hideSnackbar } from "./snackBarSlice";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (props: SnackbarProps, ref: Ref<HTMLDivElement>) => {
    const { children } = props;

    return <div ref={ref}>{children}</div>;
  }
);

const SnackbarComponent: React.FC = () => {
  const snackbar = useAppSelector((state: RootState) => state.snackbar);
  const dispatch = useAppDispatch();
  const snackbarRef = useRef(null);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={10000}
        onClose={handleClose}
        ref={snackbarRef}
      >
        <CustomSnackbar>
          <Alert onClose={handleClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </CustomSnackbar>
      </Snackbar>
    </>
  );
};

export default SnackbarComponent;
