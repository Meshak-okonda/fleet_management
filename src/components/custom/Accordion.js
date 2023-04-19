import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionStatus({ title, body }) {
  return (
    <>
      <Box>
        <Accordion
          style={{
            border: "1px solid #e0e0e0",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="headline" style={{ textAlign: "center" }}>
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{body}</AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}
