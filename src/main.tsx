import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
// import Menu from "./pages/Menu/Menu";
import { Cart } from "./pages/Cart/Cart";
import { Product } from "./pages/Product/Product.tsx";
import { Error } from "./pages/Error/Error";
import { LayoutMenu } from "./layout/Menu/LayoutMenu.tsx";
import axios from "axios";
import { PREFIX } from "./helpers/API.ts";
import { AuthLayout } from "./layout/Auth/AuthLayout.tsx";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import { RequireAuth } from "./helpers/RequireAuth.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <LayoutMenu />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Loading...</>}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/product/:id",
        element: <Product />,
        errorElement: <>Ошибка!!!</>,
        loader: async ({ params }) => {
          return defer({
            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then(response => response.data)
          });
        }
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      { path: "register", element: <Register /> }
    ]
  },
  { path: "*", element: <Error /> }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

    {/* <App /> */}
  </StrictMode>
);
