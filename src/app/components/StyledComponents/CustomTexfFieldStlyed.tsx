import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: white; // Etiketin odaklandığında renk
  }
  .MuiInputBase-input {
    color: white; // Giriş alanının rengi
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white; // Kenarlık rengi
    }
    &:hover fieldset {
      border-color: #ff6f00; // Kenarlık rengi hover durumunda
    }
    &.Mui-focused fieldset {
      border-color: #ff6f00; // Kenarlık rengi odaklandığında
    }
  }
  & .MuiInputLabel-root {
    color: white; // Etiket rengi
  }
`;
