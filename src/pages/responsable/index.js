import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ResponsableListResults } from "../../components/responsable/responsable-list-results";
import { ResponsableListToolbar } from "../../components/responsable/responsable-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";

const Responsable = () => (
  <>
    <Head>
      <title> CPS | Fleet Management Soft</title>
    </Head>
    <Box
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <ResponsableListToolbar />
        <Box sx={{ mt: 3 }}>
          <ResponsableListResults  />
        </Box>
      </Container>
    </Box>
  </>
);
Responsable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Responsable;
