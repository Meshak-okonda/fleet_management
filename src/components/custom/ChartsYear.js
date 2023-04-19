import React, {useState} from 'react';
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import { useAppSelector } from '../../hooks';
import { GetFrenchElementControl, GetMonthInFrench } from '../../utils';
import ViewChartsYear from './ViewChartsYear';
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
import {Logo} from "../logo";

export default function ChartsYear({ dataCharts, idVehicle, year }) {
	const { vehicles, drivers } = useAppSelector((state) => state.globalState);
	let dataFormat = {};
	let dataStat = [];
	let dataRecupSimple = [];
	let dataToExport = [];
	let vehicleName = '';
	let dataKeyExport = [];
	let statusExistData = false;
	dataCharts.forEach(({ month }) => {
		dataKeyExport.push({
			title: `${GetMonthInFrench(month).substr(0, 3)}`,
			dataKey: `${month}`,
		});
	});
	const exportColumns = [
		{ title: 'Elément', dataKey: 'name' },
		...dataKeyExport,
	];

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

	function formatDataElementControlToExport(listElementControl) {
		for (const property in listElementControl) {
			const name = GetFrenchElementControl(property);
			let valueProperty = {};
			listElementControl[property].forEach(
				({ name, good, missing, damaged }) => {
					valueProperty[name] = `${good}|${damaged}|${missing}`;
				}
			);
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
      if (
        dataStatGen[i].good >= 0 &&
        dataStatGen[i].damaged >= 0 &&
        dataStatGen[i].missing >= 0
      )
        statusExistData = true;
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

  function formatDataExport(listElementControl, dataStatGen) {
    formatDataElementControlToExport(listElementControl);
    formatStatGeneralControlToExport(dataStatGen);
  }

  if (dataCharts) {
    let mileage = "";
    dataCharts.map(({ month, dataMonth }) => {
      console.log(dataMonth);
      if (dataMonth) {
        for (const property in dataMonth) {
          if (
            dataMonth[property] &&
            (dataMonth[property].good ||
              dataMonth[property].damaged ||
              dataMonth[property].missing) &&
            property !== "stateVehicle"
          ) {
            if (!dataFormat[property]) {
              dataFormat[property] = [];
            }
            dataFormat[property].push({
              name: month,
              good: dataMonth[property].good,
              damaged: dataMonth[property].damaged,
              missing: dataMonth[property].missing,
            });
          } else if (property === "stateVehicle") {
            dataStat.push({
              name: month,
              ...dataMonth[property],
            });
          } else if (property === "mileage") {
            mileage = dataMonth[property] ? `${dataMonth[property]}` : mileage;
          }
        }
      }
    });
    let vehicle = vehicles.find((vehicle) => vehicle.id === idVehicle);
    if (vehicle) {
      vehicleName = vehicle.name;
      let driver = drivers.find((driver) => driver.id === vehicle.idDriver);
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
    dataRecupSimple.push({
      name: "mileage",
      data: `${mileage} KM au dernier jour`,
    });
    dataRecupSimple.push({
      name: "Anné de statistique",
      data: `${year}`,
    });
    formatDataExport(dataFormat, dataStat);
  }

  if (!statusExistData)
    return (
      <Card>
        <CardHeader title="Desolé ! Aucun control existant durant la periode !" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo
              alt="Logo CPS"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: "auto",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item lg={8} sm={12} xl={8} xs={12}>
            <ViewChartsYear
              data={dataStat.sort(compare)}
              name="Statistique général"
              global={true}
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
              nameFile={`Statistique du véhicule (${vehicleName}) en ${year}`}
              legend={`*  legende : Nombre Bon Etat | Nombre Abimé | Nombre Manquant`}
            />
            <ButtonExcel
              title="Exporter PDF"
              data={dataToExport}
              nameFile={`Statistique du véhicule (${vehicleName}) en ${year}`}
            />
          </Grid>
        </Grid>
        <br />
        <hr />
        <br />
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "flex-start",
          }}
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
                  <ViewChartsYear
                    data={dataFormat[data].sort(compare)}
                    name={
                      GetFrenchElementControl(data)
                        ? GetFrenchElementControl(data)
                        : data
                    }
                  />
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