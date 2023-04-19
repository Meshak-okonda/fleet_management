import React from 'react';

export default function ButtonSaveToPdf({ title, nameFile, data, formData }) {
	const exportPdf = () => {
		import('jspdf').then((jsPDF) => {
			import('jspdf-autotable').then(() => {
				const doc = new jsPDF.default(0, 0);
				doc.text(nameFile, 50, 10);
				doc.autoTable(formData, data);
				const date = new Date();
				const dateFormat = `${date.getDate()}/${
					date.getMonth() + 1
				}/${date.getFullYear()}`;
				doc.save(`${nameFile.replace(/\s/g, '')}Au${dateFormat}.pdf`);
			});
		});
	};
	return (
		<button onClick={exportPdf}
className='buttonYellow m-1'>
			Export PDF
		</button>
	);
}
