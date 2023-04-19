import { useState, useEffect } from "react";
import { Modal, Image, Row, Col } from "react-bootstrap";
import PlaceholderImage from "../../assets/logo.png";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export default function PopUpSeeResponsable({
  responsable,
  setModalON,
  openModal,
}) {
  const handleClose = () => setModalON(false);


  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      fullWidth={true}
      maxWidth="md"
      open={openModal}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Portaille de :{" "}
        {`${responsable.name} ${responsable.lastName}`.toUpperCase()}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {responsable && (
          <>
            <Row>
              <Col xs={12}>
                <Image
                  className="d-block rounded-lg d-flex justify-content-center rounded-hover image-cover"
                  src={
                    responsable.image?.startsWith("http")
                      ? responsable.image
                      : `${process.env.LIEN_BACK_IMAGE}${responsable.image}`
                  }
                  alt={`Photo numero 1`}
                  height="550px"
                  style={{
                    objectFit: "cover",
                  }}
                  minWidth="550px"
                  width="100%"
                />
              </Col>
            </Row>
            <Row>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4 className="title-element">Nom</h4>
                  <p>{responsable.name || "Aucun nom"}</p>
                </div>
              </Col>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4>Post Nom</h4>
                  <p>{responsable.lastName || "Aucun nom"}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4>Age</h4>
                  <p>{responsable.age || "Aucun nom"}</p>
                </div>
              </Col>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4>Sexe</h4>
                  <p>{responsable.sex || "Aucun nom"}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4>Identifiant GPS</h4>
                  <p className="text-red-900">
                    {responsable.gpsData || "Aucun nom"}
                  </p>
                </div>
              </Col>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4>Numero de Téléphone</h4>
                  <p>{responsable.phone || "Aucun nom"}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs lg="2" md="4" sm="6">
                <div className="p-col-6 card-custom">
                  <h4>E - Mail</h4>
                  <p>{responsable.email || "Aucun nom"}</p>
                </div>
              </Col>
            </Row>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}
{...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
