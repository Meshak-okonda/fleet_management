import * as yup from 'yup';

export const schema = yup.object().shape({
	name: yup.string().required('Le nom du chauffeur est requis'),
	lastName: yup.string().required('Le post nom du  chauffeur est requis'),
	licenseValidity: yup
		.string()
		.required('La validité de la license est requis'),
	phone: yup.string(),
	email: yup.string(),
	password: yup.string(),
	image: yup.array().of(yup.string()),
	age: yup.string().required("L'age du chauffeur est requis"),
	sex: yup.string(),
});
