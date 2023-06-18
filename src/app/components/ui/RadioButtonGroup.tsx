import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <FormControl>
      <FormLabel sx={{ color: "white" }}>Sırala</FormLabel>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#FF6F00", // Seçili durumda kullanılacak renk
                  },
                }}
              />
            }
            label={
              label === "Alphabetical"
                ? "Alfabetik"
                : label && label === "Price: High to Low"
                ? "Fiyat: Yüksekten Düşüğe"
                : label && label === "Price: Low to High"
                ? "Fiyat: Düşükten Yükseğe"
                : ""
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
