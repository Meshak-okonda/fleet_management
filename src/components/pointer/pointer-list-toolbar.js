import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import PopUpAddPointer from "./PopUpAddPointer";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import ButtonAdd from "../ButtonAdd";

export const PointerListToolbar = (props) => {
  const { pointers } = useAppSelector((state) => state.globalState);
  const [modalAddOn, setModalAddOn] = useState(false);
  const [dataExport, setDataExport] = useState([]);

  const exportColumns = [
    { title: "Numero", dataKey: "id" },
    { title: "Nom", dataKey: "name" },
    { title: "Post Nom", dataKey: "lastName" },
    { title: "Age", dataKey: "age" },
    { title: "Sexe", dataKey: "sex" },
  ];
  useEffect(() => {
    if (pointers.length && pointers.length > 0) {
      setDataExport(
        pointers
          .filter((dri) => dri.delete != true)
          .map(({ id, name, lastName, age, sex }, idx) => {
            return {
              id: idx + 1,
              name,
              lastName,
              age,
              sex,
            };
          })
      );
    }
  }, [pointers]);
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
          Liste des Pointeurs
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            nameFile="Liste Des Pointeurs"
            formData={exportColumns}
            data={dataExport}
          />
          <ButtonExcel data={dataExport} nameFile="Liste Des Pointeurs" />

          <ButtonAdd
            onClick={() => setModalAddOn(true)}
            sx={{ mr: 1 }}
            name="Créer un Pointeur"
          />
        </Box>
      </Box>
      {modalAddOn && (
        <PopUpAddPointer openModal={modalAddOn} setModalON={setModalAddOn} />
      )}
    </Box>
  );
};
