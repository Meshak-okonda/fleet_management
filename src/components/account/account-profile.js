import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../hooks";
import logo from "../../assets/logo.png";

export const AccountProfile = (props) => {
  const { user } = useAppSelector((state) => state.userConnected);

  return (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.image || logo.src}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {user.name} {user.lastName}
        </Typography>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h7"
        >
          {user.email}
        </Typography>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h7"
        >
          {user.sex}
        </Typography>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h7"
        >
          {user.age} ans
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
);
}