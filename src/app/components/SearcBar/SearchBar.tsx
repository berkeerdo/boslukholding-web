import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { TextField } from "@mui/material";

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
      className="m-0 p-2 w-full"
      getOptionLabel={(option) =>
        option.name ? option.name : "Ürün Bulunamadı"
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          className="bg-white"
          sx={{ borderRadius: "0.5rem" }}
          size="small"
          onChange={handleSearch}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <FaSearch />
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
