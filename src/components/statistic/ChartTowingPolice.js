import { useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { GET_TOWING_POLICE_BY_ID } from "../../graphql/queries";
import ChartsDayTowing from "../custom/ChartsDayTowing";
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { Logo } from "../logo";

export default function Charts({ id }) {
  const { data, error, loading } = useQuery(GET_TOWING_POLICE_BY_ID, {
    variables: {
      getPoliceTowingId: id,
    },
  });
  if (loading)
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative",
              display: "flex",
              justifyContent: "center",
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
  if (error || !data)
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
  return (
    <>
      <ChartsDayTowing dataCharts={data.getPoliceTowing} />
    </>
  );
}
