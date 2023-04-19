import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Image, Row, Col } from "react-bootstrap";
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

export default function PopUpSeeDriver({ driver, setModalON, openModal }) {
  const { drivers, typesVehicles, vehicles } = useSelector(
    (state) => state.globalState
  );
  const [image, setImage] = useState({
    url: driver.image[0] ? driver.image[0] : PlaceholderImage,
    index: 0,
  });
  const handleClose = () => setModalON(false);
  const vehicle = vehicles.find(({ idDriver }) => driver.id === idDriver);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      fullWidth={true}
      maxWidth="md"
      open={openModal}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Portaille de : {`${driver.name} ${driver.lastName}`.toUpperCase()}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {driver && (
          <>
            <Container>
              <Row>
                <Col xs={10}>
                  <Image
                    className="d-block rounded-lg mb-1 image-cover"
                    src={
                      url?.startsWith("http")
                        ? url
                        : `${process.env.LIEN_BACK_IMAGE}${url}`
                    }
                    alt={`Photo numero 1`}
                    height="550px"
                    width="100%"
                    radius="5px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col xs={2}>
                  {driver.image &&
                    driver.image.map((img, index) => (
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
                            url?.startsWith("http")
                              ? url
                              : `${process.env.LIEN_BACK_IMAGE}${url}`
                          }
                          alt={`Photo numero ${index + 1}`}
                          height="80px"
                          width="90px"
                        />
                      </div>
                    ))}
                </Col>
              </Row>
              <Row>
                <Col xs lg="2" md="4" sm="6">
                  <div className="p-col-6 card-custom">
                    <h4 className="title-element">Nom</h4>
                    <p>{driver.name || "Aucun nom"}</p>
                  </div>
                </Col>

                <Col xs lg="2" md="4" sm="6">
                  <div className="p-col-6 card-custom">
                    <h4>PostNom</h4>
                    <p>{driver.lastName || "Aucun post-nom"}</p>
                  </div>
                </Col>
                <Col xs lg="2" md="4" sm="6">
                  <div className="p-col-6 card-custom">
                    <h4>Véhicule Attribué</h4>
                    <p>
                      {vehicle && vehicle.name
                        ? vehicle.name
                        : "Aucun Véhicule atribué"}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs lg="2" md="4" sm="6">
                  <div className="p-col-6 card-custom">
                    <h4>Sexe </h4>
                    <p>{driver.sex || "Aucune donnée"}</p>
                  </div>
                </Col>

                <Col xs lg="2" md="4" sm="6">
                  <div className="p-col-6 card-custom">
                    <h4>Age </h4>
                    <p>{driver.age || "Aucune donnée"}</p>
                  </div>
                </Col>
                <Col className="p-col-6 card-custom">
                  <h4>Adresse mail</h4>
                  <p>{driver.email || "Aucune donnée"}</p>
                </Col>
              </Row>
              <Row>
                <Col xs lg="2" md="4" sm="6">
                  <h4>Validité de la license</h4>
                  <p>{driver.licenseValidity || "Aucune donnée"}</p>
                </Col>
                <Col xs lg="2" md="4" sm="6">
                  <h4>Numero de téléphone</h4>
                  <p className="text-red-900">
                    {driver.phone || "Aucune donnée"}
                  </p>
                </Col>
              </Row>
            </Container>
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
