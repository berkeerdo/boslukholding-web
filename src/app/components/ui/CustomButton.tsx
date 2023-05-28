import React from "react";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

interface CustomButtonProps extends ButtonProps {
  // Özel buttonProps'larını buraya ekleyebilirsiniz
}

const CustomButton: React.FC<CustomButtonProps> = ({ className, ...props }) => {
  const primaryColor = "#FF6F00"; // Özel arka plan rengi
  const primaryHoverColor = "#FF8C00"; // Özel hover arka plan rengi

  return (
    <Button
      className={clsx("text-white uppercase hover:bg-opacity-75", className)}
      sx={{
        backgroundColor: primaryColor,
        textTransform: "none",
        ":hover": {
          backgroundColor: primaryHoverColor,
        },
      }}
      {...props}
    />
  );
};

export default CustomButton;
