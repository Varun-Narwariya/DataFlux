import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/components";

function ToolLayout() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "40px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default ToolLayout;