import * as yup from 'yup';

export const schema = yup.object().shape({
	comment: yup
		.string()
		.required('Le commentaire est requis')
		.trim()
		.min(3, 'Le commentaire doit contenir plus de 3 caractères'),
	image: yup.array(),
});
