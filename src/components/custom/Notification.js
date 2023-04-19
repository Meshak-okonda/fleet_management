import { useSubscription } from '@apollo/client';
import { VERIFICATION_VEHICLE_ADD } from '../graphql/queries';
import { useSelector } from 'react-redux';
import ToastCustom from './ToastCustom';

export default function Notification() {
	const { data, loading, error } = useSubscription(VERIFICATION_VEHICLE_ADD);
	const { drivers, vehicles } = useSelector((state) => state.globalState);
	if (loading) {
		return null;
	}
	if (error) {
		return (
      <ToastCustom
        header="Erreur"
        body={`${JSON.stringify(error.networkError.message)}`}
        type="error"
        stateToast={true}
        delay={10000}
      />
    );
	}

	const {
		VerificationVehicleAdded: { idVehicle },
	} = data;

	if (data) {
		const vehicle = vehicles.find(({ id }) => id === idVehicle);
		const driver = drivers.find(({ id }) => id === vehicle.idDriver);
		return (
      <ToastCustom
        header="Notification"
        body={`Une nouvelle verification été ajouté avec succès\n
					   ${driver ? `Nom du Chauffeur : ${driver.name}` : "Non attribuer"} et
					   ${vehicle ? `Nom du Véhicule : ${vehicle.name}` : ""}`}
        type="info"
        stateToast={true}
      />
    );
	}

	return <></>;
}
