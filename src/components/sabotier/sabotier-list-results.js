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
import { DELETE_SABOTIER, RECOVERY_SABOTIER } from "../../graphql/queries";
import {
  updatePointerInState,
  updateSabotierInState,
} from "../../redux/slice/globalSlice";
import { stringAvatar } from "../../utils/getStringAvatar";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Search as SearchIcon } from "../../icons/search";
import PopUpMutation from "../custom/PopUpMutation";
import PopUpModifyPointer from "./PopUpModifyPointer";
import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonRecovery from "../ButtonRecovery";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

export const SabotierListResults = () => {
  const { sabotiers } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalOnDelete, setModalOnDelete] = useState(false);
  const [modalOnRecovery, setModalOnRecovery] = useState(false);
  const [modalUpdateOn, setModalUpdateOn] = useState(false);
  const [driverFilter, setDriverFilter] = useState([]);
  const [filter, setFilter] = useState(null);
  const [driverView, setDriverView] = useState(sabotiers);
  const [idSelect, setIdSelect] = useState("");
  const [data, setData] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [valueView, setValueView] = useState("1");

  const handleChangeView = (event, newValueView) => {
    if (newValueView === "1") {
      setPage(0);
      setDriverView(sabotiers.filter((poi) => poi.delete === false));
      setRowCount(sabotiers.filter((poi) => poi.delete === false).length);
    } else if (newValueView === "2") {
      setPage(0);
      setDriverView(sabotiers.filter((poi) => poi.delete != false));
      setRowCount(sabotiers.filter((poi) => poi.delete != false).length);
    } else {
      setPage(0);
      setDriverView(sabotiers);
      setRowCount(sabotiers.length);
    }
    setValueView(newValueView);
  };

  useEffect(() => {
    if (data) {
      if (data.reverseDeleteSabotier) {
        dispatch(
          updateSabotierInState({
            ...data.reverseDeleteSabotier,
            delete: false,
          })
        );
        setValueView("1");
      }

      if (data.deleteSabotier) {
        dispatch(
          updateSabotierInState({ ...data.deleteSabotier, delete: true })
        );
        setValueView("1");
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (valueView === "1") {
      setDriverView(sabotiers.filter((poi) => poi.delete === false));
      setRowCount(sabotiers.filter((poi) => poi.delete === false).length);
    } else if (valueView === "2") {
      setDriverView(sabotiers.filter((poi) => poi.delete != false));
      setRowCount(sabotiers.filter((poi) => poi.delete != false).length);
    } else {
      setDriverView(sabotiers);
      setRowCount(sabotiers.length);
    }
  }, [sabotiers, valueView]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    let leftLimit = newPage * limit;
    if (valueView === "1") {
      setPage(0);
      setDriverView(
        sabotiers
          .filter((poi) => poi.delete === false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else if (valueView === "2") {
      setPage(0);
      setDriverView(
        sabotiers
          .filter((poi) => poi.delete != false)
          .slice(leftLimit, leftLimit + limit)
      );
    } else {
      setPage(0);
      setDriverView(sabotiers.slice(leftLimit, leftLimit + limit));
    }
    setPage(newPage);
  };

  const confirmMutation = async (mutation) => {
    try {
      await mutation({
        variables: {
          deleteSabotierId: idSelect,
        },
      });
      setModalOnDelete(false);
    } catch (error) {
      setModalOnDelete(false);
    }
  };

  const confirmMutationRecovery = async (mutation) => {
    try {
      await mutation({
        variables: {
          reverseDeleteSabotierId: idSelect,
        },
      });
      setModalOnRecovery(false);
    } catch (error) {
      setModalOnRecovery(false);
    }
  };
  const handleSuperAdmSearch = (value) => {
    setValueView("3");
    setFilter(value);
    if (value.trim() === "") {
      setDriverView(sabotiers);
      return 0;
    }
    setDriverFilter(
      sabotiers.filter((poi) => {
        if (
          `${poi.name.toUpperCase()} ${poi.lastName.toUpperCase()}`.indexOf(
            value.toUpperCase()
          ) > -1
        )
          return poi;
      })
    );
    setDriverView(driverFilter.length < 1 ? sabotiers : driverFilter);
  };

  const handleSearch = (value) => {
    setFilter(value);
    if (value.trim() === "") {
      setDriverView(sabotiers);
      return 0;
    }
    setDriverFilter(
      sabotiers
        .filter((poi) => poi.delete === false)
        .filter((poi) => {
          if (
            `${poi.name.toUpperCase()} ${poi.lastName.toUpperCase()}`.indexOf(
              value.toUpperCase()
            ) > -1
          )
            return poi;
        })
    );
    setDriverView(
      driverFilter.length < 1
        ? sabotiers.filter((poi) => poi.delete === false)
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
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Nom et Post - Nom</StyledTableCell>
                  <StyledTableCell>Sexe</StyledTableCell>
                  {valueView == "1" && (
                    <StyledTableCell>modifier</StyledTableCell>
                  )}
                  {valueView == "1" && <StyledTableCell>Sup</StyledTableCell>}
                  {valueView == "2" && (
                    <StyledTableCell>Restorer</StyledTableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {driverView.slice(0, limit).map((pointer, idx) => (
                  <TableRow
                    hover
                    className={valueView == "3" && pointer.delete && "disabled"}
                    key={pointer.id}
                  >
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {idx + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar
                          {...stringAvatar(
                            `${pointer.name} ${pointer.lastName}`
                          )}
                        />
                        <Typography color="textPrimary" variant="body1">
                          {pointer.name} {pointer.lastName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{pointer.sex}</TableCell>
                    {valueView == "1" && (
                      <TableCell>
                        <ButtonEdit
                          onClick={() => {
                            setIdSelect(pointer.id);
                            setModalUpdateOn(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {valueView == "1" && (
                      <TableCell>
                        <ButtonDelete
                          onClick={() => {
                            setIdSelect(pointer.id);
                            setModalOnDelete(true);
                          }}
                        />
                      </TableCell>
                    )}
                    {pointer.delete && valueView == "2" && (
                      <TableCell>
                        <ButtonRecovery
                          onClick={() => {
                            setModalOnRecovery(true);
                            setIdSelect(pointer.id);
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
        {modalOnDelete && (
          <PopUpMutation
            openModal={modalOnDelete}
            query={DELETE_SABOTIER}
            setDataGet={setData}
            setModalON={setModalOnDelete}
            confirmMutation={confirmMutation}
          />
        )}
        {modalOnRecovery && (
          <PopUpMutation
            openModal={modalOnRecovery}
            query={RECOVERY_SABOTIER}
            setDataGet={setData}
            setModalON={setModalOnRecovery}
            confirmMutation={confirmMutationRecovery}
          />
        )}
        {modalUpdateOn && (
          <PopUpModifyPointer
            openModal={modalUpdateOn}
            setModalON={setModalUpdateOn}
            updateDriver={sabotiers.find((poi) => poi.id === idSelect)}
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
