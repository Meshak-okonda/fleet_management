import Head from "next/head";
import { Box, Container } from "@mui/material";
import { SabotierListResults } from "../../components/sabotier/sabotier-list-results";
import { SabotierListToolbar } from "../../components/sabotier/sabotier-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";

const Driver = () => (
  <>
    <Head>
      <title>CPS | Fleet Management Soft</title>
    </Head>
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <SabotierListToolbar />
        <Box sx={{ mt: 3 }}>
          <SabotierListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Driver.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Driver;
