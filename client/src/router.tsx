import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { ProductList } from "./pages/ProductList/ProductList";
import { ProductView } from "./pages/ProductView/ProductView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/produktkatalog",
        element: <ProductList />,
      },
      {
        path: "/produktkatalog/:id",
        element: <ProductView />,
      },
    ],
  },
]);
