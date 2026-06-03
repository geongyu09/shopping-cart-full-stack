import { BrowserRouter, Route, Routes } from "react-router";

import CartsPage from "@pages/CartsPage";
import OrderConfirmPage from "@pages/OrderConfirmPage";
import { ROUTES } from "@constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.CARTS} element={<CartsPage />} />
        <Route path={ROUTES.ORDER_CONFIRM} element={<OrderConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
