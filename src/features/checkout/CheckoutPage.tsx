import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FormProvider, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./checkoutValidation";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../app/components/ui/CustomButton";

const steps = ["Kargo Adresi", "Sipariş Önizlemesi", "Ödeme Detayları"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  });

  const handleNext = async (data: FieldValues) => {
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if (activeStep === steps.length - 1) {
      setLoading(true);
      try {
        const orderNumber = await agent.Orders.create({
          saveAddress,
          shippingAddress,
        });
        setOrderNumber(orderNumber);
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const user = useAppSelector((state) => state.account.user);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="container mx-auto my-3 md:my-6 p-2 md:p-3 bg-customBackground rounded-xl shadow-2xl">
        <Typography component="h1" variant="h4" align="center">
          Sipariş vermek için giriş yapmalısınız.
        </Typography>
        <div className="flex justify-center mt-4">
          <CustomButton
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </CustomButton>
        </div>
      </div>
    );

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto my-3 md:my-6 p-2 md:p-3 bg-customBackground rounded-xl ">
        <Typography component="h1" variant="h4" align="center">
          Siparişi Tamamla
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <p className="text-gray-200">{label}</p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Siparişiniz için teşekkürler.
              </Typography>
              <Typography variant="subtitle1">
                Sipariş numaranız #{orderNumber}. Maili gönderilmiştir.
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Geri
                  </Button>
                )}
                <LoadingButton
                  loading={loading}
                  disabled={!methods.formState.isValid}
                  variant="contained"
                  className="bg-customButtonBackground hover:bg-customButtonBackgroundHover"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Siparişi Ver" : "Devam"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </div>
    </FormProvider>
  );
}
