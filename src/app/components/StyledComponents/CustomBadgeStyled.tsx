import { Badge, styled } from "@mui/material";

export const SmallBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    fontSize: 10, // Küçültmek istediğiniz boyutu buradan ayarlayabilirsiniz
    minWidth: 12,
    height: 12,
    padding: "0 3px",
  },
}));
