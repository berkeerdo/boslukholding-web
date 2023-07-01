import { Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import CustomButton from "../ui/CustomButton";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { setProductParams } from "../../../features/catalog/catalogSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  toggleDrawer: () => void;
}

const CategoriesMenu = ({ toggleDrawer }: Props) => {
  const { types } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorCategories, setAnchorCategories] =
    React.useState<null | HTMLElement>(null);

  const handleCategoriesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCategories(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setAnchorCategories(null);
  };

  const handleClickCategory = (value: string) => {
    navigate("/products", { state: { showFilters: true } });
    dispatch(setProductParams({ types: [value] }));
  };

  return (
    <>
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
        {types.map((type, index) => [
          <MenuItem
            key={`menu-item-${index}`}
            onClick={() => handleClickCategory(type)}
            aria-haspopup="true"
          >
            {type}
          </MenuItem>,
        ])}
        <MenuItem
          onClick={() => {
            navigate("/products", { state: { showFilters: true } });
            dispatch(setProductParams({ types: [] }));
          }}
          aria-haspopup="true"
        >
          Tüm Ürünler
        </MenuItem>
      </Menu>
    </>
  );
};

export default CategoriesMenu;
