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
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

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
                    <LoadingButton
                      loading={
                        status === "pendingRemoveItem" + item.productId + "rem"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                      className="rounded-full w-fit self-center"
                    >
                      <IoMdRemove className="text-primary" />
                    </LoadingButton>
                    <Typography
                      variant="body1"
                      component="span"
                      className="self-center"
                    >
                      {item.quantity}
                    </Typography>
                    <LoadingButton
                      loading={status === "pendingAddItem" + item.productId}
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({
                            productId: item.productId,
                          })
                        )
                      }
                      className="rounded-full w-fit self-center"
                    >
                      <IoMdAdd className="text-primary" />
                    </LoadingButton>
                  </div>
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + item.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    className="rounded-full w-fit self-center text-gray-200 capitalize font-semibold"
                  >
                    Ürünü Sil
                    <IoMdTrash className="text-primary" />
                  </LoadingButton>
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
