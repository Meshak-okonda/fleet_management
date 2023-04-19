import { LoadingButton } from "@mui/lab";
import { GiConfirmed } from "react-icons/gi";

export default function ButtonSubmit(props) {
  return (
    <LoadingButton
      color="primary"
      variant="contained"
      startIcon={<GiConfirmed color="white" fontSize="small" />}
      {...props}
    >
      Confirmer
    </LoadingButton>
  );
}
