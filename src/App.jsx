import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter";
import { StoreProvider, useMobxStore } from "./store/store";

export default function App() {
  const { product } = useMobxStore();

  useEffect(() => {
    product.fetchSizes();
  }, []);

  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
