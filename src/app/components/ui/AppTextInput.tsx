import { TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });

  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant="standard"
      color="warning"
      InputLabelProps={{
        sx: { color: "warning.main" },
      }}
      InputProps={{
        sx: { color: "white" },
      }}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
