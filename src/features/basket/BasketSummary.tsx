import { Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { currencyFormat } from "../../app/utils/utils";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
  const { basket } = useAppSelector((state) => state.basket);
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  const deliveryFee = subtotal && subtotal > 100 ? 0 : 500;

  return (
    <>
      <Paper className="bg-customBackground text-gray-200">
        <List>
          <ListItem className="py-2">
            <ListItemText
              primary="Ara Toplam"
              secondary={
                <p className="text-gray-200">{currencyFormat(subtotal)}</p>
              }
            />
          </ListItem>
          <Divider color="white" />
          <ListItem className="py-2">
            <ListItemText
              primary="Kargo Ücreti*"
              secondary={
                <p className="text-gray-200">{currencyFormat(deliveryFee)}</p>
              }
            />
          </ListItem>
          <Divider color="white" />
          <ListItem className="py-2">
            <ListItemText
              primary="Toplam"
              secondary={
                <p className="text-gray-200">
                  {currencyFormat(subtotal + deliveryFee)}
                </p>
              }
            />
          </ListItem>
          <Divider color="white" />
          <ListItem className="py-2">
            <ListItemText
              primary={
                <span style={{ fontStyle: "italic" }}>
                  100 ₺ üzeri siparişler ücretsiz teslimat için uygundur
                </span>
              }
            />
          </ListItem>
        </List>
      </Paper>
    </>
  );
}
