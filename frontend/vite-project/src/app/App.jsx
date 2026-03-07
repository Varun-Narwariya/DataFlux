import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToolsPage from "../pages/ToolsPage";
import ToolPage from "../pages/ToolPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToolsPage />} />
        <Route path="/tool/:toolSlug" element={<ToolPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;