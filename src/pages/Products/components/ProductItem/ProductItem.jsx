import React from "react";
import { Card, CardActionArea, Typography } from "@mui/material";

const ProductItem = ({ images, id, name, productId, productName, price, onClick }) => {
  return (
    <Card>
      <CardActionArea onClick={() => onClick(productId, id)} className="card">
        <div className={"image"}>
          <img src={images?.[0]} alt="img" />
        </div>
        <div className={"info"}>
          <Typography variant="h3">{productName}</Typography>
          <Typography>Цвет: {name}</Typography>
          <Typography color={"green"} variant="subtitle2">
            Цена: {price}
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default ProductItem;
