import { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import NextLink from "next/link";
import {
  AppBar,
  Avatar,
  ListItemIcon,
  Box,
  IconButton,
  Toolbar,
  Typography,
  ListItemButton,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector, useAppDispatch } from "../hooks";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiExitDoor } from "react-icons/gi";
import { stringAvatar } from "src/utils/getStringAvatar";
import { connexionClear } from "src/redux/slice/userSlice";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.navBackground.default,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deconnexion = async () => {
    await localStorage.removeItem("user");
    dispatch(connexionClear(""));
  };

  const list = [
    { name: "Profile", icon: <CgProfile />, href: "/account" },
    {
      name: "Deconnection",
      icon: <GiExitDoor />,
      href: "/",
      onClick: deconnexion,
    },
  ];

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 3,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography color="white" sx={{ mr: 2 }} variant="h6"></Typography>

          <a>
            {user.name && (
              <div>
                <Avatar
                  sx={{
                    height: 50,
                    border: "solid 1.5px white",
                    width: 50,
                    ml: 1,
                    bgcolor: "#003863",
                  }}
                  {...stringAvatar(user.name, user.lastName)}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={anchorEl}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {list.map(({ name, icon, href, onClick }) => (
                    <MenuItem
                      onClick={onClick && onClick}
                      key={name}
                      sx={{
                        minWidth: 300,
                        px: 3,
                      }}
                    >
                      <NextLink href={href} passHref>
                        <ListItemButton>
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText primary={name} />
                        </ListItemButton>
                      </NextLink>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}
          </a>
          <IconButton onClick={handleClick}>
            {!anchorEl ? (
              <IoMdArrowDropdownCircle fontSize="20px" color="white" />
            ) : (
              <IoMdArrowDropupCircle fontSize="20px" color="white" />
            )}
          </IconButton>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
