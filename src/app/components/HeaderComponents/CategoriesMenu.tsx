import { Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import CustomButton from "../ui/CustomButton";

interface Props {
  toggleDrawer: () => void;
}

const CategoriesMenu = ({ toggleDrawer }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorCategories, setAnchorCategories] =
    React.useState<null | HTMLElement>(null);

  const [anchorSubCategory, setAnchorSubCategory] =
    React.useState<null | HTMLElement>(null);

  const handleCategoriesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCategories(event.currentTarget);
  };

  const handleCategoriesMenuClose = () => {
    setAnchorCategories(null);
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
        {categories.map((category, index) => [
          <MenuItem
            key={`menu-item-${index}`}
            onClick={handleSubCategoryMenuOpen}
            aria-haspopup="true"
            aria-controls={`sub-category-menu-${index}`}
          >
            {category.label}
          </MenuItem>,
          <Menu
            key={`menu-${index}`}
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
          </Menu>,
        ])}
      </Menu>
    </>
  );
};

export default CategoriesMenu;
