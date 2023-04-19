import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useSelector } from 'react-redux';

export default function ViewChart({ good, missing, damaged, name }) {
	const { day } = useSelector((state) => state.mode);
	const chartData = {
    labels: ["Bon Etat", "Abimé", "Manque"],
    datasets: [
      {
        data: [good || 0, damaged || 0, missing || 0],
        backgroundColor: ["#019101", "#ffbd00", "#ff0000"],
        hoverBackgroundColor: ["#019101", "#ffbd00", "#ff0000"],
      },
    ],
  };

  const series = [good || 0, damaged || 0, missing || 0];

  const options = {
    chart: {
      type: "pie",
      height: 400,
      stacked: true,
    },
    dataLabels: {
      enabled: false,
    },
    labels: ["Bon Etat", "Abimé", "Manque"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    title: {
      text: name ? name : "",
    },
    theme: {
      mode: day ? "light" : "dark",
    },
    colors: ["#003863", "#FB8C00", "#e53935"],
    legend: {
      labels: {
        colors: day ? "#000000" : "#FFFFFF",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

	return (
		<>
			<Chart options={options}
series={series}
type='pie'
height={400} />
		</>
	);
}
