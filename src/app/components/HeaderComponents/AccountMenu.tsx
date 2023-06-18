import React from "react";
import CustomButton from "../ui/CustomButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Divider, ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";

const AccountMenu = () => {
  const [anchorAccount, setAnchorAccount] = React.useState<null | HTMLElement>(
    null
  );

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAccount(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorAccount(null);
  };

  return (
    <>
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
          <span className="text-xs text-gray-300/90 ">Hesap Ayarları</span>
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
    </>
  );
};

export default AccountMenu;
