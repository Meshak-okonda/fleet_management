import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAppSelector } from "../../hooks";

export const DriverTotal = (props) => {
  const { drivers, vehicles } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);

  return (
    <Card {...props}>
      <CardContent>
        <Grid container
spacing={3}
sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary"
gutterBottom
variant="overline">
              Chauffeurs
            </Typography>
            <Typography color="textPrimary"
variant="h5">
              {drivers.filter((dri) => dri.delete != true).length} Chauffeurs
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        {user.superAdm && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          >
            <ArrowDownwardIcon color="error" />
            <Typography
              color="error"
              sx={{
                mr: 1,
              }}
              variant="body2"
            >
              {drivers.filter((dri) => dri.delete == true).length}
            </Typography>
            <Typography color="textSecondary"
variant="caption">
              Chauffeur(s) supprimer
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};