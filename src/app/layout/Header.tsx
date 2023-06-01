import React from "react";
import BoslukLogo from "../../assets/BoslukHoldingLogo.png";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuList,
  MenuItem,
  Box,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import {
  RiArrowDropDownLine,
  RiCloseLine,
  RiMenu3Fill,
  RiShoppingCart2Fill,
} from "react-icons/ri";
import SearchBar from "../components/SearcBar/SearchBar";
import CustomButton from "../components/ui/CustomButton";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isDrawer2Open, setIsDrawer2Open] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDrawer2 = () => {
    setIsDrawer2Open(!isDrawer2Open);
  };

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

  const categories = [
    {
      label: "Kategori 1",
      subCategories: ["Alt Kategori 1", "Alt Kategori 2", "Alt Kategori 3"],
    },
    {
      label: "Kategori 2",
      subCategories: ["Alt Kategori 4", "Alt Kategori 5", "Alt Kategori 6"],
    },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#2E2E2E" }}
        className="lg:p-2 py-1"
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Box
                component="img"
                sx={{
                  height: 60,
                  width: "auto",
                  maxHeight: { xs: 60, md: 60 },
                  maxWidth: { xs: 120, md: 120 },
                }}
                alt="Logo"
                src={BoslukLogo}
              />
            </Link>

            <CustomButton
              variant="contained"
              onClick={isMobile ? toggleDrawer : handleCategoriesMenuOpen}
              endIcon={<RiArrowDropDownLine />}
              aria-haspopup="true"
              aria-controls="categories-menu"
              className="uppercase"
            >
              Ürünler
            </CustomButton>
            <Menu
              id="categories-menu"
              className="mt-1"
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
              {categories.map((category, index) => (
                <React.Fragment key={index}>
                  <MenuItem
                    onClick={handleSubCategoryMenuOpen}
                    aria-haspopup="true"
                    aria-controls={`sub-category-menu-${index}`}
                  >
                    {category.label}
                  </MenuItem>
                  <Menu
                    id={`sub-category-menu-${index}`}
                    className="ml-1"
                    anchorEl={anchorSubCategory}
                    open={Boolean(anchorSubCategory)}
                    onClose={handleSubCategoryMenuClose}
                    onAbort={handleSubCategoryMenuClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {category.subCategories.map((subCategory, subIndex) => (
                      <MenuItem key={subIndex}>{subCategory}</MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ))}
            </Menu>
          </div>

          {isMobile ? null : (
            <div className="flex-1 max-w-lg">
              <SearchBar />
            </div>
          )}

          {isMobile ? (
            <IconButton onClick={toggleDrawer2}>
              <RiMenu3Fill />
            </IconButton>
          ) : (
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
                  <span className="text-xs text-gray-300/90 ">
                    Hesap Ayarları
                  </span>
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
              >
                <MenuList dense sx={{ width: 160, maxWidth: "100%" }}>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleAccountMenuClose}
                  >
                    <ListItemText>Giriş Yap</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/register"
                    onClick={handleAccountMenuClose}
                  >
                    <ListItemText>Kayıt Ol</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    component={Link}
                    to="/orders"
                    onClick={handleAccountMenuClose}
                  >
                    <ListItemText>Siparişlerim</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleAccountMenuClose}>
                    <ListItemText>Üyelik Bilgilerim</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button
                variant="outlined"
                component={Link}
                to="/basket"
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
          )}
        </Toolbar>
      </AppBar>

      {isMobile ? (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          className="fixed inset-0"
          PaperProps={{ style: { width: "100%" } }}
        >
          <div className="flex justify-end p-2">
            <IconButton onClick={toggleDrawer}>
              <RiCloseLine className="" />
            </IconButton>
          </div>
          <div className="flex flex-col items-center h-full">
            <List>
              <ListItem>
                <ListItemText primary="Drawer 1 Item 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Drawer 1 Item 2" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Drawer 1 Item 3" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      ) : null}

      {isMobile ? (
        <Drawer
          anchor="right"
          open={isDrawer2Open}
          onClose={toggleDrawer2}
          PaperProps={{ style: { width: "100%" } }}
        >
          <List>
            <ListItem>
              <ListItemText primary="Drawer 2 Item 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Drawer 2 Item 2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Drawer 2 Item 3" />
            </ListItem>
          </List>
        </Drawer>
      ) : null}
    </>
  );
};

export default Header;
