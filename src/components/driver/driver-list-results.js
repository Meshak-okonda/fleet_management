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
} from "@mui/material";
import { DELETE_DRIVER, REVERSE_DRIVER } from "../../graphql/queries";
import { updateDriveInState } from "../../redux/slice/globalSlice";
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Search as SearchIcon } from "../../icons/search";
import PopUpSeeDriver from "./PopUpSeeDriver";
import ButtonView from "../ButtonView";
import PopUpMutation from "../custom/PopUpMutation";
import PopUpModifyDriver from "./PopUpModifyDriver";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import ToastCustom from "../ToastCustom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonRecovery from "../ButtonRecovery";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

export const DriverListResults = () => {
  const { drivers, vehicles } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalSeeDriver, setModalSeeDriver] = useState(false);
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [modalOnRecovery, setModalOnRecovery] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [driverFilter, setDriverFilter] = useState([]);
  const [filter, setFilter] = useState(null);
  const [driverView, setDriverView] = useState(drivers);
  const [idSelect, setIdSelect] = useState("");
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
      setDriverView(drivers.filter((dri) => dri.delete === false));
      setRowCount(drivers.filter((dri) => dri.delete === false).length);
    } else if (newValueView === "2") {
      setPage(0);
      setDriverView(drivers.filter((dri) => dri.delete != false));
      setRowCount(drivers.filter((dri) => dri.delete != false).length);
    } else {
      setPage(0);
      setDriverView(drivers);
      setRowCount(drivers.length);
    }
    setValueView(newValueView);
  };

  useEffect(() => {
    if (data) {
      if (data.updateDriver) {
        dispatch(updateDriveInState(data.updateDriver));
        setValueView("1");
      }
      if (data.reverseDeleteDriver) {
        dispatch(updateDriveInState(data.reverseDeleteDriver));
        setValueView("1");
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (valueView === "1") {
      setDriverView(drivers.filter((dri) => dri.delete === false));
      setRowCount(drivers.filter((dri) => dri.delete === false).length);
    } else if (valueView === "2") {
      setDriverView(drivers.filter((dri) => dri.delete != false));
      setRowCount(drivers.filter((dri) => dri.delete != false).length);
    } else {
      setDriverView(drivers);
      setRowCount(drivers.length);
    }
  }, [drivers, valueView]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    let leftLimit = newPage * limit;
    if (valueView === "1") {
      setPage(0);
      setDriverView(
        drivers
          .filter((dri) => dri.delete === false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else if (valueView === "2") {
      setPage(0);
      setDriverView(
        drivers
          .filter((dri) => dri.delete != false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else {
      setPage(0);
      setDriverView(drivers.slice(leftLimit, leftLimit + limit));
    }
    setPage(newPage);
  };

  const viewVehicle = (id) => {
    const vehicle = vehicles
      .filter((veh) => veh.delete !== true)
      .find(({ idDriver }) => id === idDriver);
    if (vehicle)
      return (
        <>
          {vehicle.image[0] ? (
            <Avatar src={vehicle.image[0]} sx={{ mr: 2 }}>
              {vehicle.name}
            </Avatar>
          ) : (
            <Avatar
              {...stringAvatar(`${vehicle.name} ${vehicle.lastName}`)}
              sx={{ mr: 2 }}
            />
          )}
          <Typography color="textPrimary" variant="body1">
            {vehicle.name}
          </Typography>
        </>
      );

    return "Aucun Véhicule";
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
      setDriverView(drivers);
      return 0;
    }
    setDriverFilter(
      drivers.filter((dri) => {
        if (
          `${dri.name.toUpperCase()} ${dri.lastName.toUpperCase()}`.indexOf(
            value.toUpperCase()
          ) > -1
        )
          return dri;
      })
    );
    setDriverView(driverFilter.length < 1 ? drivers : driverFilter);
  };

  const handleSearch = (value) => {
    setFilter(value);
    if (value.trim() === "") {
      setDriverView(drivers);
      return 0;
    }
    setDriverFilter(
      drivers
        .filter((dri) => dri.delete === false)
        .filter((dri) => {
          if (
            `${dri.name.toUpperCase()} ${dri.lastName.toUpperCase()}`.indexOf(
              value.toUpperCase()
            ) > -1
          )
            return dri;
        })
    );
    setDriverView(
      driverFilter.length < 1
        ? drivers.filter((dri) => dri.delete === false)
        : driverFilter
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
                    variant="outlined"
                    onChange={({ target: { value } }) => {
                      if (user.superAdm) {
                        handleSuperAdmSearch(value);
                      } else {
                        handleSearch(value);
                      }
                    }}
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
                  <StyledTableCell>Nom et Post - Nom</StyledTableCell>
                  <StyledTableCell>Véhicule Associé</StyledTableCell>
                  <StyledTableCell>Validité du permis</StyledTableCell>
                  <StyledTableCell>E - Mail</StyledTableCell>
                  <StyledTableCell>Numero de Téléphone</StyledTableCell>
                  <StyledTableCell>Age</StyledTableCell>
                  <StyledTableCell>Sexe</StyledTableCell>
                  <StyledTableCell>Voir</StyledTableCell>
                  {user.upDriver && valueView == "1" && (
                    <StyledTableCell>modifier</StyledTableCell>
                  )}
                  {user.delDriver && valueView == "1" && (
                    <StyledTableCell>Sup</StyledTableCell>
                  )}
                  {user.delDriver && valueView == "2" && (
                    <StyledTableCell>Restorer</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {driverView.slice(0, limit).map((driver) => (
                  <TableRow
                    hover
                    className={valueView == "3" && driver.delete && "disabled"}
                    key={driver.id}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {driver.image[0] ? (
                          <Avatar src={driver.image[0]} sx={{ mr: 2 }}>
                            {driver.name}
                          </Avatar>
                        ) : (
                          <Avatar
                            {...stringAvatar(
                              `${driver.name} ${driver.lastName}`
                            )}
                          />
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {driver.name} {driver.lastName}
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
                        {viewVehicle(driver.id)}
                      </Box>
                    </TableCell>
                    <TableCell>{driver.licenseValidity}</TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>{driver.age}</TableCell>
                    <TableCell>{driver.sex}</TableCell>
                    <TableCell>
                      <ButtonView
                        onClick={() => {
                          setIdSelect(driver.id);
                          setModalSeeDriver(true);
                        }}
                      />
                    </TableCell>
                    {user.upDriver && valueView == "1" && (
                      <TableCell>
                        <ButtonEdit
                          onClick={() => {
                            setIdSelect(driver.id);
                            setModalUpdateOn(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delDriver && valueView == "1" && (
                      <TableCell>
                        <ButtonDelete
                          onClick={() => {
                            setIdSelect(driver.id);
                            setModalOnDelete(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {user.delDriver && driver.delete && valueView == "2" && (
                      <TableCell>
                        <ButtonRecovery
                          onClick={() => {
                            setModalOnRecovery(true);
                            setIdSelect(driver.id);
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
          rowsPerPageOptions={[3, 5, 10, 25]}
        />
        {modalSeeDriver && (
          <PopUpSeeDriver
            openModal={modalSeeDriver}
            setModalON={setModalSeeDriver}
            driver={drivers.find(({ id }) => id === idSelect)}
          />
        )}
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_DRIVER(idSelect)}
            setDataGet={setData}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
          />
        )}
        {modalOnRecovery && (
          <PopUpMutation
            openModal={modalOnRecovery}
            query={REVERSE_DRIVER(idSelect)}
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
        {modalUpdateOn && (
          <PopUpModifyDriver
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            updateDriver={drivers.find((dri) => dri.id === idSelect)}
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