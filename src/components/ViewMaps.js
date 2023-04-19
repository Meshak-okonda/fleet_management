import { forwardRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Spinner, Row } from "react-bootstrap";
import { TransitionProps } from "@mui/material/transitions";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
    const { position } = props;
    const divStyle = {
      background: `white`,
      padding: 3,
    };
    return (
      <GoogleMap defaultZoom={14} defaultCenter={position} {...props}>
        <Marker
          animation={window.google.maps.Animation.BOUNCE}
          position={position}
        >
          <InfoWindow position={position}>
            <div style={divStyle}>
              <p>Lieu du remorquage</p>
            </div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    );
  })
);

export default function ViewMap({ position, openModal, setModalON }) {
  const handleClose = () => setModalON(false);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      fullScreen
      maxWidth="xl"
      open={openModal}
      TransitionComponent={Transition}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Lieu de remorquage
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <MyMapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCvr6WvR1Z7jWq03FD_Z3CGBU-MSaC_c50"
          loadingElement={
            <div style={{ height: `100%`, width: "100%" }}>
              <Row className="justify-content-center">
                <Spinner
                  as="span"
                  size="xxl"
                  role="status"
                  aria-hidden="true"
                />
              </Row>
            </div>
          }
          containerElement={<div style={{ height: `90vh` }} />}
          mapElement={<div style={{ height: `90vh` }} />}
          initialPosition={{ lat: position.lat, lng: position.long }}
          position={{ lat: position.lat, lng: position.long }}
          isMarkerShown
        />
      </DialogContent>
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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
