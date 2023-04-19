import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
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
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PopUpSeeResponsable from "./PopUpSeeResponsable";
import PopUpModifyResponsable from "./PopUpModifyResponsable";
import { Search as SearchIcon } from "../../icons/search";
import ButtonView from "../ButtonView";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import { DELETE_RESPONSABLE, REVERSE_RESPONSABLE } from "../../graphql/queries";
import { updateResponsableInState } from "../../redux/slice/globalSlice";
import PopUpMutation from "../custom/PopUpMutation";
import ToastCustom from "../ToastCustom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonRecovery from "../ButtonRecovery";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

export const ResponsableListResults = () => {
  const { responsables } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [idSelect, setIdSelect] = useState("");
  const [responsableFilter, setResponsableFilter] = useState([]);
  const [filter, setFilter] = useState(null);
  const [responsableView, setResponsableView] = useState(responsables);
  const [modalSeeResponsable, setModalSeeResponsable] = useState(false);
  const [modalOnRecovery, setModalOnRecovery] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [valueView, setValueView] = useState("1");
  const [data, setData] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [toast, setToast] = useState({
    header: "",
    body: "",
    state: false,
    type: "",
    delay: 6000,
  });

  useEffect(() => {
    if (valueView === "1") {
      setResponsableView(responsables.filter((dri) => dri.delete === false));
      setRowCount(responsables.filter((dri) => dri.delete === false).length);
    } else if (valueView === "2") {
      setResponsableView(responsables.filter((dri) => dri.delete != false));
      setRowCount(responsables.filter((dri) => dri.delete != false).length);
    } else {
      setResponsableView(responsables);
      setRowCount(responsables.length);
    }
  }, [responsables, valueView]);

  useEffect(() => {
    if (data) {
      if (data.reverseDeleteResponsable) {
        setTimeout(() => {
          dispatch(updateResponsableInState(data.reverseDeleteResponsable));
        }, 1000);
        setValueView("1");
      } else if (data.deleteResponsable) {
        setTimeout(() => {
          dispatch(updateResponsableInState(data.deleteResponsable));
        }, 1000);
        if (idSelect === user.id) {
          localStorage.removeItem("user");
          navigate("/");
        }
        setValueView("2");
      }
    }
  }, [data, dispatch, idSelect, user.id]);

  const handleChangeView = (event, newValueView) => {
    if (newValueView === "1") {
      setResponsableView(responsables.filter((dri) => dri.delete === false));
    } else if (newValueView === "2") {
      setResponsableView(responsables.filter((dri) => dri.delete != false));
    } else {
      setResponsableView(responsables);
    }
    setValueView(newValueView);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    let leftLimit = newPage * limit;
    if (valueView === "1") {
      setResponsableView(
        responsables
          .filter((dri) => dri.delete === false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else if (valueView === "2") {
      setResponsableView(
        responsables
          .filter((dri) => dri.delete != false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else {
      setResponsableView(responsables.slice(leftLimit, leftLimit + limit));
    }
    setPage(newPage);
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
      setResponsableView(responsables);
      return 0;
    }
    setResponsableFilter(
      responsables.filter((res) => {
        if (res.name.toUpperCase().indexOf(value.toUpperCase()) > -1)
          return res;
      })
    );
    setResponsableView(
      responsableFilter.length < 1 ? responsables : responsableFilter
    );
  };

  const handleSearch = (value) => {
    setFilter(value);
    if (value.trim() === "") {
      setResponsableView(responsables.filter((veh) => veh.delete === false));
      return 0;
    }
    setResponsableFilter(
      responsables
        .filter((veh) => veh.delete === false)
        .filter((veh) => {
          if (veh.name.toUpperCase().indexOf(value.toUpperCase()) > -1)
            return veh;
        })
    );
    setResponsableView(
      vehicleFilter.length < 1
        ? responsables.filter((veh) => veh.delete === false)
        : vehicleFilter
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
                  <StyledTableCell>Nom et Post - Nom</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Age</StyledTableCell>
                  <StyledTableCell>Sexe</StyledTableCell>
                  <StyledTableCell>Numero de Téléphone</StyledTableCell>
                  <StyledTableCell>Voir</StyledTableCell>
                  {user.upResponsable && valueView == "1" && (
                    <StyledTableCell>modifier</StyledTableCell>
                  )}
                  {user.upResponsable && valueView == "1" && (
                    <StyledTableCell>Sup</StyledTableCell>
                  )}
                  {user.delVehicle && valueView == "2" && (
                    <StyledTableCell>Restorer</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {responsableView.slice(0, limit).map((responsable) => (
                  <TableRow
                    hover
                    key={responsable.id}
                    className={
                      valueView == "3" && responsable.delete && "disabled"
                    }
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {responsable.image ? (
                          <Avatar src={responsable.image} sx={{ mr: 2 }}>
                            {responsable.name}
                          </Avatar>
                        ) : (
                          <Avatar
                            {...stringAvatar(
                              `${responsable.name} ${responsable.lastName}`
                            )}
                          />
                        )}
                        <Typography color="textPrimary" variant="body1">
                          {`${responsable.name} ${responsable.lastName}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{responsable.email}</TableCell>
                    <TableCell>{responsable.age}</TableCell>
                    <TableCell>{responsable.sex}</TableCell>
                    <TableCell>{responsable.phone}</TableCell>
                    <TableCell>
                      <ButtonView
                        onClick={() => {
                          setIdSelect(responsable.id);
                          setModalSeeResponsable(true);
                        }}
                      />
                    </TableCell>
                    {user.upResponsable &&
                      (!responsable.superAdm || user.superAdm) &&
                      valueView == "1" && (
                        <TableCell>
                          <ButtonEdit
                            onClick={() => {
                              setIdSelect(responsable.id);
                              setModalUpdateOn(true);
                            }}
                          />
                        </TableCell>
                      )}
                    {user.delResponsable &&
                      !responsable.delete &&
                      valueView == "1" &&
                      !responsable.superAdm && (
                        <TableCell>
                          <ButtonDelete
                            onClick={() => {
                              setIdSelect(responsable.id);
                              setModalOnDelete(true);
                            }}
                          />
                        </TableCell>
                      )}
                    {user.delVehicle && responsable.delete && valueView == "2" && (
                      <TableCell>
                        <ButtonRecovery
                          onClick={() => {
                            setModalOnRecovery(true);
                            setIdSelect(responsable.id);
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
          count={responsableView.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
        {modalSeeResponsable && (
          <PopUpSeeResponsable
            openModal={modalSeeResponsable}
            setModalON={setModalSeeResponsable}
            responsable={responsables.find((res) => res.id === idSelect)}
          />
        )}
        {modalUpdateOn && (
          <PopUpModifyResponsable
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            responsableUpdate={responsables.find((res) => res.id === idSelect)}
          />
        )}
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_RESPONSABLE(idSelect)}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
          />
        )}
        {modalOnRecovery && (
          <PopUpMutation
            openModal={modalOnRecovery}
            query={REVERSE_RESPONSABLE(idSelect)}
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