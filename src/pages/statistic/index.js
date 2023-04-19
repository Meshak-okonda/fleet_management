import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Calendar } from "primereact/calendar";
import { useAppSelector } from "../../hooks";
import {
  GET_ONE_DAY_CONTROL_VEHICLE,
  GET_RANGE_STATISTIC_CONTROL,
  GET_MONTH_STATISTIC_CONTROL,
  GET_YEAR_STATISTIC_CONTROL,
} from "../../graphql/queries";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { GetYearBeginSystem } from '../../utils';
import Charts from "../../components/statistic/Charts";

const Statistic = () => {
  const { user } = useAppSelector((state) => state.userConnected);
  const { vehicles } = useAppSelector((state) => state.globalState);
  const refactorVehicles = [];
  vehicles.filter((veh)=> veh.delete !== true).forEach(({name, id})=>{
    refactorVehicles.push({
			label: `${name}`,
			value: `${id}`,
		});
  });
  const [dayType, setDayType] = useState(true);
  const [monthType, setMonthType] = useState(false);
  const [yearType, setYearType] = useState(false);
  const [rangeType, setRangeType] = useState(false);

  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [range, setRange] = useState(null);
  const [idVehicle, setIdVehicle] = useState(null);
  const [query, setQuery] = useState(null);

  const getQuery =()=>{
    if(dayType)
			return GET_ONE_DAY_CONTROL_VEHICLE(idVehicle, day);
		if(monthType)
			return GET_MONTH_STATISTIC_CONTROL(idVehicle, month);
		if(yearType)
      return GET_YEAR_STATISTIC_CONTROL(idVehicle, year);
    let selectionDay = [];
    range &&
      range.length &&
      range.forEach((element) => {
        if (element.length !== 10) {
          const date = new Date(element);
          date.setDate(date.getDate() + 1);
          const dateNow = date
            .toISOString()
            .split('T')[0]
            .split('-')
            .reverse()
            .join('/');
          selectionDay.push(dateNow);
        }
      });
return GET_RANGE_STATISTIC_CONTROL(idVehicle, selectionDay.join(','));
  }

  const onChangeType = (e) => {
    switch (e.target.name) {
      case "day":
        setDayType(true);
        setMonthType(false);
        setYearType(false);
        setRangeType(false);
        break;
      case "month":
        setDayType(false);
        setMonthType(true);
        setYearType(false);
        setRangeType(false);
        break;
      case "year":
        setDayType(false);
        setMonthType(false);
        setYearType(true);
        setRangeType(false);
        break;
      case "range":
        setDayType(false);
        setMonthType(false);
        setYearType(false);
        setRangeType(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Statistic | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xl={3.5}
                lg={3.5}
                sm={6}
                xs={12}
                sx={{
                  m: 1,
                }}
              >
                <Card sx={{ height: "100%" }}>
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
                              name="day"
                              checked={dayType}
                            />
                          }
                          label="Statistique journalière"
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
                              checked={monthType}
                              name="month"
                              onChange={onChangeType}
                            />
                          }
                          label="Statistique mensuelle"
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
                              checked={yearType}
                              onChange={onChangeType}
                              name="year"
                            />
                          }
                          label="Statistique annuelle"
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
                              onChange={onChangeType}
                              name="range"
                              checked={rangeType}
                            />
                          }
                          label="Statistique par rangé"
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xl={3.5}
                lg={3.5}
                sm={6}
                xs={12}
                sx={{
                  m: 1,
                }}
              >
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    {dayType && (
                      <>
                        <Box
                          sx={{
                            pt: 1,
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
                      </>
                    )}
                    {monthType && (
                      <>
                        <Box
                          sx={{
                            pt: 1,
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Mois
                          </InputLabel>
                          <Calendar
                            value={month}
                            onChange={({ value }) => {
                              const date = new Date(value);
                              date.setDate(date.getDate() + 1);
                              const dateNow = date
                                .toISOString()
                                .split("T")[0]
                                .split("-")
                                .reverse();
                              const month = dateNow[1] + "/" + dateNow[2];
                              setMonth(month);
                            }}
                            style={{ width: "100%" }}
                            view="month"
                            dateFormat="mm/yy"
                            yearNavigator
                            yearRange="2010:2030"
                            placeholder="Selection du Mois"
                          />
                        </Box>
                      </>
                    )}
                    {yearType && (
                      <>
                        <Box
                          sx={{
                            pt: 1,
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Année
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={`${year}`}
                            label="Age *"
                            fullWidth
                            style={{ width: "100%" }}
                            onChange={({ target: { value } }) => {
                              setYear(`${value}`);
                            }}
                          >
                            {GetYearBeginSystem().map(({ value, label }) => (
                              <MenuItem value={value} key={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </>
                    )}
                    {rangeType && (
                      <>
                        <Box
                          sx={{
                            pt: 1,
                            alignItems: "center",
                          }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Rangé
                          </InputLabel>
                          <Calendar
                            selectionMode="multiple"
                            value={range}
                            style={{ width: "100%" }}
                            onChange={({ value }) => {
                              setRange(value);
                            }}
                            placeholder="Selection de la Rangé"
                          />
                        </Box>
                      </>
                    )}
                    {(range || year || day || month) && (
                      <>
                        <Box
                          sx={{
                            pt: 3,
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
              {idVehicle && (
                <Charts query={getQuery()} idVehicle={idVehicle} year={year} />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
Statistic.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Statistic;
