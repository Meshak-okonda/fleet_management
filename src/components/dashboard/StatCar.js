import { useQuery } from "@apollo/client";
import React from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import ViewChartsPie from "../custom/ViewChartsPie";
import { GET_MONTH_STATISTIC_CONTROL } from "../../graphql/queries";
import { GetFrenchElementControl, GetMonthInFrench } from "../../utils";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {Logo} from "../logo";

const getMonthAndYear = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};
const getMonthInFrench = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `${GetMonthInFrench(month)}`;
};

export default function StatCar({ vehicle }) {
  const { data, error, loading } = useQuery(
    GET_MONTH_STATISTIC_CONTROL(vehicle.id, getMonthAndYear())
  );
  const { vehicles, drivers } = useAppSelector((state) => state.globalState);
  let dataFormat = {};
  let dataStat = [];
  let dataRecupSimple = [];
  let dataToExport = [];
  let listDate = [];
  let vehicleName = "";
  const exportColumns = [{ title: "Nom de l'élément", dataKey: "name" }];
  if (loading)
    return (
      <Card>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Spinner
            animation="border"
            variant={"blue"}
            width="30%"
            height="30%"
          />
        </CardContent>
      </Card>
    );
  if (error)
    return (
      <Card>
        <CardHeader
          title={error && error.message ? error.message : "Contrôle inexistant"}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
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
  if (
    data.getVehicleVerificationElementsByMonth &&
    data.getVehicleVerificationElementsByMonth.length < 1
  )
    return (
      <Card>
        <CardHeader
          title={`Désolé ! Rien pour ${vehicle.name} en ${getMonthInFrench()}`}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 318,
              position: "relative",
            }}
          >
            <Logo alt="Logo CPS"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 'auto',
              }} />
          </Box>

        </CardContent>
      </Card>
    );
  function formatDataElementControlToExport(listElementControl) {
    for (const property in listElementControl) {
      const name = GetFrenchElementControl(property);
      let valueProperty = {};
      listElementControl[property].map(({ name, good, missing, damaged }) => {
        valueProperty[name.split("/")[0]] = good ? "B" : missing ? " M" : "A";
      });
      dataToExport.push({ name: name.split("/")[0], ...valueProperty });
    }
  }

  function formatStatGeneralControlToExport(dataStatGen) {
    let good = {};
    let damaged = {};
    let missing = {};
    for (let i = 0; i < dataStatGen.length; i++) {
      good[dataStatGen[i].name.split("/")[0]] = dataStatGen[i].good;
      damaged[dataStatGen[i].name.split("/")[0]] = dataStatGen[i].damaged;
      missing[dataStatGen[i].name.split("/")[0]] = dataStatGen[i].missing;
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
  function compareDataKey(a, b) {
    const genreA = a.dataKey.toUpperCase();
    const genreB = b.dataKey.toUpperCase();
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  function formatDataExport(dataHeader, listElementControl, dataStatGen) {
    exportColumns.push(
      ...dataHeader
        .map((element) => {
          return {
            title: `${element.split("/")[0]}`,
            dataKey: element.split("/")[0],
          };
        })
        .sort(compareDataKey)
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
  const { getVehicleVerificationElementsByMonth } = data;
  if (getVehicleVerificationElementsByMonth) {
    let mileage = "";
    getVehicleVerificationElementsByMonth.map((dataDayValue) => {
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
          } else if (property === "mileage") {
            mileage = `${dataDayValue[property]}`;
          } else {
            if (
              dataRecupSimple &&
              dataRecupSimple.length < 3 &&
              property !== "id"
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
      data: `${mileage} KM au dernier jour`,
    });
    dataRecupSimple.push({
      name: "Mois",
      data: `${GetMonthInFrench(listDate[0].split("/")[1])} ${
        listDate[0].split("/")[2]
      }`,
    });
    formatDataExport(listDate, dataFormat, dataStat);
  }
  return (
    <div>
      <ViewChartsPie
        data={dataStat.sort(compare)}
        name={`Statistique général de ${vehicle.name} en ${getMonthInFrench()}`}
        global={true}
      />
      <div className="p-col-12 d-flex justify-content-center">
        <ButtonPdf
          title="Exporter PDF"
          formData={exportColumns}
          data={dataToExport}
          nameFile={`Statistique du véhicule (${vehicleName})`}
        />
        <ButtonExcel
          title="Exporter PDF"
          data={dataToExport}
          nameFile={`Statistique du véhicule (${vehicleName})`}
        />
      </div>
    </div>
  );
}
