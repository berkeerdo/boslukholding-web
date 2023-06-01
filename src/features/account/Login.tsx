/* eslint-disable @typescript-eslint/no-unused-vars */
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { RiLock2Fill } from "react-icons/ri";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)`
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

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  //   async function submitForm(data: FieldValues) {
  //     try {
  //       await dispatch(signInUser(data));
  //       navigate(location.state?.from || "/catalog");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        p: 4,
      }}
      className="bg-customBackground text-gray-200 shadow-lg rounded-lg"
    >
      <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
        <RiLock2Fill />
      </Avatar>
      <Typography component="h1" variant="h5">
        Giriş Yap
      </Typography>
      <Box
        component="form"
        onSubmit={() => console.log("submit")}
        noValidate
        sx={{ mt: 1 }}
      >
        <StyledTextField
          margin="normal"
          fullWidth
          label="Kullanıcı Adı"
          autoFocus
          {...register("username", { required: "Kullanıcı adı gereklidir." })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
          InputLabelProps={{
            sx: {
              color: "white",
            },
          }}
        />
        <StyledTextField
          margin="normal"
          fullWidth
          label="Şifre"
          type="password"
          {...register("password", { required: "Parola gereklidir" })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
          InputLabelProps={{
            sx: {
              color: "white",
            },
          }}
        />
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          className={`bg-customButtonBackground hover:bg-customButtonHover ${
            !isValid && "opacity-50 cursor-not-allowed"
          }}`}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/register">
              Hesabınız yok mu? <span className="text-blue-500">Kayıt ol</span>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
