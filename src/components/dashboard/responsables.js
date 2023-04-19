import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAppSelector } from "../../hooks";
import { RiAdminFill } from "react-icons/ri";

export const ResponsableTotal = (props) => {
  const { vehicles, responsables } = useAppSelector(
    (state) => state.globalState
  );
  const { user } = useAppSelector((state) => state.userConnected);
  return (
    <Card sx={{ height: "100%" }}
{...props}>
      <CardContent>
        <Grid container
spacing={3}
sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary"
gutterBottom
variant="overline">
              Responsables
            </Typography>
            <Typography color="textPrimary"
variant="h5">
              {responsables.filter((res) => res.delete != true).length}{" "}
              Responsables
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
              <RiAdminFill />
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
              {responsables.filter((res) => res.delete == true).length}
            </Typography>
            <Typography color="textSecondary"
variant="caption">
              Responsables supprimer
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
