import { Button } from "@mui/material";
import {FaUserTimes} from 'react-icons/fa';

export default function ButtonDelete(props) {
	return (
		<Button  {...props}>
			<FaUserTimes color='red'
width="30"
heigth="25" />
		</Button>
	);
}
