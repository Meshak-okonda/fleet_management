import React from "react";
import pdf from "../assets/pdf.png";
import { Button } from "@mui/material";
import { Upload as UploadIcon } from "../icons/upload";
import {FaFilePdf} from 'react-icons/fa';

export default function ButtonSaveToPdf({ title, nameFile, data, formData, legend, lines }) {
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.text(nameFile, doc.internal.pageSize.getWidth() / 2, 10, {
          align: "center",
        });
        doc.autoTable(formData, data);
        const date = new Date();
        const dateFormat = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        if (legend) {
          doc.setFontSize(8);
          doc.text(
            legend,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 1,
            {
              align: "center",
            }
          );
        }
        doc.save(`${nameFile.replace(/\s/g, "")}-${dateFormat}.pdf`);
      });
    });
  };
  return (
    <Button
      onClick={exportPdf}
      startIcon={<FaFilePdf color="red" fontSize="small" />}
      sx={{ mr: 1 }}
    >
      Export PDF
    </Button>
  );
}
