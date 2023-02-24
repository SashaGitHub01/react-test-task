import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { useMobxStore } from "../../../store/store";

const Sizes = ({ activeProductWithColor }) => {
  const {
    product: { size, sizes, setSize },
  } = useMobxStore();

  const onSizeChange = (id) => {
    setSize(id);
  };

  return (
    <Box>
      {!!sizes &&
        sizes.map((sz) => {
          const disabled = !activeProductWithColor.sizes.includes(sz.id);
          const isActive = size === sz.id;
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
  );
};

export default observer(Sizes);
