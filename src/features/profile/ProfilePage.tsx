import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Typography,
  Avatar,
  Grid,
  Divider,
  ListItem,
  List,
  ListItemText,
} from "@mui/material";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/utils/utils";
import OrdersComponent from "../orders/OrderCard";
import CustomButton from "../../app/components/ui/CustomButton";
import { SavedAdress } from "../../app/models/address";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.account.user);
  const [loading, setLoading] = useState(true);
  const [savedAdress, setSavedAdress] = useState<SavedAdress[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Account.savedAdress()
      .then((response) => {
        setSavedAdress([response]);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

    agent.Orders.list()
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => console.log(error));
  }, []);

  let totalSpent = 0;

  orders.forEach((order) => {
    totalSpent += order.total;
  });

  if (!user || loading) {
    return <LoadingComponent message="Profil Verileri Alınıyor ..." />;
  }

  return (
    <div className=" my-3 md:my-6 p-2 md:p-3 ">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className="my-3 md:my-6 p-3 md:p-4 bg-customBackground rounded-xl shadow-2xl">
            <Typography component="h1" variant="h5">
              Profilim
            </Typography>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-1 items-center space-x-4">
                <Avatar />
                <Typography component="h1" variant="h6">
                  {user?.username}
                </Typography>
              </div>
              <div>
                <CustomButton
                  variant="contained"
                  onClick={() => navigate("profile/update")}
                >
                  Profilimi Düzenle
                </CustomButton>
              </div>
            </div>
            <Divider className="my-4" color="white" />
            <div className="flex items-center justify-end space-x-3 my-2 ">
              <div className="flex flex-col items-center justify-center">
                <Typography component="h1" variant="body1">
                  Toplam Harcama
                </Typography>
                <Typography component="h1" variant="body1" className="">
                  {currencyFormat(totalSpent)}
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="my-3 md:my-6 p-3 md:p-4 bg-customBackground rounded-xl shadow-2xl">
            <Typography component="h1" variant="h5">
              Adreslerim
            </Typography>
            <div className="flex justify-between mt-2">
              <div className="flex flex-col items-center justify-center w-full">
                {savedAdress
                  ? savedAdress.map((adress) => (
                      <List className="w-full">
                        <ListItem>
                          <ListItemText
                            primary={"Ad:"}
                            secondary={adress.fullName}
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                        <Divider color="white" />
                        <ListItem>
                          <ListItemText
                            primary={"Adres 1:"}
                            secondary={adress.address1}
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                        <Divider color="white" />
                        <ListItem>
                          <ListItemText
                            primary={"Adres 2:"}
                            secondary={adress.address2}
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                        <Divider color="white" />
                        <ListItem>
                          <ListItemText
                            primary={"Şehir:"}
                            secondary={adress.city}
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                        <Divider color="white" />
                        <ListItem>
                          <ListItemText
                            primary={"Eyalet:"}
                            secondary={adress.state}
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                        <Divider color="white" />
                        <ListItem>
                          <ListItemText
                            primary={"Posta Kodu:"}
                            secondary={
                              adress.zipcode
                                ? adress.zipcode
                                : "Posta kodu bulunmamaktadır"
                            }
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                        <Divider color="white" />
                        <ListItem>
                          <ListItemText
                            primary={"Ülke"}
                            secondary={adress.country}
                            secondaryTypographyProps={{ color: "white" }}
                          />
                        </ListItem>
                      </List>
                    ))
                  : "Adresiniz Bulunmamaktadır."}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="my-3 md:my-6 p-3 md:p-4 bg-customBackground rounded-xl shadow-xl">
            <Typography
              component="h1"
              variant="h5"
              className={orders ? "hidden" : ""}
            >
              Siparişlerim
            </Typography>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col w-full">
                {orders.length === 0 ? (
                  "Siparişiniz Bulunmamaktadır."
                ) : (
                  <OrdersComponent orders={orders} />
                )}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
