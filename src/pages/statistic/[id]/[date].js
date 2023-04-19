import { useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Button,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { useAppDispatch } from "../../../hooks";
import {
  GET_ONE_DAY_CONTROL_VEHICLE,
} from "../../../graphql/queries";
import { connexionUser, connexionClear } from "../../../redux/slice/userSlice";
import Charts from "../../../components/statistic/Charts";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import { getDate } from "../../../utils";

const Statistic = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id, date } = router.query;
  const dateReplace = date ? date.replace(/-/g, "/") : "";


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.date === getDate()) {
      dispatch(connexionUser(user));
    } else {
      localStorage.removeItem("user");
      dispatch(connexionClear());
      router.push("/404");
    }
  }, [router, dispatch]);

  return (
    <>
      <Head>
        <title>Statistic day page link | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <NextLink href="/statistic" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Revenir au Statistique des véhicules
            </Button>
          </NextLink>
          <Grid container spacing={3}>
            <Grid item md={12} xl={12} xs={12}>
              <Charts
                query={GET_ONE_DAY_CONTROL_VEHICLE(id, dateReplace)}
                idVehicle={id}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Statistic.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Statistic;
// 61efb86f7485ebe2e3f3a6ba