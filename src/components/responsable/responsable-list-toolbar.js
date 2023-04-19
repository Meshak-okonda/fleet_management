import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ButtonPdf from "../ButtonPdf";
import ButtonExcel from "../ButtonExcel";
import PopUpAddResponsable from './PopUpAddResponsable';
import ButtonAdd from "../ButtonAdd";

export const ResponsableListToolbar = () => {
  const { responsables } = useAppSelector((state) => state.globalState);
  const { user } = useAppSelector((state) => state.userConnected);
  const [modalAddOn, setModalAddOn] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const exportColumns = [
    { title: "Nom", dataKey: "name" },
    { title: "Post Nom", dataKey: "lastName" },
    { title: "E - Mail", dataKey: "email" },
    { title: "Age", dataKey: "age" },
    { title: "Sexe", dataKey: "sex" },
    { title: "Numero Téléphone", dataKey: "phone" },
  ];
  useEffect(() => {
    if (responsables.length && responsables.length > 0) {
      setDataExport(
        responsables
          .filter((res) => res.delete !== true)
          .map(({ name, lastName, email, age, sex, phone }) => {
            return { name, lastName, email, age, sex, phone };
          })
      );
    }
  }, [responsables]);

  return (
    <Box>
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
          Liste des Responsables
        </Typography>
        <Box sx={{ m: 1 }}>
          <ButtonPdf
            formData={exportColumns}
            data={responsables}
            nameFile="List Des Responsables"
          />
          <ButtonExcel data={dataExport} nameFile="ListDesResponsables" />
          {(user.superAdm || user.addResponsable) && (
            <ButtonAdd
              onClick={() => setModalAddOn(true)}
              sx={{ mr: 1 }}
              name="Créer un Responsable"
            />
          )}
        </Box>
      </Box>
      {modalAddOn && (
        <PopUpAddResponsable
          openModal={modalAddOn}
          setModalON={setModalAddOn}
        />
      )}
    </Box>
  );
};
