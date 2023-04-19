import React from "react";
import { Button } from "@mui/material";
import { IoIosAddCircle } from "react-icons/io";

export default function ButtonAdd(props) {
  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<IoIosAddCircle color="white"
fontSize="small" />}
      {...props}
    >{props.name}</Button>
  );
}
