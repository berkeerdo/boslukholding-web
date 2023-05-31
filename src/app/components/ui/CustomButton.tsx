import React from "react";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";
import { LoadingButton } from "@mui/lab";

interface CustomButtonProps extends ButtonProps {
  // Özel buttonProps'larını buraya ekleyebilirsiniz
  dynamic?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, ...props }) => {
  const primaryColor = "#FF6F00"; // Özel arka plan rengi
  const primaryHoverColor = "#FF8C00"; // Özel hover arka plan rengi

  const buttonStyles = props.dynamic
    ? { backgroundColor: "transparent", color: primaryColor }
    : {
        backgroundColor: primaryColor,

        ":hover": {
          backgroundColor: primaryHoverColor,
        },
        color: "white",
      };

  return (
    <Button
      className={clsx("text-white uppercase hover:bg-opacity-75", className)}
      component={LoadingButton}
      sx={{
        textTransform: "none",
        ...buttonStyles,
      }}
      {...props}
    />
  );
};

export default CustomButton;
