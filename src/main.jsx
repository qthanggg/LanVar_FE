import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "src/Layout";
import "src/global.css";
import { HomePage } from "src/pages/HomePage";
import { LoginPage } from "src/pages/LoginPage";
import { NotFound } from "src/pages/NotFound/NotFound";
import { ProductDetailPage } from "src/pages/ProductDetailPage";

import { RegisterPage } from "src/pages/RegisterPage";
import { store } from "src/app/store";
import { Provider } from "react-redux";
import { AuctionPage } from "./pages/AuctionPage";

//import { PrivateRoute } from "./pages/PrivateRoute";
import { CartPage } from "./pages/CartPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { PrivateRoute } from "./pages/PrivateRoute";
import ManagerPage from "./pages/ManagerPage/ManagerPage";
import StaffPage from "./pages/StaffPage/StaffPage";
import ProductOwnerPage from "./pages/ProductOwnerPage/ProductOwnerPage";
import ShopCategoryPage from "./pages/ShopCategoryPage/ShopCategoryPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" index element={<HomePage />} />
          <Route
            path="product-detail/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="shop" element={<ShopCategoryPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="auction" element={<AuctionPage />} />

            <Route path="manager" element={<ManagerPage />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="product-owner" element={<ProductOwnerPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
