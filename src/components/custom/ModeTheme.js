import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/slice/modeSlice';

export default function SpeedDialog() {
	const { day } = useSelector((state) => state.mode);
	const dispatch = useDispatch();

	return (
		<div className='card'>
			<div
				className='speeddial-delay-demo'
				style={{ position: 'fixed', right: '30px', bottom: '30px' }}>
				<Button
					className='p-button-secondary p-button-outlined d-flex justify-content-center align-content-center w-100 button-rounded-custom'
					onClick={() => dispatch(setMode(!day))}
					style={{
						background: day ? 'black' : 'white',
					}}>
					{day ? (
						<i
							className='bi bi-moon-stars-fill'
							style={{ fontSize: '15px', color: 'white' }}></i>
					) : (
						<i
							className='bi bi-brightness-high-fill'
							style={{ fontSize: '15px', color: 'black' }}></i>
					)}
				</Button>
			</div>
		</div>
	);
}
