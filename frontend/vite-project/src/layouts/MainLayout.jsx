import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../shared/components";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "40px" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;