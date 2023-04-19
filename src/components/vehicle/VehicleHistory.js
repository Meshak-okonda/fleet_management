import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import ButtonYellow from '../../../../components/ButtonYellow';
import { GetVehicles } from '../../../../hooks';
import { setRefresh } from '../../../../redux/slice/refreshSlice';
import ButtonSaveToPdf from '../../../../components/ButtonSaveToPdf';
import ButtonSaveToExcel from '../../../../components/ButtonSaveToExcel';
export default function VehicleHistory() {
	const { vehicles, drivers, typesVehicles, vehiclesHistory } = useSelector(
		(state) => state.globalState
	);
	const dispatch = useDispatch();
	const [listHistory, setListHistory] = useState(null);
	const [idSelected, setIdSelected] = useState(null);
	const [dataExport, setDataExport] = useState([]);
	const exportColumns = [
		{ title: 'Nom & post Nom du chauffeur', dataKey: 'name' },
		{ title: "Date d'attribution", dataKey: 'date' },
	];
	const viewDriver = ({ idDriver }) => {
		const driver = drivers.find(({ id }) => id === idDriver);
		return driver
			? `${driver.name} ${driver.lastName}`
			: 'Aucune donnée sur le chauffeur';
	};
	function formatDateString(date) {
		const dateFormat = date.split('T')[0].split('-').reverse().join('/');
		const hour = date.split('T')[1].split('.')[0];
		return `${dateFormat} à ${hour}`;
	}
	const viewDateFormat = ({ createdAt }) => {
		return formatDateString(createdAt);
	};
	return (
    <div>
      <div className="d-flex justify-content-between align-content-center">
        <h2 className="title m-3">Historique des Vehicules</h2>
        <div>
          <Dropdown
            value={idSelected}
            options={GetVehicles()}
            autoFocus
            onChange={({ value }) => {
              setIdSelected(value);
              let historyVehicle = [];
              let dataToExport = [];
              vehiclesHistory.forEach((history) => {
                if (history.idVehicle === value) {
                  const driver = drivers.find(
                    ({ id }) => id === history.idDriver
                  );
                  dataToExport.push({
                    name: driver
                      ? `${driver.name} ${driver.lastName}`
                      : "Aucune donnée sur le chauffeur",
                    date: formatDateString(history.createdAt),
                  });
                  historyVehicle.push(history);
                }
              });
              setDataExport(dataToExport);
              setListHistory(historyVehicle);
            }}
            placeholder="Selection du Véhicule"
            style={{ marginRight: 10 }}
          />
          <ButtonYellow
            title="Rafrechir la liste"
            onClick={() => dispatch(setRefresh(true))}
          />
        </div>
      </div>
      {idSelected && (
        <div className="card">
          <DataTable
            value={listHistory}
            responsiveLayout="scroll"
            className="mb-1"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="De {first} à {last} sur {totalRecords}"
            rows={10}
          >
            <Column
              field="idDriver"
              body={viewDriver}
              header="Chauffeur attribué"
              sortable
            ></Column>
            <Column
              field="createdAt"
              header="Date d'attribution"
              body={viewDateFormat}
              sortable
            ></Column>
          </DataTable>
          <div className="align-self-end mr-1">
            <ButtonSaveToPdf
              nameFile={`Historique de `}
              data={dataExport}
              formData={exportColumns}
            />
            <ButtonSaveToExcel data={dataExport} />
          </div>
        </div>
      )}
    </div>
  );
}
