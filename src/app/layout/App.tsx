import { Container } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 8 }} className="min-h-screen">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
