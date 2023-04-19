import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import ButtonAdd from "../ButtonAdd";
import PopUpAddPlage from "./PopUpAdd";

export const PlageListToolbar = (props) => {
  const { plages } = useAppSelector((state) => state.globalState);
  const [modalAddOn, setModalAddOn] = useState(false);
  const [dataExport, setDataExport] = useState([]);

  const exportColumns = [
    { title: "Numero", dataKey: "id" },
    { title: "Nom", dataKey: "name" },
    { title: "Zone", dataKey: "zone" },
  ];

  function compareDataKey(a, b) {
    const genreA = a.zone;
    const genreB = b.zone;
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  useEffect(() => {
    if (plages && plages.length && plages.length > 0) {
      setDataExport(
        plages
          .filter((dri) => dri.delete != true)
          .sort(compareDataKey)
          .map(({ id, name, zone }, idx) => {
            return {
              id: idx + 1,
              name,
              zone,
            };
          })
      );
    }
  }, [plages]);
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Liste des plages
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            nameFile="Liste des plages"
            formData={exportColumns}
            data={dataExport}
          />
          <ButtonExcel data={dataExport} nameFile="Liste des plages" />

          <ButtonAdd
            onClick={() => setModalAddOn(true)}
            sx={{ mr: 1 }}
            name="Créer une plage"
          />
        </Box>
      </Box>
      {modalAddOn && (
        <PopUpAddPlage openModal={modalAddOn} setModalON={setModalAddOn} />
      )}
    </Box>
  );
};
