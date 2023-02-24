import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { STATUSES } from "../../constants";
import { useCustomSearchParams } from "../../hooks/useCustomSearchParams";
import { useMobxStore } from "../../store/store";

const ProductPage = () => {
  const [params, setParams] = useCustomSearchParams();
  const { id } = useParams();
  const { product } = useMobxStore();

  const activeProduct = product?.product;
  const activeProductWithColor = product?.itemWithColor;

  const onSizeChange = (id) => {
    product.setSize(id);
  };

  const onColorChange = (id) => {
    setParams({ color: id });
  };

  useEffect(() => {
    product.fetchItem(id);
  }, [id]);

  useEffect(() => {
    if (params?.color) {
      product.setColor(params.color);
      product.setSize(null);
    }
  }, [params?.color]);

  if (product.status === STATUSES.INIT || product.status === STATUSES.LOADING) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={"product"}>
      <div className={"images"}>
        <div className="image--main"></div>
        <div className="images_row"></div>
      </div>
      <div className={"info"}>
        <Typography variant="h3">{activeProduct.name}</Typography>
        <Typography>Цвет: {activeProductWithColor?.name}</Typography>
        <Typography color={"green"}>Цена: {activeProductWithColor?.price}</Typography>
        <Box>
          {!!activeProduct.colors &&
            activeProduct.colors.map((sz) => {
              const isActive = product.color === sz.id;
              return (
                <Button
                  onClick={() => onColorChange(sz.id)}
                  variant="contained"
                  color={isActive ? "success" : "primary"}
                  key={sz.id}>
                  {sz.name}
                </Button>
              );
            })}
        </Box>
        <Box>
          {!!product.sizes &&
            product.sizes.map((sz) => {
              const disabled = !activeProductWithColor.sizes.includes(sz.id);
              const isActive = product.size === sz.id;
              return (
                <Button
                  onClick={() => onSizeChange(sz.id)}
                  variant="contained"
                  color={isActive ? "success" : "primary"}
                  key={sz.id}
                  disabled={disabled}>
                  {sz.label} - {sz.number}
                </Button>
              );
            })}
        </Box>
      </div>
    </div>
  );
};

export default observer(ProductPage);
