import { Button } from "@mui/material";
import {FaUserEdit} from 'react-icons/fa';

export default function ButtonEdit(props) {
	return (
		<Button {...props}>
			<FaUserEdit color='#003863'
width="30"
heigth="25" />
		</Button>
	);
}
