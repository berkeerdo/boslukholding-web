import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  category: string;
}

const SearchBar: React.FC = () => {
  const [options, setOptions] = useState<Product[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;

    if (searchQuery.length >= 3) {
      axios
        .get(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((response) => {
          const data = response.data; // Gelen veri objesi

          // Veriyi diziye dönüştürme işlemi
          const dataArray = data.products.map((item: any) => {
            return {
              id: parseInt(item.id, 10),
              name: item.title,
              category: item.category,
            };
          });

          setOptions(dataArray);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      key="autocomplete"
      options={options}
      getOptionLabel={(option) =>
        option.name ? option.name : "Ürün Bulunamadı"
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          onChange={handleSearch}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <SearchIcon />
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
