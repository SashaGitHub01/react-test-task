import { createContext, useContext } from "react";
import { ProductsStore } from "./ProductsStore";
import { ProductStore } from "./ProductStore";

export const store = {
  products: new ProductsStore(),
  product: new ProductStore(),
};

const StoreContext = createContext(store);

export const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useMobxStore = () => useContext(StoreContext);
