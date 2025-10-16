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

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMenu />,
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
        // loader: ({ params }) => {
        //   return defer({
        //     data: new Promise(resolve => {
        //       setTimeout(() => {
        //         axios
        //           .get(`${PREFIX}/products/${params.id}`)
        //           .then(response => resolve(response.data));
        //       }, 2000);
        //     })
        //   });
        // }
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
