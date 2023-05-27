import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { ArrowDropDown, ShoppingCart } from "@mui/icons-material";
import SearchBar from "../components/SearcBar/SearchBar";

const Header: React.FC = () => {
  const [anchorCategories, setAnchorCategories] =
    React.useState<null | HTMLElement>(null);
  const [anchorAccount, setAnchorAccount] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorSubCategory, setAnchorSubCategory] =
    React.useState<null | HTMLElement>(null);

  const handleCategoriesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCategories(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setAnchorCategories(null);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccount(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorAccount(null);
  };

  const handleSubCategoryMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorSubCategory(event.currentTarget);
  };

  const handleSubCategoryMenuClose = () => {
    setAnchorSubCategory(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <Typography variant="h6" component="div">
            Logo
          </Typography>

          <Button
            color="inherit"
            onClick={handleCategoriesMenuOpen}
            endIcon={<ArrowDropDown />}
            aria-haspopup="true"
            aria-controls="categories-menu"
          >
            Kategoriler
          </Button>
          <Menu
            id="categories-menu"
            anchorEl={anchorCategories}
            open={Boolean(anchorCategories)}
            onClose={handleCategoriesMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={handleSubCategoryMenuOpen}
              aria-haspopup="true"
              aria-controls="sub-category-menu"
            >
              Alt Kategoriler
            </MenuItem>
            <Menu
              id="sub-category-menu"
              anchorEl={anchorSubCategory}
              open={Boolean(anchorSubCategory)}
              onClose={handleSubCategoryMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>Alt Kategori 1</MenuItem>
              <MenuItem>Alt Kategori 2</MenuItem>
              <MenuItem>Alt Kategori 3</MenuItem>
            </Menu>
          </Menu>
        </div>

        <div className="flex-1 max-w-lg py-2">
          <SearchBar />
        </div>

        <div className="flex items-center">
          <Button
            color="inherit"
            onClick={handleAccountMenuOpen}
            endIcon={<ArrowDropDown />}
            aria-haspopup="true"
            aria-controls="account-menu"
          >
            Giriş / Kayıt Ol
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorAccount}
            open={Boolean(anchorAccount)}
            onClose={handleAccountMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleAccountMenuClose}>Giriş</MenuItem>
            <MenuItem onClick={handleAccountMenuClose}>Kayıt Ol</MenuItem>
          </Menu>

          <Button color="inherit" className="space-x-2">
            <p>Sepetim</p>
            <ShoppingCart />
          </Button>
        </div>
      </Toolbar>

      <Box display={{ xs: "block", sm: "none" }} textAlign="center">
        <TextField variant="outlined" placeholder="Ara" size="small" />
      </Box>
    </AppBar>
  );
};

export default Header;
