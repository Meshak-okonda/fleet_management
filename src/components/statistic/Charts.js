import { useQuery } from '@apollo/client';
import { Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ChartsDay from '../custom/ChartsDay';
import ChartsRange from "../custom/ChartsRange";
import ChartsMonth from "../custom/ChartsMonth";
import ChartsYear from "../custom/ChartsYear";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {Logo} from "../logo";

export default function Charts({ query, idVehicle, year }) {
	const { data, error, loading } = useQuery(query, {
		fetchPolicy: 'cache-and-network',
	});
	const [typeStat, setTypeStat] = useState(null);
	useEffect(() => {
		if (data) {
			if (data.getVehicleVerificationElementsOfOneDay) {
				setTypeStat(1);
			}
			if (data.getVehicleVerificationElementsByMonth) {
				setTypeStat(2);
			}
			if (data.getVehicleVerificationElementsByYear) {
				setTypeStat(3);
			}
			if (data.getVehicleVerificationElementsByRange) {
				setTypeStat(4);
			}
		}
	}, [data]);
	if (loading)
		return (<Card>
				<CardContent>
				<Box
					sx={{
					height: 300,
					position: "relative",
					display: 'flex',
					justifyContent: 'center',
					}}
				>
					<Spinner
						animation="border"
						variant={"blue"}
						width="30%"
						height="30%"
					/>
				</Box>
				</CardContent>
			</Card>
		);
	if (error)
		return (
      <Card>
        <CardHeader
          title={error && error.message ? error.message : "Contrôle inexistant"}
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo
              alt="Logo CPS"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: "auto",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );
	if (
		(data.getVehicleVerificationElementsByRange &&
			data.getVehicleVerificationElementsByRange.length < 1) ||
		(data.getVehicleVerificationElementsByMonth &&
			data.getVehicleVerificationElementsByMonth.length < 1)
	)
		return (
      <Card>
        <CardHeader title="Desolé ! Contrôle inexistant !" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Logo
              alt="Logo CPS"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: "auto",
              }}
            />
          </Box>
        </CardContent>
      </Card>
    );
	return (
		<>
			{typeStat && typeStat === 1 && (
				<ChartsDay dataCharts={data.getVehicleVerificationElementsOfOneDay} />
			)}
			{typeStat &&
				typeStat === 2 &&
				data.getVehicleVerificationElementsByMonth &&
				data.getVehicleVerificationElementsByMonth.length > 0 && (
					<ChartsMonth
						dataCharts={data.getVehicleVerificationElementsByMonth}
					/>
				)}
			{typeStat &&
				typeStat === 3 &&
				data.getVehicleVerificationElementsByYear &&
				data.getVehicleVerificationElementsByYear.length > 0 && (
					<ChartsYear
						dataCharts={data.getVehicleVerificationElementsByYear}
						year={year}
						idVehicle={idVehicle}
					/>
				)}
			{typeStat &&
				typeStat === 4 &&
				data.getVehicleVerificationElementsByRange &&
				data.getVehicleVerificationElementsByRange.length > 0 && (
					<ChartsRange
						dataCharts={data.getVehicleVerificationElementsByRange}
					/>
				)}
		</>
	);
}
