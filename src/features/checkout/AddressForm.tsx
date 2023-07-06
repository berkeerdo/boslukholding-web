import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/ui/AppTextInput";
import AppCheckbox from "../../app/components/ui/AppCheckbox";
import { useAppSelector } from "../../app/store/configureStore";

export default function AddressForm() {
  const { control } = useFormContext();
  const savedAdress = useAppSelector((state) => state.account.savedAdress);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Kargo Adresi
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.fullName : ""}
            control={control}
            name="fullName"
            label="Full name"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.address1 : ""}
            control={control}
            name="address1"
            label="Address 1"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.address2 : ""}
            control={control}
            name="address2"
            label="Address 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.city : ""}
            control={control}
            name="city"
            label="City"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.state : ""}
            control={control}
            name="state"
            label="State"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.zipcode : ""}
            control={control}
            name="zip"
            label="Zipcode"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            defaultValue={savedAdress ? savedAdress.country : ""}
            control={control}
            name="country"
            label="Country"
          />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
            name="saveAddress"
            label="Bunu varsayılan adres olarak kaydet"
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
}
