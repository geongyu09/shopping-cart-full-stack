import { BrowserRouter, Route, Routes } from "react-router";

import CartsPage from "@pages/CartsPage";
import OrderConfirmPage from "@pages/OrderConfirmPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/carts" element={<CartsPage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
