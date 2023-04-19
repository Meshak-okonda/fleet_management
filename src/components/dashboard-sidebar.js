import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import { User as UserIcon } from "../icons/user";
import { useAppDispatch } from "../hooks";
import { connexionClear } from "../redux/slice/userSlice";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import {
  GiExitDoor,
  GiSteeringWheel,
  GiPoliceOfficerHead,
  GiPodiumSecond,
} from "react-icons/gi";
import { AiFillCar, AiFillControl, AiOutlineBorderOuter } from "react-icons/ai";
import { RiAdminFill, RiDashboardFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { SiBandsintown } from "react-icons/si";
import { ListAccordion } from "./list-accordion";
import { CgController } from "react-icons/cg";
import { SiAirplayaudio } from "react-icons/si";
import { FaCarCrash } from "react-icons/fa";
const items = [
  {
    href: "/dashbord",
    icon: <RiDashboardFill fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/vehicle",
    icon: <AiFillCar fontSize="small" />,
    title: "Véhicule",
  },
  {
    href: "/control",
    icon: <AiFillControl fontSize="small" />,
    title: "Contrôle",
  },
  {
    href: "/statistic",
    icon: <FcStatistics fontSize="small" />,
    title: "Statistique",
  },
  {
    href: "/driver",
    icon: <GiSteeringWheel fontSize="small" />,
    title: "Chauffeur",
  },
  // {
  //   href: "/towing",
  //   icon: <FaCarCrash fontSize="small" />,
  //   title: "Remorquage",
  //   list: [
  //     {
  //       href: "/towing/police",
  //       icon: <GiPoliceOfficerHead fontSize="small" />,
  //       title: "Police",
  //     },
  //     // {
  //     //   href: "/towing/private",
  //     //   icon: <AiFillCar fontSize="small" />,
  //     //   title: "Privé",
  //     // },
  //     {
  //       href: "/towing/list",
  //       icon: <FaListAlt fontSize="small" />,
  //       title: "liste",
  //     },
  //   ],
  // },
  {
    href: "/towing/list",
    icon: <AiOutlineBorderOuter fontSize="small" />,
    title: "Terrain",
    list: [
      {
        href: "/zone",
        icon: <SiAirplayaudio fontSize="small" />,
        title: "Aire de dispatch",
      },
      {
        href: "/pointer",
        icon: <GiPodiumSecond fontSize="small" />,
        title: "Pointeur",
      },
      {
        href: "/sabotier",
        icon: <SiBandsintown fontSize="small" />,
        title: "Sabotier",
      },
      {
        href: "/controller",
        icon: <CgController fontSize="small" />,
        title: "Controlleurs",
      },
    ],
  },
  {
    href: "/responsable",
    icon: <RiAdminFill fontSize="small" />,
    title: "Responsable",
  },
];

export const DashboardSidebar = (props) => {
  const dispatch = useAppDispatch();
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  const deconnexion = async () => {
    await localStorage.removeItem("user");
    await localStorage.removeItem("token");
    dispatch(connexionClear);
  };

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            p: 3,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          centered
        >
          <NextLink href="/dashbord" passHref>
            <a>
              <Logo height={60} width={120} />
            </a>
          </NextLink>
        </Box>
        <Divider
          sx={{
            borderColor: "#FFFFFF",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {/* {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))} */}
          {items.map((item) =>
            !item.list ? (
              <NavItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            ) : (
              ListAccordion(item)
            )
          )}
        </Box>
      </Box>
    </>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
