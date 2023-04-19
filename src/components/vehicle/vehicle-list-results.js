import { useState, useEffect } from "react";
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
  TableContainer,
} from "@mui/material";
import { DELETE_VEHICLE, REVERSE_VEHICLE } from "../../graphql/queries";
import { stringAvatar } from "../../utils/getStringAvatar";
import { updateVehicleInState } from "../../redux/slice/globalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Search as SearchIcon } from "../../icons/search";
import PopUpSeeVehicle from "./PopUpSeeVehicle";
import PopUpModifyVehicle from "./PopUpModifyVehicle";
import PopUpMutation from "../custom/PopUpMutation";
import ButtonView from "../ButtonView";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import ToastCustom from "../ToastCustom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonRecovery from "../ButtonRecovery";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

export const VehicleListResults = ({ ...rest }) => {
  const { vehicles, drivers } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalSeeVehicle, setModalSeeVehicle] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [modalOnRecovery, setModalOnRecovery] = useState(false);
  const [vehicleFilter, setVehicleFilter] = useState([]);
  const [filter, setFilter] = useState(null);
  const [vehicleView, setVehicleView] = useState(vehicles);
  const [data, setData] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [toast, setToast] = useState({
    header: "",
    body: "",
    state: false,
    type: "",
    delay: 6000,
  });
  const [valueView, setValueView] = useState("1");

  const handleChangeView = (event, newValueView) => {
    if (newValueView === "1") {
      setPage(0);
      setVehicleView(vehicles.filter((dri) => dri.delete === false));
      setRowCount(vehicles.filter((dri) => dri.delete === false).length);
    } else if (newValueView === "2") {
      setPage(0);
      setVehicleView(vehicles.filter((dri) => dri.delete != false));
      setRowCount(vehicles.filter((dri) => dri.delete != false).length);
    } else {
      setPage(0);
      setRowCount(vehicles.length);
      setVehicleView(vehicles);
    }
    setValueView(newValueView);
  };

  useEffect(() => {
    if (data) {
      if (data.updateVehicle) {
        dispatch(updateVehicleInState(data.updateVehicle));
        setValueView("1");
      }
      if (data.reverseDeleteVehicle) {
        dispatch(updateVehicleInState(data.reverseDeleteVehicle));
        setValueView("1");
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (valueView === "1") {
      setVehicleView(vehicles.filter((dri) => dri.delete === false));
      setRowCount(vehicles.filter((dri) => dri.delete === false).length);
    } else if (valueView === "2") {
      setVehicleView(vehicles.filter((dri) => dri.delete != false));
      setRowCount(vehicles.filter((dri) => dri.delete != false).length);
    } else {
      setRowCount(vehicles.length);
      setVehicleView(vehicles);
    }
  }, [vehicles, valueView]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    let leftLimit = newPage * limit;
    if (valueView === "1") {
      setVehicleView(
        vehicles
          .filter((dri) => dri.delete === false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else if (valueView === "2") {
      setVehicleView(
        vehicles
          .filter((dri) => dri.delete != false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else {
      setVehicleView(vehicles.slice(leftLimit, leftLimit + limit));
    }
    setPage(newPage);
  };

  const viewDriver = (idDriver) => {
    const driver = drivers
      .filter((dri) => dri.delete !== true)
      .find(({ id }) => id === idDriver);
    if (driver)
      return (
        <>
          {driver.image[0] ? (
            <Avatar src={driver.image[0]} sx={{ mr: 2 }}>
              {driver.name}
            </Avatar>
          ) : (
            <Avatar
              {...stringAvatar(`${driver.name} ${driver.lastName}`)}
              sx={{ mr: 2 }}
            />
          )}
          <Typography color="textPrimary" variant="body1">
            {driver.name}
          </Typography>
        </>
      );

    return "Aucun chauffeur";
  };

  const confirmMutation = async (mutation) => {
    try {
      await mutation();
      setModalOnDelete(false);
    } catch (error) {
      setToast({
        header: "Erreur",
        body: `Erreur : ${error.message || ""}`,
        type: "error",
        state: true,
      });
    }
  };

  const confirmMutationRecovery = async (mutation) => {
    try {
      await mutation();
      setModalOnRecovery(false);
    } catch (error) {
      setToast({
        header: "Erreur",
        body: `Erreur : ${error.message || ""}`,
        type: "error",
        state: true,
      });
    }
  };

  const handleSuperAdmSearch = (value) => {
    setValueView("3");
    setFilter(value);
    if (value.trim() === "") {
      setVehicleView(vehicles);
      return 0;
    }
    setVehicleFilter(
      vehicles.filter((veh) => {
        if (veh.name.toUpperCase().indexOf(value.toUpperCase()) > -1)
          return veh;
      })
    );
    setRowCount(
      vehicleFilter.length < 1 ? vehicles.length : vehicleFilter.length
    );
    setVehicleView(vehicleFilter.length < 1 ? vehicles : vehicleFilter);
  };

  const handleSearch = (value) => {
    setFilter(value);
    if (value.trim() === "") {
      setVehicleView(vehicles.filter((veh) => veh.delete === false));
      return 0;
    }
    setVehicleFilter(
      vehicles
        .filter((veh) => veh.delete === false)
        .filter((veh) => {
          if (veh.name.toUpperCase().indexOf(value.toUpperCase()) > -1)
            return veh;
        })
    );
    setVehicleView(
      vehicleFilter.length < 1
        ? vehicles.filter((veh) => veh.delete === false)
        : vehicleFilter
    );
    setRowCount(
      vehicleFilter.length < 1
        ? vehicles.filter((veh) => veh.delete === false).length
        : vehicleFilter.length
    );
  };

  return (
    <>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    placeholder="Recherche"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    onChange={({ target: { value } }) => {
                      if (user.superAdm) {
                        handleSuperAdmSearch(value);
                      } else {
                        handleSearch(value);
                      }
                    }}
                    variant="outlined"
                  />
                </Box>
              </Grid>
              {user.superAdm && (
                <Grid item md={6} xs={12}>
                  <ToggleButtonGroup
                    value={valueView}
                    exclusive
                    onChange={handleChangeView}
                    aria-label="text alignment"
                  >
                    <ToggleButton value="3" aria-label="left aligned">
                      Tout
                    </ToggleButton>
                    <ToggleButton value="1" aria-label="centered">
                      Non Supprimer
                    </ToggleButton>
                    <ToggleButton value="2" aria-label="right aligned">
                      Supprimer
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Card>
        <Box className="tableScrol">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nom</StyledTableCell>
                  <StyledTableCell>Chauffeur</StyledTableCell>
                  <StyledTableCell>Debut Service</StyledTableCell>
                  <StyledTableCell>Année de fabrication</StyledTableCell>
                  <StyledTableCell>Numero de chassis</StyledTableCell>
                  <StyledTableCell>Puissance</StyledTableCell>
                  <StyledTableCell>N° Imma</StyledTableCell>
                  <StyledTableCell>Voir</StyledTableCell>

                  {user.upVehicle && valueView == "1" && (
                    <StyledTableCell>modifier</StyledTableCell>
                  )}
                  {user.delVehicle && valueView == "1" && (
                    <StyledTableCell>Sup</StyledTableCell>
                  )}
                  {user.delVehicle && valueView == "2" && (
                    <StyledTableCell>Restorer</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicleView.slice(0, limit).map((vehicle) => (
                  <TableRow
                    hover
                    className={valueView == "3" && vehicle.delete && "disabled"}
                    key={vehicle.id}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {vehicle.image[0] ? (
                          <Avatar src={vehicle.image[0]} sx={{ mr: 2 }}>
                            {vehicle.name}
                          </Avatar>
                        ) : (
                          <Avatar {...stringAvatar(vehicle.name)} />
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {vehicle.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {viewDriver(vehicle.idDriver)}
                      </Box>
                    </TableCell>
                    <TableCell>{vehicle.startYear}</TableCell>
                    <TableCell>{vehicle.yearConstruction}</TableCell>
                    <TableCell>{`${vehicle.serie}`}</TableCell>
                    <TableCell>{vehicle.power}</TableCell>
                    <TableCell>{vehicle.registrationNumber}</TableCell>
                    <TableCell>
                      <ButtonView
                        onClick={(event) => {
                          setIdSelect(vehicle.id);
                          setModalSeeVehicle(true);
                        }}
                      />
                    </TableCell>
                    {user.upVehicle && valueView == "1" && (
                      <TableCell>
                        <ButtonEdit
                          onClick={() => {
                            setIdSelect(vehicle.id);
                            setModalUpdateOn(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delVehicle && !vehicle.delete && valueView == "1" && (
                      <TableCell>
                        <ButtonDelete
                          onClick={() => {
                            setIdSelect(vehicle.id);
                            setModalOnDelete(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delVehicle && vehicle.delete && valueView == "2" && (
                      <TableCell>
                        <ButtonRecovery
                          onClick={() => {
                            setModalOnRecovery(true);
                            setIdSelect(vehicle.id);
                          }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          component="div"
          count={rowCount}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        {modalSeeVehicle && (
          <PopUpSeeVehicle
            setModalON={setModalSeeVehicle}
            openModal={modalSeeVehicle}
            vehicle={vehicles.find((veh) => veh.id === idSelect)}
          />
        )}
        {modalUpdateOn && (
          <PopUpModifyVehicle
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            vehicleUpdate={vehicles.find((veh) => veh.id === idSelect)}
          />
        )}
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_VEHICLE(idSelect)}
            setDataGet={setData}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
          />
        )}
        {modalOnRecovery && (
          <PopUpMutation
            openModal={modalOnRecovery}
            query={REVERSE_VEHICLE(idSelect)}
            setDataGet={setData}
            setModalON={setModalOnRecovery}
            confirmMutation={confirmMutationRecovery}
          />
        )}
        {toast.state && (
          <ToastCustom
            header={toast.header}
            body={toast.body}
            stateToast={toast.state}
            type={toast.type}
            delay={toast.delay}
          />
        )}
      </Card>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
