import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, ListItem, Button, Box } from "@mui/material";
import { NavItem } from "./nav-item";
import { useRouter } from "next/router";

export function ListAccordion(e) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const active = router.pathname.indexOf("towing") > -1 ? true : false;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 0,
        pl: 1,
      }}
      key={e.title}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          backgroundColor: active ? "rgba(255,255,255, 0.08)" : "#003863",
          borderRadius: 1,
          color: active ? "secondary.main" : "neutral.300",
          fontWeight: active && "fontWeightBold",
          justifyContent: "flex-start",
          // px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: active ? "secondary.main" : "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
            color: "secondary.main",
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
          <Button
            component="a"
            sx={{
              color: active ? "secondary.main" : "neutral.300",
              fontWeight: active && "fontWeightBold",
              justifyContent: "flex-start",
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: active ? "secondary.main" : "neutral.400",
              },
              "&:hover": {
                color: "secondary.main",
              },
            }}
            startIcon={e.icon}
            disableRipple
          >
            <Box sx={{ flexGrow: 0 }}>{e.title}</Box>
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          {e.list.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
}
