import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppSelector } from "../../hooks";
import { AiFillCar } from "react-icons/ai";

export const VehicleTotal = (props) => {
  const { vehicles } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Véhicules
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {vehicles.filter((veh) => veh.delete != true).length} Vehicules
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <AiFillCar />
            </Avatar>
          </Grid>
        </Grid>
        {user.superAdm && (
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
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
              {vehicles.filter((veh) => veh.delete == true).length}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Vehicules supprimer
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
