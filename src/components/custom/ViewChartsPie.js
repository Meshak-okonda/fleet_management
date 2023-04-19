import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";


export default function ViewChartsSegement({ data, name, global }) {
  const { day } = useSelector((state) => state.mode);
  let damaged = 0;
  let good = 0;
  let missing = 0;
  data?.forEach((item) => {
    damaged += item.damaged;
    good += item.good;
    missing += item.missing;
  });
  const theme = useTheme();
  const dataChart = {
    datasets: [
      {
        data: [good, damaged, missing],
        backgroundColor: ["#003863", "#FB8C00", "#e53935"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Bon Etat", "Mauvais Etat", "Manque"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card>
      <CardHeader title={name} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={dataChart}
options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        ></Box>
      </CardContent>
    </Card>
  );
}
