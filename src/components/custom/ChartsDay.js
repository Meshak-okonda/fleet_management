import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { DELETE_CONTROL } from '../../graphql/queries';
import { GetFrenchElementControl } from '../../utils';
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
// import ButtonTrash from './ButtonTrash';
import PopUpMutation from './PopUpMutation';
import PopOver from './PopOver';
import ViewChart from './ViewChart';
import { Toast } from 'primereact/toast';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import ToastCustom from "./ToastCustom";

export default function ChartsDay({ dataCharts }) {
	const { vehicles, drivers } = useAppSelector((state) => state.globalState);
	const [modalDelete, setModalDelete] = useState(false);
	let dataToExport = [];
	const [toast, setToast] = useState({
		state: false,
		message: "",
		type: "",
		header: "",
		delay: null,
  	});
	const exportColumns = [
		{ title: "Nom de l'élément", dataKey: 'name' },
		{ title: "Valeur de l'élement", dataKey: 'state' },
		{ title: 'Commentaire', dataKey: 'comment' },
	];

	const confirmMutation = (mutation) => {
		try {
			mutation();
			setToast({
				state: true,
				message: 'Votre action avec succès',
				type: 'success',
				header: 'Felicitation',
				delay: 3000,
			});
		} catch (error) {
			setToast({
				state: true,
				message: JSON.stringify(error.message),
				type: "error",
				header: "Erreur",
				delay: 3000,
			});
		}
	};
	const formatExportDataForOneDayStat = (
    dataRecupSimple,
    dataRecup,
    dataRecupState
  ) => {
    let dataExport = [];
    dataRecupSimple.forEach(({ name, data }) => {
      dataExport.push({
        name: GetFrenchElementControl(name)
          ? GetFrenchElementControl(name)
          : name,
        state: data,
      });
    });
    dataRecup.forEach(({ name, good, missing, comment }) => {
      dataExport.push({
        name: GetFrenchElementControl(name),
        state: good ? "Bon" : missing ? "Manque" : "Abimé",
        comment: comment ? comment : "",
      });
    });
    dataExport.push({
      name: "Total Bon Etat",
      state: dataRecupState.good,
    });
    dataExport.push({
      name: "Total Abimé",
      state: dataRecupState.damaged,
    });
    dataExport.push({
      name: "Total Manque",
      state: dataRecupState.missing,
    });
    dataToExport = dataExport;
  };

  let dataRecup = [];
  let dataRecupSimple = [];
  let dataRecupState = {};
  let idControl;
  for (const property in dataCharts) {
    if (dataCharts[property] && dataCharts[property].state) {
      dataRecup.push({
        name: property,
        good:
          dataCharts[property].state === "Bon" ||
          dataCharts[property].state === "Bonne"
            ? 1
            : null,
        missing: dataCharts[property].state === "Manque" ? 1 : null,
        damaged: dataCharts[property].state === "Abimé" ? 1 : null,
        comment: dataCharts[property].comment
          ? dataCharts[property].comment
          : null,
        image: dataCharts[property].image ? dataCharts[property].image : null,
      });
    } else if (property === "stateVehicle") {
      dataRecupState.good = dataCharts[property].good;
      dataRecupState.missing = dataCharts[property].missing;
      dataRecupState.damaged = dataCharts[property].damaged;
    } else if (property === "idVehicle") {
      let vehicle = vehicles.find(
        (vehicle) => vehicle.id === dataCharts[property]
      );
      let driver = drivers.find((driver) => driver.id === vehicle.idDriver);
      dataRecupSimple.push({
        name: "Véhicule",
        data: vehicle.name || "Aucune donnée",
      });
      dataRecupSimple.push({
        name: "Chauffeur Attribué",
        data:
          driver && driver.name
            ? `${driver.name || ""} ${driver.lastName || ""}`
            : "Aucune donnée",
      });
    } else if (property === "id") {
      idControl = dataCharts[property];
    } else {
      dataRecupSimple.push({
        name: property,
        data: dataCharts[property] || "",
      });
    }
  }
  formatExportDataForOneDayStat(dataRecupSimple, dataRecup, dataRecupState);

  return (
    <>
      {dataRecup && (
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={8} sm={12} xl={8} xs={12}>
                <ViewChart
                  good={dataRecupState.good}
                  missing={dataRecupState.missing}
                  damaged={dataRecupState.damaged}
                  name="Statistique général"
                  descript={true}
                />
              </Grid>
              <Grid item center lg={4} sm={12} xl={4} xs={12}>
                {dataRecupSimple &&
                  dataRecupSimple?.map(({ name, data }) => {
                    return (
                      <div className="p-col-12 mt-3 mb-3 text-left" key={name}>
                        <h3>
                          {GetFrenchElementControl(name)
                            ? GetFrenchElementControl(name)
                            : name}
                        </h3>
                        <p className="h6 p-warning bold">{data}</p>
                      </div>
                    );
                  })}
                <div className="align-self-end mr-1">
                  {/* // Place button delete here */}
                  <ButtonPdf
                    title="Exporter PDF"
                    formData={exportColumns}
                    data={dataToExport}
                    nameFile="Statistique du véhicule"
                  />
                  <ButtonExcel
                    title="Exporter PDF"
                    data={dataToExport}
                    nameFile="Statistique du véhicule"
                  />
                </div>
              </Grid>
            </Grid>
            <br />
            <hr />
            <br />
            <Grid
              container
              sx={{
                justifyContent: "space-between",
              }}
              spacing={3}
            >
              {dataRecup &&
                dataRecup?.map(
                  (
                    { name, good, missing, damaged, value, comment, image },
                    key
                  ) => {
                    return (
                      <Grid
                        item
                        key={key}
                        sx={{
                          justifyContent: "space-between",
                        }}
                        lg="auto"
                        sm={6}
                        xl={1}
                        xs={6}
                      >
                        <PopOver
                          buttonPlaceHolder={`${GetFrenchElementControl(name)}`}
                          title={good ? "Bon" : missing ? "Manque" : "Abimé"}
                          body={comment}
                          image={image ? image : ""}
                        />
                      </Grid>
                    );
                  }
                )}
            </Grid>
          </CardContent>
        </Card>
      )}
      {toast.state && (
        <ToastCustom
          stateToast={toast.state}
          body={toast.message}
          header={toast.header}
          delay={toast.delay}
          type={toast.type}
          awaitView={toast.awaitView}
        />
      )}
    </>
  );
}

// Button delete control

// {
//   idControl && (
//     <div className="p-col-12 d-flex justify-content-center">
//       <ButtonTrash onClick={() => setModalDelete(true)} />
//     </div>
//   );
// }

// Modal for delete control vehicle

//   {modalDelete && (
//     <PopUpMutation
//       query={DELETE_CONTROL(idControl)}
//       setModalON={setModalDelete}
//       openModal={modalDelete}
//       confirmMutation={confirmMutation}
//     />
//   )}