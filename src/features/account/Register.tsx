/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { RiLock2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { showSnackbar } from "../../app/components/Snackbar/snackBarSlice";

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

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  function hanleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <>
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
          Kayıt ol
        </Typography>
        <Box
          component="form"
          onSubmit={(data) =>
            agent.Account.register(data)
              .then(() => {
                showSnackbar({
                  message: "Kayıt başarılı",
                  severity: "success",
                });
                navigate("/login");
              })
              .catch((error) => hanleApiErrors(error.data))
          }
          noValidate
          sx={{ mt: 1 }}
        >
          <StyledTextField
            margin="normal"
            fullWidth
            label="Kullanıcı adı"
            {...register("username", {
              required: "Username is required",
            })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <StyledTextField
            margin="normal"
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                message: "Not a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message as string}
          />
          <StyledTextField
            margin="normal"
            fullWidth
            label="Şifre"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                message: "Password doest not meet complexity requirements.",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
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
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/login">{"Already have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
