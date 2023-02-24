import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProductPage from "../pages/Product";
import ProductsPage from "../pages/Products";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<ProductsPage />} />
        <Route element={<ProductPage />} path="/:id" />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
