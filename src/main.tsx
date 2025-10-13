import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";
import { LayoutMenu } from "./layout/Menu/LayoutMenu.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMenu />,
    children: [
      {
        path: "/",
        element: <Menu />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ]
  },
  { path: "*", element: <Error /> }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />

    {/* <App /> */}
  </StrictMode>
);
