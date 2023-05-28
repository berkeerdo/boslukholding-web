import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  message?: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <CircularProgress size={100} color="secondary" />
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
