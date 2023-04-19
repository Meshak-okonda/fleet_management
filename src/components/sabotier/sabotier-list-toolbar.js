import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import PopUpAddPointer from "./PopUpAddPointer";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import ButtonAdd from "../ButtonAdd";

export const SabotierListToolbar = (props) => {
  const { sabotiers } = useAppSelector((state) => state.globalState);
  const [modalAddOn, setModalAddOn] = useState(false);
  const [dataExport, setDataExport] = useState([]);

  const exportColumns = [
    { title: "Numero", dataKey: "id" },
    { title: "Nom", dataKey: "name" },
    { title: "Post Nom", dataKey: "lastName" },
    { title: "Sexe", dataKey: "sex" },
  ];
  useEffect(() => {
    if (sabotiers && sabotiers.length && sabotiers.length > 0) {
      setDataExport(
        sabotiers
          .filter((dri) => dri.delete != true)
          .map(({ name, lastName, sex }, idx) => {
            return {
              id: idx + 1,
              name,
              lastName,
              sex,
            };
          })
      );
    }
  }, [sabotiers]);
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
          Liste des sabotiers
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            nameFile="Liste Des sabotiers"
            formData={exportColumns}
            data={dataExport}
          />
          <ButtonExcel data={dataExport} nameFile="Liste Des sabotiers" />

          <ButtonAdd
            onClick={() => setModalAddOn(true)}
            sx={{ mr: 1 }}
            name="Créer un Sabotier"
          />
        </Box>
      </Box>
      {modalAddOn && (
        <PopUpAddPointer openModal={modalAddOn} setModalON={setModalAddOn} />
      )}
    </Box>
  );
};
