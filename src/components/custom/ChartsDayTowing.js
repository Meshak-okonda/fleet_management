import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { DELETE_CONTROL } from "../../graphql/queries";
import {
  GetFrenchElementTowing,
  getColorByStatus,
  GetFreechStatus,
  getStatusValidate,
} from "../../utils";
import ButtonPdf from "../ButtonPdf";
import PDFTOWING from "./PdfTowing";
import ButtonExcel from "../ButtonExcel";
import PopOver from "./PopOverTowing";
import ViewChart from "./ViewChartTowing";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import ToastCustom from "./ToastCustom";
import AccordionStatus from "./Accordion";
import ImageModal from "./ImageModal";
import ViewMap from "../ViewMaps";

export default function ChartsDay({ dataCharts }) {
  const { vehicles, drivers } = useAppSelector((state) => state.globalState);
  const [modal, setModal] = useState(false);
  let dataToExport = [];
  const [toast, setToast] = useState({
    state: false,
    message: "",
    type: "",
    header: "",
    delay: null,
  });
  const exportColumns = [
    { title: "Nom de l'élément", dataKey: "name" },
    { title: "Valeur de l'élement", dataKey: "state" },
    { title: "Image", dataKey: "image" },
  ];

  const confirmMutation = (mutation) => {
    try {
      mutation();
      setToast({
        state: true,
        message: "Votre action avec succès",
        type: "success",
        header: "Felicitation",
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
        name: name,
        state: data,
      });
    });
    dataRecup.forEach(({ name, state, image }) => {
      if (state === "GOOD") return;
      dataExport.push({
        name: name,
        state: GetFreechStatus(state),
        image: image,
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
      name: "Total Rayures",
      state: dataRecupState.grooves,
    });
    dataExport.push({
      name: "Total Hors services",
      state: dataRecupState.outService,
    });
    dataToExport = dataExport;
  };

  const getFrench = (name) => {
    if (GetFrenchElementTowing(name)) return GetFrenchElementTowing(name);
    return name;
  };

  let dataRecup = [];
  let images = {};
  let driver = drivers.find((driver) => driver.id === dataCharts.idDriver);
  let personnalData = [];
  let vehicleData = [];

  if (drivers.length > 0) {
    for (const property in dataCharts) {
      if (dataCharts[property].state) {
        dataRecup.push({
          name: getFrench(property),
          state: dataCharts[property].state,
          comment: dataCharts[property].comment,
          image: dataCharts[property].image,
          color: getColorByStatus(dataCharts[property].state),
        });
      } else if (dataCharts[property].infractionImage) {
        images = dataCharts[property];
      } else if (
        [
          "phone",
          "adress",
          "name",
          "lastName",
          "identityPerson",
          "pinkCard",
          "yellowCard",
        ].includes(property)
      ) {
        personnalData.push({
          name:
            getFrench(property) == "identityPerson"
              ? dataCharts[property].type
              : getFrench(property),
          data:
            getFrench(property) == "identityPerson"
              ? dataCharts[property].number
              : dataCharts[property],
        });
      } else if (
        ["model", "brand", "numberPlaque", "typeCar", "color"].includes(
          property
        )
      ) {
        vehicleData.push({
          name: getFrench(property),
          data: dataCharts[property],
        });
      }
    }
    formatExportDataForOneDayStat(
      personnalData,
      dataRecup,
      dataCharts.stateVehicle
    );
  }

  // let dataRecup = [];
  // let dataRecupState = {};
  // let idControl;
  // for (const property in dataCharts) {
  //   if (dataCharts[property] && dataCharts[property].state) {
  //     dataRecup.push({
  //       name: property,
  //       good: dataCharts[property].state === "Bon" ? 1 : null,
  //       missing: dataCharts[property].state === "Manque" ? 1 : null,
  //       damaged: dataCharts[property].state === "Abimé" ? 1 : null,
  //       comment: dataCharts[property].comment
  //         ? dataCharts[property].comment
  //         : null,
  //       image: dataCharts[property].image ? dataCharts[property].image : null,
  //     });
  //   } else if (property === "stateVehicle") {
  //     dataRecupState.good = dataCharts[property].good;
  //     dataRecupState.missing = dataCharts[property].missing;
  //     dataRecupState.damaged = dataCharts[property].damaged;
  //   } else if (property === "idVehicle") {
  //     let vehicle = vehicles.find(
  //       (vehicle) => vehicle.id === dataCharts[property]
  //     );
  //     let driver = drivers.find((driver) => driver.id === vehicle.idDriver);
  //     dataRecupSimple.push({
  //       name: "Véhicule",
  //       data: vehicle.name || "Aucune donnée",
  //     });
  //     dataRecupSimple.push({
  //       name: "Chauffeur Attribué",
  //       data:
  //         driver && driver.name
  //           ? `${driver.name || ""} ${driver.lastName || ""}`
  //           : "Aucune donnée",
  //     });
  //   } else if (property === "id") {
  //     idControl = dataCharts[property];
  //   } else {
  //     dataRecupSimple.push({
  //       name: property,
  //       data: dataCharts[property] || "",
  //     });
  //   }
  // }

  return (
    <>
      {
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={8} sm={12} xl={8} xs={12}>
                <ViewChart
                  good={dataCharts.stateVehicle.good}
                  grooves={dataCharts.stateVehicle.grooves}
                  damaged={dataCharts.stateVehicle.damaged}
                  outService={dataCharts.stateVehicle.outService}
                  name="Statistique général"
                  descript={true}
                />
              </Grid>
              <Grid item center lg={4} sm={12} xl={4} xs={12}>
                {images.infractionImage && (
                  <AccordionStatus
                    title="Image remorquage"
                    body={
                      <Grid container>
                        {images.infractionImage.map((e) => (
                          <ImageModal key={e} img={e} />
                        ))}
                      </Grid>
                    }
                  />
                )}
                <br />
                {images.imageLeft &&
                  images.imageRight &&
                  images.imageFront &&
                  images.imageBack && (
                    <AccordionStatus
                      title="Image par position"
                      body={
                        <Grid
                          container
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Grid item>
                            <Typography variant="headline">Gauche</Typography>
                            <ImageModal img={images.imageLeft} />
                          </Grid>
                          <Grid item>
                            <Typography variant="headline">Droite</Typography>
                            <ImageModal img={images.imageRight} />
                          </Grid>
                          <Grid item>
                            <Typography variant="headline">Devant</Typography>
                            <ImageModal img={images.imageFront} />
                          </Grid>
                          <Grid item>
                            <Typography variant="headline">Derrière</Typography>
                            <ImageModal img={images.imageBack} />
                          </Grid>
                        </Grid>
                      }
                    />
                  )}
                <br />
                <AccordionStatus
                  title="Informations sur propriètaire du vehicule"
                  body={
                    <Grid container>
                      {personnalData.map((e) => (
                        <>
                          <Grid container>
                            <Typography variant="body2">{`${e.name} : ${
                              e.data.charAt(0).toUpperCase() + e.data.slice(1)
                            }`}</Typography>
                            <Divider />
                          </Grid>
                          <br />
                        </>
                      ))}
                    </Grid>
                  }
                />
                <br />
                <AccordionStatus
                  title="Informations sur le vehicule"
                  body={
                    <Grid container>
                      {vehicleData.map((e) => (
                        <>
                          <Grid container>
                            <Typography variant="body2">{`${e.name} : ${
                              e.data.charAt(0).toUpperCase() + e.data.slice(1)
                            }`}</Typography>
                            <Divider />
                          </Grid>
                          <br />
                        </>
                      ))}
                    </Grid>
                  }
                />
                <br />
                <Button
                  fullWidth
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={() => setModal(true)}
                >
                  Voir la position
                </Button>
                <br />

                <Button
                  fullWidth
                  size="large"
                  // color="primary"
                  // variant="contained"
                >
                  {getStatusValidate(dataCharts.status)}
                </Button>
                <div className="p-col-12 mt-3 mb-3 text-left">
                  <h3>Chauffeur</h3>
                  <p className="h6 p-warning bold">{`${
                    driver.name.charAt(0).toUpperCase() + driver.name.slice(1)
                  } ${
                    driver.lastName.charAt(0).toUpperCase() +
                    driver.lastName.slice(1)
                  }`}</p>
                </div>

                <div className="align-self-end mr-1">
                  {/* // Place button delete here  */}
                  <PDFTOWING
                    title="Exporter PDF"
                    formData={exportColumns}
                    data={dataToExport}
                    nameFile="Intervention Remorquage"
                    subTitleOne={`Date : ${dataCharts.date}`}
                    subTitleTwo={`\nCoordonnées GPS: Lat(${dataCharts.position.lat}), Long(${dataCharts.position.long}) `}
                    imagesPosition={{
                      [process.env.LIEN_BACK_IMAGE + images.imageLeft]:
                        process.env.LIEN_BACK_IMAGE + images.imageLeft,
                      [process.env.LIEN_BACK_IMAGE + images.imageRight]:
                        process.env.LIEN_BACK_IMAGE + images.imageRight,
                      [process.env.LIEN_BACK_IMAGE + images.imageFront]:
                        process.env.LIEN_BACK_IMAGE + images.imageFront,
                      [process.env.LIEN_BACK_IMAGE + images.imageBack]:
                        process.env.LIEN_BACK_IMAGE + images.imageBack,
                    }}
                    positionGeo={{ ...dataCharts.position }}
                  />
                  {/* <ButtonExcel
                    title="Exporter PDF"
                    data={dataToExport}
                    nameFile="Remorquage du véhicule"
                  /> */}
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
                  ({ name, state, comment, image, color }, key) => {
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
                          buttonPlaceHolder={name}
                          title={GetFreechStatus(state)}
                          body={comment}
                          image={image ? image : ""}
                          color={color}
                        />
                      </Grid>
                    );
                  }
                )}
            </Grid>
          </CardContent>
        </Card>
      }
      {modal && (
        <ViewMap
          openModal={modal}
          setModalON={setModal}
          position={dataCharts.position}
        />
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
