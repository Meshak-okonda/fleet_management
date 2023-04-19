import { Button } from "@mui/material";
import { GoFileSymlinkDirectory } from "react-icons/go";

export default function ButtonEdit(props) {
	return (
    <Button {...props}>
      <GoFileSymlinkDirectory color="#003863"
width="30"
heigth="25" />
    </Button>
  );
}
