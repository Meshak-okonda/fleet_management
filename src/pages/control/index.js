import {useState} from "react";
import Head from "next/head";
import FormAddControl from "../../components/control/FormAddControl";
import  ModifyControl from "../../components/control/ModifyControl";
import ModifyFormControl from "../../components/control/ModifyFormControl";
import { useAppSelector } from "../../hooks";
import { DashboardLayout } from "../../components/dashboard-layout";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Calendar } from "primereact/calendar";
import { GET_ONE_DAY_CONTROL_VEHICLE } from "../../graphql/queries";

const Control = () => {
  const { user } = useAppSelector((state) => state.userConnected);
  const { vehicles } = useAppSelector((state) => state.globalState);
  const refactorVehicles = [];
	vehicles.filter((veh)=> veh.delete !== true).forEach(({name, id})=>{
    refactorVehicles.push({
			label: `${name}`,
			value: `${id}`,
		});
  });
  const [addControl, setAddControl] = useState(true);
  const [modifyControl, setModifyControl] = useState(false);
  const [day, setDay] = useState(null);
  const [idVehicle, setIdVehicle] = useState(null);

  const onChangeType = (e) => {
    switch (e.target.name) {
      case "add":
        setAddControl(true);
        setModifyControl(false);
        break;
      case "modi":
        setAddControl(false);
        setModifyControl(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Contrôle | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid
              container
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
              spacing={2}
            >
              <Grid
                sx={{
                  height: 230,
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                item
                lg={3.5}
                sm={3.5}
                xl={3}
                xs={12}
              >
                <Card sx={{ width: "100%" }}>
                  <CardContent>
                    <Box
                      sx={{
                        pt: -2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography color="textSecondary" variant="h6">
                        Type de Statistique
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        pt: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography color="textSecondary" variant="caption">
                        <FormControlLabel
                          control={
                            <Switch
                              onChange={onChangeType}
                              name="add"
                              checked={addControl}
                            />
                          }
                          label="Ajouter un Contrôle"
                        />
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        pt: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography color="textSecondary" variant="caption">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={modifyControl}
                              name="modi"
                              onChange={onChangeType}
                            />
                          }
                          label="Modifier un Contrôle"
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                sx={{
                  height: 230,
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                xl={3.5}
                lg={3.5}
                sm={6}
                xs={12}
              >
                <Card sx={{ width: "100%" }}>
                  <CardContent>
                    <Box
                      sx={{
                        pt: 0,
                        alignItems: "center",
                      }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        Journée
                      </InputLabel>
                      <Calendar
                        value={day}
                        onChange={({ value }) => {
                          const date = new Date(value);
                          date.setDate(date.getDate() + 1);
                          const dateNow = date
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/");
                          setDay(dateNow);
                        }}
                        style={{ width: "100%" }}
                        dateFormat="dd/mm/yy"
                        yearRange="2010:2030"
                        placeholder="Date "
                      />
                    </Box>

                    {day && (
                      <>
                        <Box
                          sx={{
                            pt: 1,
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Selection du Véhicule
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={idVehicle}
                            label="Véhicule"
                            style={{ width: "100%" }}
                            fullWidth
                            onChange={({ target: { value } }) => {
                              setIdVehicle(value);
                            }}
                          >
                            {refactorVehicles.map(({ value, label }) => (
                              <MenuItem value={value} key={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              {addControl && idVehicle && day && (
                <FormAddControl
                  setDay={setDay}
                  idVehicle={idVehicle}
                  dateControl={day}
                />
              )}
              {modifyControl && idVehicle && day && (
                <ModifyFormControl
                  query={GET_ONE_DAY_CONTROL_VEHICLE(idVehicle, day)}
                  idVehicle={idVehicle}
                  dateControl={day}
                  setIdVehicle={setIdVehicle}
                  setDate={setDay}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );}

Control.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Control;
