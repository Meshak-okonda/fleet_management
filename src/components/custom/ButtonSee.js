import { Button } from 'primereact/button';
import ButtonYellow from './ButtonYellow';

export default function ButtonTrash(props) {
	return (
		<Button className='p-button-primary'
{...props}>
			<i className='bi bi-eye'></i>
		</Button>
	);
}
