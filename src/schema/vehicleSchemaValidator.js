import * as yup from 'yup';

export const schema = yup.object().shape({
	idDriver: yup.string().optional(),
	idTypeVehicle: yup.string(),
	name: yup.string().required('Le nom du véhicule est requis'),
	gpsData: yup.string().optional(),
	serie: yup.string().required('La série du véhicule est requis'),
	image: yup.array().optional(),
	color: yup.string().required('La couleur du véhicule est requis'),
	model: yup.string().required('Le model est obligatoire'),
	startYear: yup
		.string()
		.required("L'année de mise en circulation est requise"),
	registrationNumber: yup
		.string()
		.required('Le numero de plaque est obligatoire'),
	power: yup.string().optional(),
});
