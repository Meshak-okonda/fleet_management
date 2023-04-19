import * as yup from 'yup';

export const schema = yup.object().shape({
	name: yup
		.string()
		.required('Le nom du chauffeur est requis')
		.min(3, 'Le nom du chauffeur doit avoir au moins 3 caractères')
		.max(50, 'Le nom du chauffeur doit avoir au plus 50 caractères'),
	lastName: yup
		.string()
		.required('Le post nom du  chauffeur est requis')
		.min(3, 'Le post nom du  chauffeur doit avoir au moins 3 caractères')
		.max(50, 'Le post nom du  chauffeur doit avoir au plus 50 caractères'),
	email: yup.string().email("L'email est invalide"),
	password: yup
		.string()
		.required('Le mot de passe est requis')
		.min(8, 'Le mot de passe doit avoir au moins 8 caractères')
		.max(50, 'Le mot de passe doit avoir au plus 50 caractères'),
	phone: yup.string(),
	image: yup.string(),
	age: yup
		.number()
		.required("L'age du chauffeur est requis")
		.min(20, "L'age doit etre supérieur à 20 ans")
		.max(60, "L'age doit etre inférieur à 60 ans"),
	sex: yup.string().required('le sexe est requis'),
});
