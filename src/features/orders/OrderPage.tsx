import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useAppSelector } from "../../app/store/configureStore";
import CustomButton from "../../app/components/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import OrdersComponent from "./OrderCard";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAppSelector((state) => state.account.user);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Orders.list()
      .then((response) => {
        setOrders(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(orders);

  if (!user)
    return (
      <div className="container mx-auto my-3 md:my-6 p-2 md:p-3 bg-customBackground rounded-xl shadow-2xl">
        <Typography component="h1" variant="h4" align="center">
          Siparişlerini görebilmek için giriş yapmalısın.
        </Typography>
        <div className="flex justify-center mt-4">
          <CustomButton
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Giriş Yap
          </CustomButton>
        </div>
      </div>
    );

  if (loading) {
    return <LoadingComponent message="Siparişler Yükleniyor..." />;
  }

  return (
    <>
      {orders.length === 0 ? (
        <div className="container mx-auto my-3 md:my-6 p-2 md:p-3 bg-customBackground rounded-xl shadow-2xl">
          <Typography component="h1" variant="h4" align="center">
            Henüz sipariş vermedin.
          </Typography>
          <div className="flex justify-center mt-4">
            <CustomButton
              variant="contained"
              color="primary"
              onClick={() => navigate("/products")}
            >
              Alışverişe Başla
            </CustomButton>
          </div>
        </div>
      ) : (
        <OrdersComponent orders={orders} />
      )}
    </>
  );
}
