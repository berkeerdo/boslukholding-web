import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { Product } from "../../models/product";
import { StyledTextField } from "../StyledComponents/CustomTexfFieldStlyed";
import {
  setProductParams,
  productSelectors,
} from "../../../features/catalog/catalogSlice";

export default function ProductSearch() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = useAppSelector(productSelectors.selectAll);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const debouncedSearchTerm = (value: string) => {
    navigate(`/products`);
    dispatch(setProductParams({ searchTerm: value }));
  };

  const handleSearchChange = (
    event: React.ChangeEvent<{}>,
    value: Product | null
  ) => {
    if (value) {
      setSelectedProduct(value);
      debouncedSearchTerm(value.name);
    } else {
      setSelectedProduct(null);
      debouncedSearchTerm("");
    }
  };

  return (
    <Autocomplete
      options={products}
      getOptionLabel={(product) => product.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedProduct}
      onChange={handleSearchChange}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label="Ürünleri Ara"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
}
