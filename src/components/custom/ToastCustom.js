import { useState } from 'react';
import { ToastContainer, Toast, Spinner } from 'react-bootstrap';

export default function ToastCustom({
	stateToast,
	header,
	body,
	type,
	delay = 5000,
	awaitView,
}) {
	const [show, setShow] = useState(stateToast);
	const [time, setTime] = useState(0);
	setInterval(() => {
		setTime(time + 1);
	}, 60000);
	return (
		<ToastContainer position='top-end'
className='p-3 mr-3'>
			<Toast
				onClose={() => setShow(false)}
				className='m-1'
				show={show}
				delay={delay}
				bg={type}>
				<Toast.Header>
					<strong className='me-auto'>{header}</strong>
					<small>il y a {time} min(s)</small>
				</Toast.Header>
				<Toast.Body className='text-white'>
					{!awaitView ? body : <Spinner animation='border'
variant='light' />}
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
}
