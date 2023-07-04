import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { UpdateUserDto } from "../../app/models/updateuser";
import { updateUser } from "../account/accountSlice";

export default function UpdateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDto>();

  const user = useAppSelector((state) => state.account.user);
  const status = useAppSelector((state) => state.account.status);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: UpdateUserDto) => {
    dispatch(updateUser(data)).then(() => {
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
      <LoadingButton
        type="submit"
        variant="contained"
        loading={status === "updating"}
        className="bg-customButtonBackground hover:bg-customButtonBackgroundHover text-gray-100"
      >
        Güncelle
      </LoadingButton>
    </form>
  );
}
