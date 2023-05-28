import { Container } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 8 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
