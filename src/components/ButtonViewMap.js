import { Button } from "@mui/material";
import { FaMapMarked } from "react-icons/fa";

export default function ButtonViewMap(props) {
  return (
    <Button {...props}>
      <FaMapMarked size={20} />
    </Button>
  );
}
