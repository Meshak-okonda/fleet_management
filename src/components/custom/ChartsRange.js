import React, {useState} from 'react';
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import ViewChartsSegement from './ViewChartsSegement';
import { useAppSelector } from '../../hooks';
import { GetFrenchElementControl } from '../../utils';
import PopOver from './PopOver';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  Button
} from "@mui/material";
import {AiFillEye} from 'react-icons/ai';
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ChartsRange({ dataCharts }) {
	const { vehicles, drivers } = useAppSelector((state) => state.globalState);
	let dataFormat = {};
	let dataStat = [];
	let dataRecupSimple = [];
	let dataToExport = [];
	let listDate = [];
	let vehicleName = '';
	const exportColumns = [{ title: "Nom de l'élément", dataKey: 'name' }];

	function formatDataElementControlToExport(listElementControl) {
		for (const property in listElementControl) {
			const name = GetFrenchElementControl(property);
			let valueProperty = {};
			listElementControl[property].map(({ name, good, missing, damaged }) => {
				valueProperty[name] = good ? 'B' : missing ? ' M' : 'A';
			});
			dataToExport.push({ name, ...valueProperty });
		}
	}

	function formatStatGeneralControlToExport(dataStatGen) {
    let good = {};
    let damaged = {};
    let missing = {};
    for (let i = 0; i < dataStatGen.length; i++) {
      good[dataStatGen[i].name] = dataStatGen[i].good;
      damaged[dataStatGen[i].name] = dataStatGen[i].damaged;
      missing[dataStatGen[i].name] = dataStatGen[i].missing;
    }
    dataToExport.push({
      name: "Element Bon Etat Total",
      ...good,
    });
    dataToExport.push({
      name: "Element Abimé Total",
      ...damaged,
    });
    dataToExport.push({
      name: "Element Manquant Total",
      ...missing,
    });
  }

  function formatDataExport(dataHeader, listElementControl, dataStatGen) {
    exportColumns.push(
      ...dataHeader.map((element) => {
        return {
          title: `Au ${element}`,
          dataKey: element,
        };
      })
    );
    formatDataElementControlToExport(listElementControl);
    formatStatGeneralControlToExport(dataStatGen);
  }

  function compare(a, b) {
    const genreA = a.name.toUpperCase();
    const genreB = b.name.toUpperCase();
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  if (dataCharts) {
    dataCharts.map((dataDayValue) => {
      for (const property in dataDayValue) {
        if (
          dataDayValue[property] &&
          dataDayValue[property].state &&
          property !== "stateVehicle"
        ) {
          if (!dataFormat[property]) {
            dataFormat[property] = [];
          }
          dataFormat[property].push({
            name: dataDayValue["dateVerification"],
            good: dataDayValue[property].state === "Bon" ? 1 : 0,
            damaged: dataDayValue[property].state === "Abimé" ? 1 : 0,
            missing: dataDayValue[property].state === "Manque" ? 1 : 0,
            comment: dataDayValue[property].comment
              ? dataDayValue[property].comment
              : null,
            image: dataDayValue[property].image
              ? dataDayValue[property].image
              : null,
          });
        } else if (property === "stateVehicle") {
          dataStat.push({
            name: dataDayValue["dateVerification"],
            ...dataDayValue[property],
          });
        } else if (property === "idVehicle") {
          if (dataRecupSimple && dataRecupSimple.length < 1) {
            let vehicle = vehicles.find(
              (vehicle) => vehicle.id === dataDayValue[property]
            );
            if (vehicle) {
              vehicleName = vehicle.name;
              let driver = drivers.find(
                (driver) => driver.id === vehicle.idDriver
              );
              dataRecupSimple.push({
                name: "Véhicule",
                data: vehicle.name || "Aucune donnée",
              });
              dataRecupSimple.push({
                name: "Chauffeur Attribué",
                data:
                  driver && driver.name
                    ? `${driver.name || ""} ${driver.lastName || ""}`
                    : "Aucune donnée",
              });
            }
          }
        } else {
          if (property === "dateVerification") {
            listDate.push(dataDayValue[property]);
          } else {
            if (
              dataRecupSimple &&
              dataRecupSimple.length < 3 &&
              property !== "id" &&
              property !== "mileage"
            ) {
              dataRecupSimple.push({
                name: property,
                data: dataDayValue[property] || "Aucune donnée",
              });
            }
          }
        }
      }
    });
    dataRecupSimple.push({
      name: "mileage",
      data: `${dataCharts[0].mileage} KM - ${
        dataCharts[dataCharts.length - 1].mileage
      } KM`,
    });
    dataRecupSimple.push({
      name: "Jour(s)",
      data: listDate.sort().join(", "),
    });
    formatDataExport(listDate, dataFormat, dataStat);
  }
  return (
    <Card>
      <CardContent>
        <Grid className="p-col-12 p-d-flex p-fluid p-formgrid p-grid justify-content-center">
          <Grid container spacing={3}>
            <Grid item lg={8} sm={12} xl={8} xs={12}>
              <ViewChartsSegement
                data={dataStat.sort(compare)}
                name="Statistique général"
              />
            </Grid>
            <Grid item lg={4} sm={12} xl={4} xs={12}>
              {dataRecupSimple &&
                dataRecupSimple?.map(({ name, data }) => {
                  return (
                    <div className="p-col-12 mt-3 mb-3 text-left" key={name}>
                      <h3>
                        {GetFrenchElementControl(name)
                          ? GetFrenchElementControl(name)
                          : name}
                      </h3>
                      <p className="h6 p-warning bold">{data}</p>
                    </div>
                  );
                })}
              <ButtonPdf
                title="Exporter PDF"
                formData={exportColumns}
                data={dataToExport}
                nameFile={`Statistique du véhicule (${vehicleName})`}
                legend={`*  legende : B = bonne | A = abimé(e) | M = manquant(e)`}
              />
              <ButtonExcel
                title="Exporter PDF"
                data={dataToExport}
                nameFile={`Statistique du véhicule (${vehicleName})`}
              />
            </Grid>
          </Grid>
        </Grid>
        <br />
        <hr />
        <br />
        <Grid
          container
          sx={{
            justifyContent: "flex-start",
          }}
          spacing={3}
        >
          {Object.keys(dataFormat)?.map((data, key) => {
            return (
              <Grid
                item
                key={key}
                sx={{
                  justifyContent: "center",
                }}
                lg="auto"
                sm={6}
                xl={1}
                xs={6}
              >
                <ButtonDialog key={key} name={GetFrenchElementControl(data)}>
                  <ViewChartsSegement
                    data={dataFormat[data].sort(compare)}
                    name={
                      GetFrenchElementControl(data)
                        ? GetFrenchElementControl(data)
                        : data
                    }
                  />
                  <div className="d-flex justify-content-around">
                    {dataFormat[data]
                      .sort(compare)
                      .map(({ comment, image, name }, key) => {
                        return (
                          (comment || image) && (
                            <div className="m-1" key={key}>
                              <PopOver
                                buttonPlaceHolder={name}
                                title={`Info au : ${name}`}
                                body={` ${comment}`}
                                image={image}
                              />
                            </div>
                          )
                        );
                      })}
                  </div>
                </ButtonDialog>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}



const ButtonDialog = ({children, name})=>{
	const [open, setOpen]= useState(false);
	const handleClose = () =>setOpen(false);
	return (<>
			<Button color="primary"
            variant="contained"
sx={{
				pd: 10,
				display: "flex"
			}}
startIcon={<AiFillEye fontSize="small" />}
onClick={()=> setOpen(!open)}>
				{name}
			</Button>
			{open && <BootstrapDialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			fullWidth={true}
			maxWidth="md"
			open={open}
			>
			<BootstrapDialogTitle
			id="customized-dialog-title"
			onClose={handleClose}
			>
			{name}
			</BootstrapDialogTitle>
			<DialogContent dividers>
			<div>
				{children}
			</div>
			</DialogContent>
			<DialogActions>
				<Button
onClick={handleClose}>Ok</Button>
			</DialogActions>
			</BootstrapDialog>}
			</>);
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