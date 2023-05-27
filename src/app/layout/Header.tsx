import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuList,
  MenuItem,
  TextField,
  Box,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RiArrowDropDownLine, RiShoppingCart2Fill } from "react-icons/ri";
import SearchBar from "../components/SearcBar/SearchBar";
import CustomButton from "../components/ui/CustomButton";

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
    <AppBar
      position="static"
      sx={{ backgroundColor: "#2E2E2E" }}
      className="p-2"
    >
      <Toolbar className="flex justify-between">
        <div className="flex items-center space-x-6">
          <Typography variant="h6" component="div">
            Logo
          </Typography>

          <CustomButton
            variant="contained"
            onClick={handleCategoriesMenuOpen}
            endIcon={<RiArrowDropDownLine />}
            aria-haspopup="true"
            aria-controls="categories-menu"
            className="uppercase"
          >
            Kategoriler
          </CustomButton>
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

        <div className="flex-1 max-w-lg ">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-6">
          <CustomButton
            variant="contained"
            onClick={handleAccountMenuOpen}
            className="uppercase space-x-2"
            endIcon={<RiArrowDropDownLine className="w-6 h-6" />}
            aria-haspopup="true"
            aria-controls="account-menu"
          >
            <div className="flex flex-col items-center justify-center">
              <p>Giriş / Kayıt ol</p>
              <span className="text-xs text-gray-300 ">Hesap Ayarları</span>
            </div>
          </CustomButton>
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
            sx={{ marginTop: "3px" }}
            PaperProps={{
              sx: {
                backgroundColor: "#2D3142",
                color: "#fff",
              },
            }}
          >
            <MenuList dense sx={{ width: 160, maxWidth: "100%" }}>
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemText>Giriş Yap</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemText>Kayıt Ol</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemText>Siparişlerim</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleAccountMenuClose}>
                <ListItemText>Üyelik Bilgilerim</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>

          <Button
            variant="outlined"
            size="large"
            className="space-x-2 uppercase "
            sx={{
              textTransform: "none",
              borderColor: "#F8F8F8",
              color: "#fff",
              ":hover": {
                borderColor: "#F8F8F8",
                backgroundColor: "#F8F8F8",
                color: "#2D3142",
              },
            }}
          >
            <p>Sepetim</p>
            <RiShoppingCart2Fill />
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
