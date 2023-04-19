import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
} from "@mui/material";
import { DELETE_VEHICLE, REVERSE_VEHICLE } from "../../../graphql/queries";
import { stringAvatar } from "../../../utils/getStringAvatar";
import { updateVehicleInState } from "../../../redux/slice/globalSlice";
import { useAppSelector } from "../../../hooks";
import { Dropdown } from "primereact/dropdown";
import ButtonPdf from "../../ButtonPdf";
import ButtonExcel from "../../ButtonExcel";

export const HistoryListResults = ({ setHistory }) => {
  const { vehicles, drivers, vehiclesHistory } = useAppSelector(
    (state) => state.globalState
  );
  const refactorVehicles = [];
  vehicles
    .filter((veh) => veh.delete !== true)
    .forEach(({ name, id }) => {
      refactorVehicles.push({
        label: `${name}`,
        value: `${id}`,
      });
    });
  const { user } = useAppSelector((state) => state.userConnected);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [historyView, setHistoryView] = useState([]);
  const [idSelected, setIdSelected] = useState(null);
  const [countRow, setCountRow] = useState(0);
  const [nameVehicle, setNameVehicle] = useState(null);
  const [dataExport, setDataExport] = useState([]);
  const exportColumns = [
    { title: "Nom & post Nom du chauffeur", dataKey: "name" },
    { title: "Date d'attribution", dataKey: "date" },
  ];

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    let leftLimit = newPage * limit;
    let historyVehicle = [];
    let dataToExport = [];
    vehiclesHistory.forEach((history) => {
      if (history.idVehicle === idSelected) {
        const driver = drivers.find(({ id }) => id === history.idDriver);
        dataToExport.push({
          name: driver
            ? `${driver.name} ${driver.lastName}`
            : "Aucune donnée sur le chauffeur",
          date: formatDateString(history.createdAt),
        });
        historyVehicle.push(history);
      }
    });
    setDataExport(dataToExport.reverse());
    setHistoryView(historyVehicle.reverse().slice(leftLimit, leftLimit + limit));
    setPage(newPage);
  };

  const viewDriver = (idDriver) => {
    const driver = drivers.find(({ id }) => id === idDriver);
    if (driver)
      return (
        <>
          {driver.image[0] ? (
            <Avatar src={driver.image[0]}
sx={{ mr: 2 }}>
              {driver.name}
            </Avatar>
          ) : (
            <Avatar
              {...stringAvatar(`${driver.name} ${driver.lastName}`)}
              sx={{ mr: 2 }}
            />
          )}
          <Typography color="textPrimary"
variant="body1">
            {driver.name}
          </Typography>
        </>
      );

    return "Aucun chauffeur";
  };
  function formatDateString(date) {
    const dateFormat = date.split("T")[0].split("-").reverse().join("/");
    const hour = date.split("T")[1].split(".")[0];
    return `${dateFormat} à ${hour}`;
  }

  return (
    <>
      <Box
        sx={{
          mt: 1,
          mb: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={6} xs={12}>
                <Box
                  sx={{
                    maxWidth: 800,
                    minWidth: 500,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Dropdown
                    value={idSelected}
                    options={refactorVehicles}
                    autoFocus
                    onChange={({ value }) => {
                      setNameVehicle(vehicles.find((veh) => veh.id === value));
                      setIdSelected(value);
                      let historyVehicle = [];
                      let dataToExport = [];
                      vehiclesHistory.forEach((history) => {
                        if (history.idVehicle === value) {
                          const driver = drivers.find(
                            ({ id }) => id === history.idDriver
                          );
                          dataToExport.push({
                            name: driver
                              ? `${driver.name} ${driver.lastName}`
                              : "Aucune donnée sur le chauffeur",
                            date: formatDateString(history.createdAt),
                          });
                          historyVehicle.push(history);
                        }
                      });
                      setDataExport(dataToExport.reverse());
                      setHistoryView(historyVehicle.reverse());
                      setCountRow(historyVehicle.length);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Selection du Véhicule"
                  />
                </Box>
                {historyView.length > 0 && (
                  <Box
                    sx={{
                      maxWidth: 500,
                      minWidth: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <ButtonPdf
                      nameFile={`Historique de ${nameVehicle}`}
                      data={dataExport}
                      formData={exportColumns}
                    />
                    <ButtonExcel
                      data={dataExport}
                      nameFile={`Historique de ${nameVehicle}`}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box className="tableScrol">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Chauffeur</TableCell>
                  <TableCell>Date et heure d&apos;attribution</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyView.slice(0, limit).map((history) => (
                  <TableRow hover key={history.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {viewDriver(history.idDriver)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {formatDateString(history.createdAt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={countRow}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};