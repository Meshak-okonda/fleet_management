import { useQuery } from "@apollo/client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Modal, Spinner, Row } from "react-bootstrap";
import { REFRESH_ALL_DATA } from "../../graphql/queries";
import {
  setDrivers,
  setResponsables,
  setVehicles,
  setVehiclesHistory,
  setPointers,
  setSabotiers,
  setControllers,
  setPlages,
} from "../../redux/slice/globalSlice";
import { setRefresh } from "../../redux/slice/refreshSlice";
import ToastCustom from "../ToastCustom";

function Refresh_Redux_State({
  getDrivers,
  getResponsables,
  getVehicles,
  getVehicleHistories,
  getPointers,
  getSabotiers,
  getControllers,
  getPlages,
}) {
  const dispatch = useAppDispatch();
  dispatch(setVehicles(getVehicles));
  dispatch(setPointers(getPointers));
  dispatch(setResponsables(getResponsables));
  dispatch(setDrivers(getDrivers));
  dispatch(setVehiclesHistory(getVehicleHistories));
  dispatch(setSabotiers(getSabotiers));
  dispatch(setControllers(getControllers));
  dispatch(setPlages(getPlages));
  // dispatch(setPoliceTowings(getPoliceTowings));
  setTimeout(() => {
    dispatch(setRefresh(false));
  }, 2000);
}

export default function PopUpRefreshData() {
  const { data, error, loading } = useQuery(REFRESH_ALL_DATA, {
    fetchPolicy: "cache-and-network",
    pollInterval: 3000,
  });
  const { refresh } = useAppSelector((state) => state.refreshData);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setRefresh(false));
  if (loading) {
    return (
      <>
        <Modal
          show={refresh}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Row className="justify-content-center">
            <Spinner
              as="span"
              animation="grow"
              size="xxl"
              role="status"
              aria-hidden="true"
            />
          </Row>
        </Modal>
      </>
    );
  }
  if (error) {
    let title,
      msg,
      btContent = "";
    if (error.message == "Failed to fetch") {
      title = "Erreur";
      msg = "Verifiez le server, veuillez reessayer plutard ! ";
      btContent = "Reessayer";
    } else {
      title = "Erreur";
      msg = error.message;
      btContent = "Reessayer";
    }
    return (
      <>
        <ToastCustom
          stateToast={true}
          body={msg}
          header={title}
          type="error"
          delay={20000}
        />
      </>
    );
  }
  Refresh_Redux_State(data);
  return (
    <>
      <ToastCustom
        stateToast={true}
        body="Données mis à jour"
        header="Félicitation"
        type="success"
        delay={20000}
      />
    </>
  );
}
