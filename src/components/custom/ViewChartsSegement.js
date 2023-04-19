import { useSelector } from 'react-redux';
import React from 'react';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ViewChartsSegement({ data, name, global }) {
	const { day } = useSelector((state) => state.mode);
	let damaged = data.map((item) => item.damaged || 0);
	let good = data.map((item) => item.good || 0);
	let missing = data.map((item) => item.missing || 0);

	const series = [
    {
      name: "Bon Etat",
      data: good,
    },
    {
      name: "Abimé",
      data: damaged,
    },
    {
      name: "Manque",
      data: missing,
    },
  ];

	const options = {
    chart: {
      type: "bar",
      height: global ? 400 : 200,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    title: {
      text: name ? name : "",
    },
    xaxis: {
      categories: data.map((item) => item.name.substr(0, 2)),
    },
    theme: {
      mode: day ? "light" : "dark",
    },
    colors: ["#003863", "#FB8C00", "#e53935"],
    yaxis: {
      title: {
        text: "Nombres",
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      labels: {
        colors: day ? "#000000" : "#FFFFFF",
      },
    },
    markers: {
      colors: day ? "#000000" : "#FFFFFF",
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
		<div>
			<div id='chart'>
				<Chart options={options}
series={series}
type='bar'
height={350} />
			</div>
		</div>
	);
}
