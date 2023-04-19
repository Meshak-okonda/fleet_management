import { Button } from "@mui/material";
import {AiFillDelete} from 'react-icons/ai';

export default function ButtonTrash(props) {
	return (
		<Button color="error"
variant="contained"
{...props}>
			<AiFillDelete width="30"
heigth="25" />
		</Button>
	);
}
