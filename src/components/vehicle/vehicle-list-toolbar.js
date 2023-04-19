import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import PopUpAddVehicle from "./PopUpAddVehicle";
import { AiOutlineHistory } from "react-icons/ai";
import ButtonAdd from "../ButtonAdd";
import NextLink from "next/link";

export const VehicleListToolbar = () => {
  const { vehicles, drivers } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [modalAddVehicle, setModalAddVehicle] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const exportColumns = [
    { title: "Nom", dataKey: "name" },
    { title: "Chauffeur", dataKey: "driver" },
    { title: "Validité permis", dataKey: "licenseValidity" },
    { title: "Année de debut", dataKey: "startYear" },
    { title: "Année de fabrication", dataKey: "yearConstruction" },
    { title: "Model", dataKey: "model" },
    { title: "Puissance du Moteur", dataKey: "power" },
  ];
  useEffect(() => {
    if (vehicles.length && vehicles.length > 0) {
      setDataExport(
        vehicles
          .filter((veh) => veh.delete !== true)
          .map(
            ({
              name,
              gpsData,
              startYear,
              color,
              power,
              idDriver,
              yearConstruction,
              model,
            }) => {
              const driver = drivers.find((dri) => dri.id === idDriver);
              return {
                name,
                gpsData,
                startYear,
                color,
                power,
                driver:
                  driver && driver.name
                    ? `${driver.name} ${driver.lastName}`
                    : "Aucun chauffeur",
                licenseValidity: driver
                  ? `${driver.licenseValidity}`
                  : "",
                yearConstruction,
                model,
              };
            }
          )
      );
    }
  }, [vehicles, drivers]);
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Liste des vehicules
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            nameFile="Liste Des Vehicules"
            data={dataExport}
            formData={exportColumns}
          />
          <ButtonExcel data={dataExport} nameFile="Liste Des Vehicules" />

          {user.addVehicle && (
            <ButtonAdd
              onClick={() => setModalAddVehicle(true)}
              sx={{ mr: 1 }}
              name="Créer un Véhicule"
            />
          )}
          <NextLink href="/vehicle/history" passHref>
            <Button
              component="a"
              startIcon={<AiOutlineHistory color="#003863" fontSize="small" />}
            >
              Historique d&apos;attribution
            </Button>
          </NextLink>
        </Box>
      </Box>
      {modalAddVehicle && (
        <PopUpAddVehicle
          openModal={modalAddVehicle}
          setModalON={setModalAddVehicle}
        />
      )}
    </Box>
  );
};
