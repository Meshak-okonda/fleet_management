import Head from "next/head";
import { Box, Container } from "@mui/material";
import { PointerListResults } from "../../components/pointer/pointer-list-results";
import { PointerListToolbar } from "../../components/pointer/pointer-list-toolbar";
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
        <PointerListToolbar />
        <Box sx={{ mt: 3 }}>
          <PointerListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Driver.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Driver;
