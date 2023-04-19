import { Button } from 'primereact/button';

export default function ButtonEdit(props) {
	return (
		<Button className='p-button-info'
{...props}>
			<i className='bi bi-pencil-square'></i>
		</Button>
	);
}
