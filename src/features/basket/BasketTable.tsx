import { IoMdRemove, IoMdAdd, IoMdTrash } from "react-icons/io";
import { BasketItem } from "../../app/models/basket";
import { currencyFormat } from "../../app/utils/utils";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
} from "@mui/material";
import CustomButton from "../../app/components/ui/CustomButton";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  return (
    <div className="bg-customBackground text-gray-200 rounded-xl shadow-xl">
      <List>
        {items.map((item, index) => (
          <>
            <ListItem key={item.productId}>
              <ListItemAvatar>
                <img
                  alt={item.name}
                  src={item.pictureUrl}
                  className="mr-5 rounded-xl"
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={
                  <div className="text-gray-200">
                    <Typography variant="body2" component="span">
                      Marka: {item.brand}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      Tip: {item.type}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="span">
                      Fiyat: {currencyFormat(item.price)}
                    </Typography>
                  </div>
                }
              />
              <ListItemSecondaryAction>
                <div className="flex flex-col sm:flex-row">
                  <div className="flex flex-col-reverse md:flex-row items-center">
                    <CustomButton
                      onClick={() => console.log("decrease quantity")}
                      className="rounded-full w-fit self-center"
                      dynamic={true}
                    >
                      <IoMdRemove className="text-primary" />
                    </CustomButton>
                    <Typography
                      variant="body1"
                      component="span"
                      className="self-center"
                    >
                      {item.quantity}
                    </Typography>
                    <CustomButton
                      onClick={() => console.log("increase quantity")}
                      className="rounded-full w-fit self-center"
                      dynamic={true}
                    >
                      <IoMdAdd className="text-primary" />
                    </CustomButton>
                  </div>
                  <CustomButton
                    onClick={() => console.log("Deleted")}
                    className="rounded-full w-fit self-center"
                    dynamic={true}
                  >
                    Ürünü Sil
                    <IoMdTrash className="text-primary" />
                  </CustomButton>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
            {index !== items.length - 1 && <Divider />}
          </>
        ))}
      </List>
    </div>
  );
}
