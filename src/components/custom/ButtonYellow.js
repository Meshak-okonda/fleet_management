import React from 'react';
// import './style/buttonYellow.scss';

export default function ButtonYellow(props) {
	return (
		<button {...props}
className='buttonYellow'>
			{props.title}
		</button>
	);
}
