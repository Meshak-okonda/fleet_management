import { Button } from "@mui/material";
import {FaUserAlt} from 'react-icons/fa';

export default function ButtonView(props) {
	return (
		<Button {...props}>
			<FaUserAlt width="30"
heigth="25" />
		</Button>
	);
}
