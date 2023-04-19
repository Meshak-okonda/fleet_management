import React from 'react';
import {  Spinner } from 'react-bootstrap';
import { GetFrenchElementControl } from "../../utils";
import PopOver from '../custom/PopOver';
import { useMutation } from '@apollo/client';
import { CREATE_CONTROL_VEHICLE } from '../../graphql/queries';
import ToastCustom from "../ToastCustom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ButtonSubmit from "../ButtonSubmit";
import { Grid } from "@mui/material";

export default function PopUpVerifControl({
  modalOn,
  setModalOn,
  dataControl,
  date,
  idVehicle,
  reset,
  setDay,
}) {
  const [mutation, { data, loading, error }] = useMutation(
    CREATE_CONTROL_VEHICLE
  );
  const handleClose = () => setModalOn(false);
  let stateVehicle = {
    damaged: 0,
    good: 0,
    missing: 0,
  };
  dataControl.map((data) => {
    if (data[data.name] && data[data.name].state) {
      switch (data[data.name].state) {
        case "Bonne":
          stateVehicle.good += 1;
          break;
        case "Bon":
          stateVehicle.good += 1;
          break;
        case "Abimé":
          stateVehicle.damaged += 1;
          break;
        case "Manque":
          stateVehicle.missing += 1;
          break;
        default:
          break;
      }
    }
  });
  if (data) {
    reset();
    setDay(null);
    setTimeout(() => {
      handleClose();
    }, 5000);
    return (
      <ToastCustom
        stateToast={true}
        body="Contrôle ajouté avec succès"
        header="Felicitation"
        type="success"
        delay={5000}
      />
    );
  }
  if (error) {
    setTimeout(() => {
      handleClose();
    }, 5000);
    console.log(error);
    return (
      <ToastCustom
        stateToast={true}
        body="Erreur lors de l\'ajout du controle"
        header="Erreur"
        type="error"
        delay={5000}
      />
    );
  }

  const validateControl = () => {
    let dataFormat = {};
    dataControl.forEach((data) => {
      if (data[data.name] && data[data.name].state) {
        dataFormat[data.name] = {
          state: data[data.name].state,
        };
        data[data.name].comment
          ? (dataFormat[data.name].comment = data[data.name].comment)
          : null;
        data[data.name].image
          ? (dataFormat[data.name].image = data[data.name].image)
          : null;
      }
      if (data.name == "mileage") {
        dataFormat[data.name] = data[data.name];
      }
    });
    dataFormat = {
      ...dataFormat,
      stateVehicle,
      dateVerification: date,
      idVehicle,
    };
    try {
      mutation({
        variables: {
          vehicleVerification: dataFormat,
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth="md"
        open={modalOn}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Resumé du controle
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid
            container
            sx={{
              pt: 3,
              pb: 3,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Grid
              item
              className="bold text-center"
              sx={{ p: 0.7, borderRadius: 1 }}
              style={{ backgroundColor: "#003863", color: "white" }}
            >
              Bon <br />
              {stateVehicle.good === 0 ? "Aucun" : stateVehicle.good}
            </Grid>
            <Grid
              item
              sx={{ p: 0.7, borderRadius: 1 }}
              className="bold text-center"
              style={{ backgroundColor: "#FB8C00", color: "white" }}
            >
              Abimé <br />
              {stateVehicle.damaged === 0 ? "Aucun" : stateVehicle.damaged}
            </Grid>
            <Grid
              item
              sx={{ p: 0.7, borderRadius: 1 }}
              style={{ backgroundColor: "#e53935", color: "white" }}
              className="bold text-center"
            >
              Manque <br />
              {stateVehicle.missing === 0 ? "Aucun" : stateVehicle.missing}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {dataControl?.map((data, key) => {
              return (
                <Grid item lg={3} sm={12} xl={4} xs={6} key={key}>
                  <PopOver
                    buttonPlaceHolder={GetFrenchElementControl(data.name)}
                    title={
                      data[data.name]
                        ? data[data.name].state
                          ? data[data.name].state
                          : data[data.name]
                        : ""
                    }
                    body={data[data.name] ? data[data.name].comment : ""}
                    image={data[data.name] ? data[data.name].image : ""}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <Spinner animation="border" variant="blue" />
          ) : (
            <ButtonSubmit autoFocus onClick={validateControl} />
          )}
        </DialogActions>
      </BootstrapDialog>
    </>
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
