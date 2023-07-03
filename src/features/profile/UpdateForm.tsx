import { useForm } from "react-hook-form";
import CustomButton from "../../app/components/ui/CustomButton";
import { TextField } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  username: string;
}

export default function UpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const user = useAppSelector((state) => state.account.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const { email, username } = data;
    agent.Account.updateProfile({ email, username })
      .then(() => {
        setLoading(true);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
        navigate("/profile");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        {...register("email", { required: "Email gerekli" })}
        label="Email"
        defaultValue={user?.email}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        variant="standard"
        color="warning"
        InputLabelProps={{
          sx: { color: "warning.main" },
        }}
        InputProps={{
          sx: { color: "white" },
        }}
      />
      <TextField
        {...register("username", { required: "Kullanıcı adı gerekli" })}
        label="Username"
        defaultValue={user?.username}
        error={!!errors.username}
        helperText={errors.username?.message}
        fullWidth
        variant="standard"
        color="warning"
        InputLabelProps={{
          sx: { color: "warning.main" },
        }}
        InputProps={{
          sx: { color: "white" },
        }}
      />
      <LoadingButton
        type="submit"
        variant="contained"
        loading={loading}
        className="bg-customButtonBackground hover:bg-customButtonBackgroundHover text-gray-100"
      >
        Güncelle
      </LoadingButton>
    </form>
  );
}
