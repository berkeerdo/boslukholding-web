import { Typography, Grid, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../app/utils/utils";
import agent from "../../app/api/agent";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    agent.Orders.list()
      .then((response) => {
        console.log(response);
        setOrders(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order: any) => (
          <Grid item xs={12} key={order.id}>
            <div className="bg-customBackground shadow-xl rounded-xl p-5">
              <Typography variant="h6" gutterBottom>
                Sipariş ID: {order.id}
              </Typography>
              <Divider color="white" className="my-2" />
              <Typography variant="body1">
                Müşteri Adı: {order.customerName}
              </Typography>
              <Typography variant="body1">Tarih: {order.date}</Typography>
              <Typography variant="body1">
                Toplam Tutar: {currencyFormat(order.totalAmount)}
              </Typography>
              <Typography variant="body1">Durum: {order.status}</Typography>
              {/* Daha fazla sipariş bilgisi buraya eklenebilir */}
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
