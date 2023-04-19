import { useQuery } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Spinner } from 'react-bootstrap';
import { REFRESH_ALL_DATA } from '../graphql/queries';
import {
	setDrivers,
	setResponsables,
	setTypesVehicles,
	setVehicles,
	setVehiclesHistory,
} from '../redux/slice/globalSlice';
import { setRefresh } from '../redux/slice/refreshSlice';
import ToastCustom from './ToastCustom';

function Refresh_Redux_State({
	getDrivers,
	getResponsables,
	getVehicles,
	getTypeVehicles,
	getVehicleHistories,
}) {
	const dispatch = useDispatch();
	dispatch(setVehicles(getVehicles));
	dispatch(setResponsables(getResponsables));
	dispatch(setTypesVehicles(getTypeVehicles));
	dispatch(setDrivers(getDrivers));
	dispatch(setVehiclesHistory(getVehicleHistories));
	setTimeout(() => {
		dispatch(setRefresh(false));
	}, 2000);
}

export default function PopUpRefreshData() {
	const { data, error, loading } = useQuery(REFRESH_ALL_DATA, {
		fetchPolicy: 'network-only',
		pollInterval: 500,
	});
	const { refresh } = useSelector((state) => state.refreshData);
	const dispatch = useDispatch();
	const handleClose = () => dispatch(setRefresh(false));
	if (loading) {
		return (
			<>
				<Modal
					show={refresh}
					onHide={handleClose}
					backdrop='static'
					keyboard={false}>
					<Modal.Header>
						<Modal.Title>Patienter SVP ...</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Spinner animation='border'
variant='warning' />
					</Modal.Body>
				</Modal>
			</>
		);
	}
	if (error) {
		let title,
			msg,
			btContent = '';
		if (error.message == 'Failed to fetch') {
			title = 'Erreur';
			msg = 'Verifiez le server, veuillez reessayer plutard ! ';
			btContent = 'Reessayer';
		} else {
			title = 'Erreur';
			msg = error.message;
			btContent = 'Reessayer';
		}
		return (
      <>
        <ToastCustom
          stateToast={true}
          body={msg}
          header={title}
          type="error"
          delay={20000}
        />
      </>
    );
	}
	Refresh_Redux_State(data);
	return (
		<>
			<ToastCustom
				stateToast={true}
				body='Données mis à jour'
				header='Félicitation'
				type='success'
				delay={20000}
			/>
		</>
	);
}
