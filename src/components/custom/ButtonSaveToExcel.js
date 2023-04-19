import React from 'react';

export default function ButtonSaveToExcel({ nameFile, data }) {
	const exportExcel = () => {
		import('xlsx').then((xlsx) => {
			const worksheet = xlsx.utils.json_to_sheet(data);
			const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
			const excelBuffer = xlsx.write(workbook, {
				bookType: 'xlsx',
				type: 'array',
			});
			const date = new Date();
			const dateFormat = `${date.getDate()}/${
				date.getMonth() + 1
			}/${date.getFullYear()}`;
			saveAsExcelFile(excelBuffer, `${nameFile}Au${dateFormat}`);
		});
	};
	const saveAsExcelFile = (buffer, fileName) => {
		import('file-saver').then((FileSaver) => {
			let EXCEL_TYPE =
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
			let EXCEL_EXTENSION = '.xlsx';
			const data = new Blob([buffer], {
				type: EXCEL_TYPE,
			});
			FileSaver.saveAs(
				data,
				fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
			);
		});
	};
	return (
		<button onClick={exportExcel}
className='buttonYellow m-1'>
			Export Excel
		</button>
	);
}
