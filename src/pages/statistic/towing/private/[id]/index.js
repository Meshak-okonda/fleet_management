import { useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Button } from "@mui/material";
import { DashboardLayout } from "../../../../../components/dashboard-layout";
import {
  connexionUser,
  connexionClear,
} from "../../../../../redux/slice/userSlice";
import Charts from "../../../../../components/statistic/ChartTowingPrivate";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import { getDate } from "../../../../../utils";
import { useAppDispatch } from "../../../../../hooks";

const Statistic = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = router.query;

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
        <title>
          Statistic private towing page link | Fleet Management Soft
        </title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <NextLink href="/dashbord" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Revenir en arrière
            </Button>
          </NextLink>
          <Grid container spacing={3}>
            <Grid item md={12} xl={12} xs={12}>
              <Charts id={id} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Statistic.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Statistic;
