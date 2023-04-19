import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Image, Row, Col, Container } from "react-bootstrap";
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

export default function PopUpSeeVehicle({ vehicle, setModalON, openModal }) {
  const { drivers } = useSelector((state) => state.globalState);
  const [image, setImage] = useState({
    url: vehicle.image[0] ? vehicle.image[0] : PlaceholderImage,
    index: 0,
  });
  const [vehicleView, setVehicleView] = useState(null);
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
        Portaille de : {vehicle.name}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {vehicle && (
          <Container>
            <Row className="p-grid">
              <Col xs={10}>
                <img
                  className="d-block rounded-lg mb-1"
                  src={image.url || PlaceholderImage.src}
                  alt={`Photo numero 1`}
                  height="550px"
                  style={{
                    objectFit: "cover",
                  }}
                  width="100%"
                  radius="5px"
                />
              </Col>
              <Col xs={2}>
                {vehicle.image &&
                  vehicle.image.map((img, index) => (
                    <div
                      className="mt-1"
                      key={index}
                      onClick={() => setImage({ url: img, index })}
                    >
                      <Image
                        className={
                          image.index === index
                            ? "zoomHoverActive"
                            : "zoomHoverInactive"
                        }
                        src={
                          img?.startsWith("http")
                            ? img
                            : `${process.env.LIEN_BACK_IMAGE}${img}`
                        }
                        alt={`Photo numero ${index + 1}`}
                        height="80px"
                        width="90px"
                      />
                    </div>
                  ))}
              </Col>
              <Row>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5 className="title-element">Nom</h5>
                    <p>{vehicle.name || "Aucun nom"}</p>
                  </div>
                </Col>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>Date de Debut d&apos;activité</h5>
                    <p>{vehicle.startYear || "Aucun nom"}</p>
                  </div>
                </Col>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>Année de fabrication</h5>
                    <p className="text-red-900">
                      {vehicle.yearConstruction || "Aucun nom"}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>N° Immatriculation</h5>
                    <p>{vehicle.registrationNumber || "Aucun nom"}</p>
                  </div>
                </Col>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>Numero de chassis</h5>
                    <p>{vehicle.serie || "Aucun nom"}</p>
                  </div>
                </Col>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>Model</h5>
                    <p>{vehicle.model || "Aucun nom"}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>Puissance du Moteur</h5>
                    <p>{vehicle.power || "Aucun nom"}</p>
                  </div>
                </Col>
                <Col>
                  <div className="p-col-6 card-custom">
                    <h5>Identifiant GPS</h5>
                    <p className="text-red-900">
                      {vehicle.gpsData || "Aucun nom"}
                    </p>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Row>
          </Container>
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
