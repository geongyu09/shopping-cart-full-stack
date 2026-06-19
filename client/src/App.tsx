import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { ROUTES } from "@constants/routes";
import CartsPage from "@pages/CartsPage";
import OrderConfirmPage from "@pages/OrderConfirmPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.CARTS} replace />} />
        <Route path={ROUTES.CARTS} element={<CartsPage />} />
        <Route path={ROUTES.ORDER_CONFIRM} element={<OrderConfirmPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
