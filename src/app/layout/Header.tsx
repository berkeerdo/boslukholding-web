import React from "react";
import BoslukLogo from "../../assets/BoslukHoldingLogo.png";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  ListItemText,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { RiCloseLine, RiShoppingCart2Fill } from "react-icons/ri";
import SearchBar from "../components/SearcBar/SearchBar";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { SmallBadge } from "../components/StyledComponents/CustomBadgeStyled";
import SignedInMenu from "../components/HeaderComponents/SignedInMenu";
import AccountMenu from "../components/HeaderComponents/AccountMenu";
import CategoriesMenu from "../components/HeaderComponents/CategoriesMenu";

const Header: React.FC = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
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

            <CategoriesMenu toggleDrawer={() => toggleDrawer()} />
          </div>

          {isMobile ? null : (
            <div className="flex-1 max-w-lg">
              <SearchBar />
            </div>
          )}
          <div className="flex items-center space-x-6">
            {user ? <SignedInMenu /> : <AccountMenu />}
            <Button
              variant="outlined"
              component={Link}
              to="/basket"
              size="large"
              className="space-x-2 uppercase"
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
              <SmallBadge badgeContent={itemCount} color="error">
                <RiShoppingCart2Fill className="mb-1" />
              </SmallBadge>
            </Button>
          </div>
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
