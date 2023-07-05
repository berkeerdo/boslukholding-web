import React from "react";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { Order } from "../../app/models/order";
import { currencyFormat, formatDate } from "../../app/utils/utils";

interface Props {
  orders: Order[];
}

const OrdersComponent: React.FC<Props> = ({ orders }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order: Order, index) => (
          <Grid item xs={12} key={order.id} className="text-customBackground">
            <div className="bg-customButtonBackground shadow-xl rounded-xl p-5">
              <Typography variant="h6" gutterBottom className="font-semibold">
                Sipariş ID: #{order.id}
              </Typography>
              <Accordion className="bg-customBackground rounded-xl">
                <AccordionSummary
                  expandIcon={<FaChevronDown className="text-white" />}
                >
                  <Typography variant="body1" className="text-white">
                    Sipariş Öğeleri
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="bg-customBackground shadow-xl rounded-xl p-5">
                  <Grid container spacing={2}>
                    <Grid item xs={12} key={order.id}>
                      <div className="flex items-center">
                        <img
                          src={order.orderItems[0].pictureUrl}
                          alt={order.id.toString()}
                          className="w-20 h-20 mr-4 rounded-3xl"
                        />
                        <div className="flex flex-col">
                          <Typography variant="body1" className="text-white">
                            {order.orderItems[0].name}
                          </Typography>
                          <Typography variant="body1" className="text-white">
                            Adet: {order.orderItems.length}
                          </Typography>
                          <Typography variant="body1" className="text-white">
                            Fiyat: {currencyFormat(order.total)}
                          </Typography>
                        </div>
                      </div>
                      {index !== order.orderItems.length - 1 && (
                        <Divider color="white" className="my-2" />
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Divider color="black" className="my-2 " />
              <Typography variant="body1" className="font-semibold">
                Müşteri: {order.buyerId}
              </Typography>
              <Typography variant="body1" className="font-semibold">
                Tarih: {formatDate(order.orderDate)}
              </Typography>
              <Typography variant="body1" className="font-semibold">
                Toplam Tutar: {currencyFormat(order.subTotal)}
              </Typography>
              <Typography variant="body1" className="font-semibold">
                Durum:{" "}
                {order.orderStatus === "Pending"
                  ? "Beklemede"
                  : order.orderStatus === "Approved"
                  ? "Onaylandı"
                  : "Reddedildi"}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default OrdersComponent;
