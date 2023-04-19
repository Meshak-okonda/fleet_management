import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, Spinner } from "react-bootstrap";

export default function ToastCustom({
  stateToast,
  header,
  body,
  type,
  delay = 5000,
  awaitView,
}) {
  const [show, setShow] = useState(stateToast);
  const [time, setTime] = useState(0);
  const handleClose = () => setShow(false);
  setTimeout(()=>{
    handleClose();
  }, 15000);
  return (
    <ToastContainer
      position="top-center"
      className="p-3"
      style={{ zIndex: 15000 }}
    >
      <Collapse in={show}>
        <Alert
          variant="filled"
          severity={type}
          style={{ zIndex: 15004 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              style={{ zIndex: 15005, cursor: "pointer" }}
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {!awaitView ? (
            body
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="xxl"
              role="status"
              variant="light"
            />
          )}
        </Alert>
      </Collapse>
    </ToastContainer>
  );
}