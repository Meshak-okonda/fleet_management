import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { FaFilePdf } from "react-icons/fa";
import logo from "./logo64.json";

export default function PDFTOWING({
  title,
  nameFile,
  data,
  formData,
  legend,
  lines,
  imagesPosition,
  subTitleOne,
  subTitleTwo,
  positionGeo,
}) {
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(null);
  const [isWait, setIsWait] = useState(true);

  useEffect(async () => {
    let dataImage = {};
    for (let img in imagesPosition) {
      let data = await getBase64FromUrl(imagesPosition[img]);
      dataImage[img] = data;
    }
    await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${positionGeo.lat}&longitude=${positionGeo.long}&localityLanguage=fr`
    )
      .then((e) => e.json())
      .then((e) => {
        let com = e.localityInfo.administrative[2].name || "Inconnu";
        let ave = e.localityInfo.administrative[3].name || "Inconnu";
        let vil = e.localityInfo.administrative[1].name || "Inconnu";
        let country = e.localityInfo.administrative[0].name || "Inconnu";
        setPosition(
          `Av. ${ave}, Commune de ${com}, Ville de ${vil}, \nen ${country}`
        );
      })
      .catch((e) => {
        setPosition(`Lieu de remorquage : Impossible de la recuperer`);
      });

    setImage(dataImage);
    setIsWait(false);
  }, []);

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.addFont("Monserrat");
        let width = doc.internal.pageSize.width;
        let height = doc.internal.pageSize.height;
        let beginPage = 35;
        doc.setTextColor(255, 255, 255);
        doc.text(20, 60, "This is blue.");
        doc.setFont("Monserrat");
        doc.setFontSize(16);
        doc.setDrawColor(0, 56, 99);
        doc.setFillColor(0, 56, 99);
        doc.rect(0, 0, 210, 21, "F");

        let extLogo = logo.logoBase64
          .slice(0, 15)
          .split("/")[1]
          .split(";")[0]
          .toUpperCase();
        doc.addImage(logo.logoBase64, extLogo, 7, 3, 25, 15, "image");
        doc.text("Congo Parking Service", 34, 12, {
          align: "left",
        });
        doc.setFontSize(11);
        doc.text("Page 1", width - 20, 11, {
          align: "left",
        });
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(18);
        doc.setFont("Monserrat");
        doc.text(
          "RAPPORT INTERVENTION REMORQUAGE",
          doc.internal.pageSize.getWidth() / 2,
          beginPage,
          {
            align: "center",
          }
        );
        doc.line(
          doc.internal.pageSize.getWidth() / 2 - 63,
          36.5,
          doc.internal.pageSize.getWidth() / 2 + 63,
          36.5
        );
        doc.setDrawColor(0, 56, 99);
        doc.setFillColor(0, 56, 99);
        doc.setTextColor(255, 255, 255);
        doc.rect(12, beginPage + 5, 85, 21, "F");
        doc.setFont("normal");
        doc.setFontSize(10);
        doc.text(subTitleOne, 15, beginPage + 10, {
          align: "left",
        });
        doc.text(subTitleTwo, 15, beginPage + 10, {
          align: "left",
        });
        doc.text(position, 15, beginPage + 18.5, {
          align: "left",
        });
        doc.setFontSize(15);
        doc.setTextColor(0, 0, 0);
        doc.text(
          "ETAT DU VEHICULE AVANT REMORQUAGE",
          doc.internal.pageSize.getWidth() / 2,
          beginPage + 38,
          {
            align: "center",
          }
        );
        doc.line(
          doc.internal.pageSize.getWidth() / 2 - 55,
          beginPage + 39.5,
          doc.internal.pageSize.getWidth() / 2 + 55,
          beginPage + 39.5
        );
        doc.setFontSize(10);
        let actualWidth = 0;
        let actualHeight = beginPage + 30;
        let betHeight = height / 4;
        let betWidth = width / 2;
        let widthImg = betWidth / 1.4;
        let heightImg = widthImg;
        for (let img in image) {
          let ext = image[img]
            .slice(0, 15)
            .split("/")[1]
            .split(";")[0]
            .toUpperCase();
          if (actualWidth + 30 > width) {
            actualWidth = 0;
            actualHeight += betHeight + widthImg / 3;
          }
          doc.addImage(
            image[img],
            ext,
            actualWidth + 15,
            actualHeight + 20,
            widthImg,
            heightImg,
            img
          );
          doc.textWithLink(
            " Voir l'image",
            actualWidth + widthImg / 1.8,
            actualHeight + 17,
            {
              url: img,
              color: "blue",
            }
          );

          if (actualWidth + 30 <= width) {
            actualWidth += betWidth;
          } else {
            actualWidth += betWidth;
          }
        }

        const date = new Date();
        const dateFormat = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        doc.addPage();
        doc.setFontSize(16);
        doc.setDrawColor(0, 56, 99);
        doc.setFillColor(0, 56, 99);
        doc.rect(0, 0, 210, 21, "F");
        doc.setTextColor(255, 255, 255);
        doc.addImage(logo.logoBase64, extLogo, 7, 3, 25, 15, "logoImage");
        doc.text("Congo Parking Service", 34, 12, {
          align: "left",
        });
        doc.setFontSize(11);
        doc.text("Page 2", width - 20, 11, {
          align: "left",
        });
        doc.line(
          doc.internal.pageSize.getWidth() / 2 - 74,
          36.5,
          doc.internal.pageSize.getWidth() / 2 + 74,
          36.5
        );
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(18);
        doc.setFont("bold");
        doc.text(
          "ETAT DU VEHICULE A L'ENTRE A LA FOURRIERE",
          doc.internal.pageSize.getWidth() / 2,
          beginPage,
          {
            align: "center",
          }
        );
        doc.setFont("normal");
        doc.autoTable(formData, data, {
          margin: { top: beginPage + 10, left: 20, right: 20, bottom: 20 },
          styles: {
            // Defaul style
            lineWidth: 0.001,
            lineColor: [0, 0, 0],
            fillStyle: "F",
            halign: "left",
            valign: "middle",
            columnWidth: "auto",
            overflow: "linebreak",
          },
          createdCell: function (cell, data) {
            cell.cell.styles.font = "Monserrat";
            if (cell.row.raw.name.indexOf("Nom de l'élément") > -1) {
              cell.cell.styles.fillColor = [0, 56, 99];
            }
          },
        });
        doc.save(`${nameFile.replace(/\s/g, "")}-${dateFormat}.pdf`);
        // doc.output("dataurlnewwindow", {
        //   filename: `${nameFile.replace(/\s/g, "")}-${dateFormat}.pdf`,
        // });
      }
      );
    });
  };
  return (
    <>
      {!isWait && (
        <Button
          onClick={exportPdf}
          startIcon={<FaFilePdf color="red" fontSize="small" />}
          sx={{ mr: 1 }}
        >
          Export PDF
        </Button>
      )}
    </>
  );
}

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
