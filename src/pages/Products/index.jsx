import { CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { STATUSES } from "../../constants";
import { useMobxStore } from "../../store/store";
import ProductItem from "./components/ProductItem/ProductItem";

const ProductsPage = () => {
  const nav = useNavigate();
  const { products, product } = useMobxStore();

  useEffect(() => {
    products.fetchItems();
  }, []);

  if (products.status === STATUSES.INIT || products.status === STATUSES.LOADING) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  const onClick = (id, colorId) => {
    product.setColor(colorId);
    nav(`/${id}?color=${colorId}`);
  };

  return (
    <div className="list">
      {products.productsPreview.map((item) => {
        return <ProductItem key={`${item.id} ${item.productId}`} {...item} onClick={onClick} />;
      })}
    </div>
  );
};

export default observer(ProductsPage);
