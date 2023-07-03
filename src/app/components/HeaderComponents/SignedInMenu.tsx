import { ListItemText, Menu, MenuItem, MenuList } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { signOutUser } from "../../../features/account/accountSlice";
import { clearBasket } from "../../../features/basket/basketSlice";
import CustomButton from "../ui/CustomButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CustomButton
        variant="contained"
        onClick={handleClick}
        className="uppercase space-x-2"
        endIcon={<RiArrowDropDownLine className="w-6 h-6" />}
        aria-haspopup="true"
        aria-controls="account-menu"
      >
        <div className="flex flex-col items-center justify-center">
          <p>{user?.username}</p>
          <span className="text-xs text-gray-300/90 ">Hesap Ayarları</span>
        </div>
      </CustomButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
            onClick={() => {
              handleClose();
              navigate("/profile");
            }}
          >
            <ListItemText>Profilim</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/orders">
            <ListItemText>Siparişlerim</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(signOutUser());
              dispatch(clearBasket());
            }}
          >
            <ListItemText>Çıkış Yap</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
