import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { HeroImageRight } from "./components/HeroImageRight";

import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { Logout } from "./routes/Logout";
import { ForgotPassword } from "./routes/Forgot";
import { NotFound } from "./routes/NotFound";
import Menu from "./routes/Menu";
import ItemInput from "./routes/ItemInput";
import { UserContextProvider } from "./contexts/UserContext";
import AuthRoutes from "./components/AuthRoutes";
import "./index.css";
import Upcoming from "./routes/Upcoming";

const placeholder = [
  { name: "Apple", upc: "125783234434", nextDate: "12-30-22", image: "cloudinary" },
  { name: "Berry", upc: "457832344321", nextDate: "12-04-22", image: "cloudinary2" },
  { name: "Carrot", upc: "123457832344", nextDate: "12-06-22", image: "cloudinary3" },
  { name: "Drumstick", upc: "578323441234", nextDate: "12-03-22", image: "cloudinary4" }
];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HeroImageRight />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="logout" element={<Logout />} />
            <Route element={<AuthRoutes />}>
              <Route path="menu" element={<Menu />} />
              <Route path="iteminput" element={<ItemInput />} />
              <Route path="upcoming" element={<Upcoming />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
