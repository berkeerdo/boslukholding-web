import {
  Typography,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useEffect, useState } from "react";
import { currencyFormat, formatDate } from "../../app/utils/utils";
import { FaChevronDown } from "react-icons/fa";
import agent from "../../app/api/agent";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    agent.Orders.list()
      .then((response) => {
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
              <Accordion className="bg-customBackground rounded-xl">
                <AccordionSummary
                  expandIcon={<FaChevronDown className="text-white" />}
                >
                  <Typography variant="body1" className="text-white">
                    Sipariş Öğeleri
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="bg-customButtonBackground shadow-xl rounded-xl p-5">
                  <Grid container spacing={2}>
                    {order.orderItems?.map((item: any, index: number) => (
                      <Grid item xs={12} key={item.productId}>
                        <div className="flex items-center">
                          <img
                            src={item.pictureUrl}
                            alt={item.name}
                            className="w-16 h-16 mr-4"
                          />
                          <div className="flex flex-col">
                            <Typography variant="body1" className="text-white">
                              {item.name}
                            </Typography>
                            <Typography variant="body1" className="text-white">
                              Adet: {item.quantity}
                            </Typography>
                            <Typography variant="body1" className="text-white">
                              Fiyat: {currencyFormat(item.price)}
                            </Typography>
                          </div>
                        </div>
                        {/* Eğer son sipariş öğesi değilse divider ekle */}
                        {index !== order.orderItems.length - 1 && (
                          <Divider color="white" className="my-2" />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Divider color="white" className="my-2" />
              <Typography variant="body1">
                Müşteri Adı: {order.buyerId}
              </Typography>
              <Typography variant="body1">
                Tarih: {formatDate(order.orderDate)}
              </Typography>
              <Typography variant="body1">
                Toplam Tutar: {currencyFormat(order.subTotal)}
              </Typography>
              <Typography variant="body1">
                Durum:{" "}
                {order.orderStatus === "Pending"
                  ? "Beklemede"
                  : order.orderStatus === "Approved"
                  ? "Onaylandı"
                  : "Reddedildi"}
              </Typography>
              {/* Daha fazla sipariş bilgisi buraya eklenebilir */}
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
