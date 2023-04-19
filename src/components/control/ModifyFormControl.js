import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { GetFrenchElementControl } from "../../utils";
import PopUpAddElementsForControl from './PopUpAddElementsForControl';
import PopOver from '../custom/PopOver';
import PopUpVerifControlMutation from './PopUpVerifControlMutation';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
} from "@mui/material";
import ButtonSubmit from "../ButtonSubmit";
import { Logo } from "../logo";

export default function ViewModify({ query, dateControl, idVehicle, setIdVehicle, setDate }) {
  const { loading, error, data } = useQuery(query, {
    fetchPolicy: "network-only",
  });
  const { day } = useSelector((state) => state.mode);
  const [modalOn, setModalOn] = useState(false);
  const [stepControl, setStepControl] = useState(1);
  const [modalAdd, setModalAdd] = useState(false);
  const [vehicleControl, setVehicleControl] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = (data) => {
    let tableData = [];
    for (const property in data) {
      tableData.push({ [property]: data[property], name: property });
    }
    setVehicleControl(tableData);
    setModalAdd(true);
  };
  const test = [
    { label: "Bonne", value: "Bon" },
    { label: "Abimé", value: "Abimé" },
    { label: "Manque", value: "Manque" },
  ];

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

  if (error)
    return (
      <Card>
        <CardHeader
          title={
            error && error.message ? error.message : "Contrôle inexistant  !"
          }
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
  const { getVehicleVerificationElementsOfOneDay } = data;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Goupe 1" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="honk"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <span>{GetFrenchElementControl(field.name)}</span>
                          <Dropdown
                            autoFocus={errors.honk}
                            id={field.name}
                            value={
                              field.value && field.value.state
                                ? field.value.state
                                : field.onChange(
                                    getVehicleVerificationElementsOfOneDay[
                                      field.name
                                    ]
                                  )
                            }
                            onChange={({ value }) => {
                              if (value === "Manque" || value === "Abimé") {
                                field.onChange({ state: value });
                                setStepControl(1);
                                setModalOn(true);
                              } else {
                                field.onChange({ state: value });
                              }
                            }}
                            options={test}
                            style={{ width: "100%" }}
                            placeholder={GetFrenchElementControl(field.name)}
                            className={errors.honk && "borderError"}
                          />
                          {modalOn && stepControl === 1 && (
                            <PopUpAddElementsForControl
                              openModal={modalOn}
                              setModalON={setModalOn}
                              name={modalOn}
                              dataGet={field.onChange}
                              data={field.value}
                              nameField={field.name}
                            />
                          )}
                          <div className="w-100 d-flex justify-content-center mt-2">
                            <PopOver
                              title={
                                field.value && field.value.state
                                  ? field.value.state
                                  : getVehicleVerificationElementsOfOneDay[
                                      field.name
                                    ].state
                              }
                              body={
                                field.value && field.value.comment
                                  ? field.value.comment
                                  : getVehicleVerificationElementsOfOneDay[
                                      field.name
                                    ].comment
                              }
                              image={
                                field.value && field.value.image
                                  ? field.value.image
                                  : getVehicleVerificationElementsOfOneDay[
                                      field.name
                                    ].image
                              }
                            />
                          </div>
                        </>
                      );
                    }}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="stopLight"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          autoFocus={errors[field.name]}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(2);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.stopLight && "borderError"}
                        />
                        {modalOn && stepControl === 2 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                            comment={
                              getVehicleVerificationElementsOfOneDay[field.name]
                                .comment
                            }
                            image={
                              getVehicleVerificationElementsOfOneDay[field.name]
                                .image
                            }
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>

              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="siegeState"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(3);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.siegeState && "borderError"}
                        />
                        {modalOn && stepControl === 3 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="ceilingState"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(4);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.ceilingState && "borderError"}
                        />
                        {modalOn && stepControl === 4 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="windshieldConditionAV"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(5);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={
                            errors.windshieldConditionAV && "borderError"
                          }
                        />
                        {modalOn && stepControl === 5 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="windshieldConditionAR"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(6);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={
                            errors.windshieldConditionAR && "borderError"
                          }
                        />
                        {modalOn && stepControl === 6 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="carStateIn"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(7);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.carStateIn && "borderError"}
                        />
                        {modalOn && stepControl === 7 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="carStateOut"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(8);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.carStateOut && "borderError"}
                        />
                        {modalOn && stepControl === 8 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="radioAndReader"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(9);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.radioAndReader && "borderError"}
                        />
                        {modalOn && stepControl === 9 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="gironfardOperation"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(10);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.gironfardOperation && "borderError"}
                        />
                        {modalOn && stepControl === 10 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="warningLightsOperation"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(28);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={
                            errors.warningLightsOperation && "borderError"
                          }
                        />
                        {modalOn && stepControl === 28 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="flashingOperationAV"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(11);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={
                            errors.flashingOperationAV && "borderError"
                          }
                        />
                        {modalOn && stepControl === 11 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="flashingOperationAR"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(12);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={
                            errors.flashingOperationAR && "borderError"
                          }
                        />
                        {modalOn && stepControl === 12 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="windshieldWipers"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(13);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.windshieldWipers && "borderError"}
                        />
                        {modalOn && stepControl === 13 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="reserveTire"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(14);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.reserveTire && "borderError"}
                        />
                        {modalOn && stepControl === 14 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="leftAndRightTireAV"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(15);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.leftAndRightTireAV && "borderError"}
                        />
                        {modalOn && stepControl === 15 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="leftAndRightTireAR"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(16);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.leftAndRightTireAR && "borderError"}
                        />
                        {modalOn && stepControl === 16 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="wheelWrench"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(17);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.wheelWrench && "borderError"}
                        />
                        {modalOn && stepControl === 17 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="cric"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(18);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.cric && "borderError"}
                        />
                        {modalOn && stepControl === 18 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="cricRemover"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(27);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.cricRemover && "borderError"}
                        />
                        {modalOn && stepControl === 27 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="stricken"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(19);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.stricken && "borderError"}
                        />
                        {modalOn && stepControl === 19 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className="border p-2 mt-3 mb-3">
          <CardHeader title="Goupe 2" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="motor"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(20);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.motor && "borderError"}
                        />
                        {modalOn && stepControl === 20 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="startUp"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(21);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.startUp && "borderError"}
                        />
                        {modalOn && stepControl === 21 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="handBrake"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(22);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.handBrake && "borderError"}
                        />
                        {modalOn && stepControl === 22 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="brakingSystem"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(23);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.brakingSystem && "borderError"}
                        />
                        {modalOn && stepControl === 23 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="shockAbsorbersAV"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(24);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.shockAbsorbersAV && "borderError"}
                        />
                        {modalOn && stepControl === 24 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="shockAbsorbersAR"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(25);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.shockAbsorbersAR && "borderError"}
                        />
                        {modalOn && stepControl === 25 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="mileage"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                      min: 1,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <span>{GetFrenchElementControl(field.name)}</span>
                          <InputText
                            type="number"
                            value={
                              field.value
                                ? field.value
                                : field.onChange(
                                    getVehicleVerificationElementsOfOneDay[
                                      field.name
                                    ]
                                  )
                            }
                            {...field}
                            className={errors.mileage && "borderError"}
                          />
                        </>
                      );
                    }}
                  />
                </span>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className="border p-2 mt-3 mb-3">
          <CardHeader title="Goupe 3" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <span className="p-float-label">
                  <Controller
                    name="mechanismOperation"
                    control={control}
                    shouldUnregister={true}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <span>{GetFrenchElementControl(field.name)}</span>
                        <Dropdown
                          id={field.name}
                          value={
                            field.value && field.value.state
                              ? field.value.state
                              : field.onChange(
                                  getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ]
                                )
                          }
                          onChange={({ value }) => {
                            if (value === "Manque" || value === "Abimé") {
                              field.onChange({ state: value });
                              setStepControl(26);
                              setModalOn(true);
                            } else {
                              field.onChange({ state: value });
                            }
                          }}
                          options={test}
                          style={{ width: "100%" }}
                          placeholder={GetFrenchElementControl(field.name)}
                          className={errors.mechanismOperation && "borderError"}
                        />
                        {modalOn && stepControl === 26 && (
                          <PopUpAddElementsForControl
                            openModal={modalOn}
                            setModalON={setModalOn}
                            dataGet={field.onChange}
                            data={field.value}
                            nameField={field.name}
                          />
                        )}
                        <div className="w-100 d-flex justify-content-center mt-2">
                          <PopOver
                            title={
                              field.value && field.value.state
                                ? field.value.state
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].state
                            }
                            body={
                              field.value && field.value.comment
                                ? field.value.comment
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].comment
                            }
                            image={
                              field.value && field.value.image
                                ? field.value.image
                                : getVehicleVerificationElementsOfOneDay[
                                    field.name
                                  ].image
                            }
                          />
                        </div>
                      </>
                    )}
                  />
                </span>
              </Grid>
            </Grid>
            <br />
            <ButtonSubmit type="submit" />
          </CardContent>
        </Card>
      </form>
      {modalAdd && (
        <PopUpVerifControlMutation
          modalOn={modalAdd}
          setModalOn={setModalAdd}
          dataControl={vehicleControl}
          date={dateControl}
          idVehicle={idVehicle}
          idControl={getVehicleVerificationElementsOfOneDay.id}
          reset={reset}
          setIdVehicle={setIdVehicle}
          setDate={setDate}
        />
      )}
    </>
  );
}
