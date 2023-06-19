import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import { FormLabel, Grid, Paper } from "@mui/material";
import RadioButtonGroup from "../../app/components/ui/RadioButtonGroup";
import CheckboxButtons from "../../app/components/ui/CheckboxButtons";
import AppPagination from "../../app/components/ui/AppPagination";
import { useLocation } from "react-router-dom";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "priceAsc", label: "Price: Low to High" },
];

export default function Catalog() {
  const location = useLocation();
  const showFilters = location.state?.showFilters ?? true;
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(setProductParams({ searchTerm: "" }));
  }, [dispatch, productParams.brands]);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded)
    return <LoadingComponent message="Ürünler Yükleniyor..." />;

  return (
    <Grid container columnSpacing={4}>
      {showFilters && (
        <Grid item xs={3}>
          <Paper
            sx={{ mb: 2, p: 2 }}
            className="bg-customBackground text-gray-200"
          >
            <RadioButtonGroup
              selectedValue={productParams.orderBy}
              options={sortOptions}
              onChange={(e) =>
                dispatch(setProductParams({ orderBy: e.target.value }))
              }
            />
          </Paper>
          <Paper
            sx={{ mb: 2, p: 2 }}
            className="bg-customBackground text-gray-200"
          >
            <FormLabel sx={{ color: "white" }}>Markalar</FormLabel>
            <CheckboxButtons
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ brands: items }))
              }
            />
          </Paper>
          <Paper
            sx={{ mb: 2, p: 2 }}
            className="bg-customBackground text-gray-200"
          >
            <FormLabel sx={{ color: "white" }}>Kategoriler</FormLabel>
            <CheckboxButtons
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) => {
                dispatch(setProductParams({ types: items }));
              }}
            />
          </Paper>
        </Grid>
      )}

      <Grid item xs={9} sx={{ mb: 2 }}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
