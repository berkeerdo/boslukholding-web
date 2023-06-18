import { Container } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import SnackbarComponent from "../components/Snackbar/SnackbarComponent";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useCallback, useEffect, useState } from "react";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import LoadingComponent from "./LoadingComponent";
import { fetchProductsAsync } from "../../features/catalog/catalogSlice";

function App() {
  const dispatch = useAppDispatch();
  const snackbarOpen = useAppSelector((state) => state.snackbar?.open);
  const basket = useAppSelector((state) => state.basket);
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchProductsAsync());
      if (basket.status === "idle") {
        await dispatch(fetchBasketAsync());
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, basket.status]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent message="Bosluk Bilişim" />;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 8 }} className="min-h-screen">
        <Outlet />
      </Container>
      {snackbarOpen && <SnackbarComponent />}
      <Footer />
    </>
  );
}

export default App;
