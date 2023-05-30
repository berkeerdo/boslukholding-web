import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2E2E2E] text-gray-300 py-8 flex-shrink-0 mt-auto shadow-2xl">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body1">Telefon: 123-456-7890</Typography>
            <Typography variant="body1">E-posta: info@example.com</Typography>
            <Typography variant="body1">
              Adres: 123 Sokak, Şehir, Ülke
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" gutterBottom>
              Hesabım
            </Typography>
            <ul className="list-none p-0 text-[#FF6F00]">
              <li>
                <Link to={"#"} className="no-underline ">
                  Siparişlerim
                </Link>
              </li>
              <li>
                <Link to={"#"} className="no-underline ">
                  Adreslerim
                </Link>
              </li>
              <li>
                <Link to={"#"} className="no-underline">
                  Bilgilerim
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" gutterBottom>
              Yardım
            </Typography>
            <ul className="list-none p-0 text-[#FF6F00]">
              <li>
                <Link to={"#"} className="no-underline">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link to={"#"} className="no-underline">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link to={"#"} className="no-underline">
                  Kargo ve Teslimat
                </Link>
              </li>
              <li>
                <Link to={"#"} className="no-underline">
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h2" component="h1" className="text-5xl mb-4">
              Numara
            </Typography>
            <Typography variant="body1" className="mb-6">
              Sorunuz var mı? Bizimle iletişime geçin.
            </Typography>
            <Typography variant="body2">
              © 2023 E-ticaret Sitesi. Tüm hakları saklıdır.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
