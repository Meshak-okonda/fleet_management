import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import getYears from '../custom/getYears';
import { UPDATE_VEHICLE } from '../../graphql/queries';
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  ConvertRGBtoHex,
  GetDrivers,
  GetTypeVehicle,
  GetVehicles,
  HexToRgb,
  PostImage,
  GetListYears,
} from "../../utils";
import { Form, Image, Row, Col } from 'react-bootstrap';
import { schema } from '../../schema/vehicleSchemaValidator';
import { updateVehicleInState } from '../../redux/slice/globalSlice';
import { Modal } from 'react-bootstrap';
import PopUpMutation from '../custom/PopUpMutation';
import ToastCustom from '../ToastCustom';
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ButtonSubmit from "../ButtonSubmit";
import { AiFillDelete } from "react-icons/ai";

export default function PopUpModifyVehicle({
	openModal,
	setModalON,
	vehicleUpdate,
}) {
	const dispatch = useAppDispatch();
	const [valueModify, setValueModify] = useState(vehicleUpdate);
	const [dataAfterModification, setDataAfterModification] = useState(null);
	const [modalOn, setModalOn] = useState(false);
	const [data, setData] = useState(null);
	let driverList = GetDrivers();
	let typeVehicleList = GetTypeVehicle();
	const [toast, setToast] = useState({
		state: false,
		body: '',
		header: '',
		type: '',
		delay: 6000,
	});
	const handleClose = () => setModalON(false);

	useEffect(() => {
		if (data) {
			if (data.updateVehicle) {
				dispatch(updateVehicleInState(data.updateVehicle));
				setTimeout(() => {
					setModalON(false);
				}, 2000);
			}
		}
	}, [data, dispatch, setModalON]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	async function onSubmit(data) {
		setDataAfterModification(data);
		setModalOn(true);
	}

  const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;
  const removeProperties = (object, ...keys) =>
    keys.length
      ? removeProperties(removeProperty(keys.pop(), object), ...keys)
      : object;

	const confirmMutation = async (mutation) => {
		const imageUrl = [];
		if (valueModify.image.length > 0) {
			for (const file of valueModify.image) {
				if (file.startsWith('http')) {
					imageUrl.push(file);
				} else {
					setToast({
						header: 'Envoi des images',
						type: 'info',
						awaitView: true,
						state: true,
					});
					const { url } = await PostImage(file);
					imageUrl.push(url);
				}
			}
			setToast({ state: false });
		}
    const dataUpdate = {...removeProperties(dataAfterModification, 'delete'), image: imageUrl};
		try {
			await mutation({
				variables: {
					updateVehicleId: vehicleUpdate.id,
					vehicle: { ...dataUpdate },
				},
			});
		} catch (error) {
			setToast({
				header: 'Erreur',
				body: `${JSON.stringify(error.message || 'Erreur Server')}`,
				type: 'error',
				state: true,
			});
		}
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setValueModify({
				...valueModify,
				image: [...valueModify.image, reader.result],
			});
		};
		if (target.files[0]) {
			reader.readAsDataURL(target.files[0]);
		}
	}
	return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        fullWidth={true}
        maxWidth="md"
        open={openModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Modification de {valueModify.name}
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Row className="mt-3 mb-3">
              <Col>
                <div className="p-field p-col-12 p-md-6">
                  <Controller
                    name="idDriver"
                    control={control}
                    defaultValue={valueModify.idDriver}
                    render={({ field }) => (
                      <>
                        <InputLabel id="demo-simple-select-standard-label">
                          Chauffeur à assigner
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.value}
                          label="Chauffeur à assigner"
                          onChange={({ target: { value } }) => {
                            field.onChange(value);
                          }}
                        >
                          {GetDrivers().map(({ value, label }) => (
                            <MenuItem value={value} key={label}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                </div>
              </Col>
              <Col>
                <div className="p-field p-col-6">
                  <Controller
                    name="startYear"
                    control={control}
                    defaultValue={valueModify.startYear}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <InputLabel id="demo-simple-select-standard-label">
                          Année de debut *
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.value}
                          label="Année de debut"
                          fullWidth
                          onChange={({ target: { value } }) => {
                            field.onChange(value);
                          }}
                        >
                          {getYears.map(({ value, label }) => (
                            <MenuItem value={value} key={label}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  {errors.startYear && errors.startYear.type === "required" && (
                    <small className="alert-danger p-1">
                      L&apos;année de debut est requis !
                    </small>
                  )}
                </div>
              </Col>
              <Col>
                <Controller
                  name="yearConstruction"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  defaultValue={valueModify.yearConstruction}
                  render={({ field }) => (
                    <>
                      <>
                        <InputLabel id="demo-simple-select-standard-label">
                          Année de fabrication *
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.value}
                          label="Année de debut"
                          fullWidth
                          onChange={({ target: { value } }) => {
                            field.onChange(value);
                          }}
                        >
                          {GetListYears().map(({ value, label }) => (
                            <MenuItem value={value} key={label}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    </>
                  )}
                />
                {errors.yearConstruction &&
                  errors.yearConstruction.type === "required" && (
                    <small className="alert-danger p-1">
                      Le Année de fabrication est requis !
                    </small>
                  )}
                {errors.yearConstruction &&
                  errors.yearConstruction.type === "maxLength" && (
                    <small className="alert-danger p-1">
                      La taille maximal est depassé
                    </small>
                  )}
                {errors.yearConstruction &&
                  errors.yearConstruction.type === "minLength" && (
                    <small className="alert-danger p-1">
                      La taille minimal n&apos;est pas respecter
                    </small>
                  )}
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <div className="p-field p-col-12 p-md-6">
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={valueModify.name}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          fullWidth
                          label="Nom du Véhicule *"
                          variant="outlined"
                          id={field.name}
                          error={errors.name}
                          {...field}
                          value={field.value}
                          type="text"
                        />
                      </>
                    )}
                  />
                  {errors.name && errors.name.type === "required" && (
                    <small className="alert-danger p-1">
                      Le nom est requis !
                    </small>
                  )}
                  {errors.name && errors.name.type === "maxLength" && (
                    <small className="alert-danger p-1">
                      La taille maximal est depassé
                    </small>
                  )}
                  {errors.name && errors.name.type === "minLength" && (
                    <small className="alert-danger p-1">
                      La taille minimal n&apos;est pas respecter
                    </small>
                  )}
                </div>
              </Col>

              <Col>
                <div className="p-field p-col-12 p-md-6">
                  <Controller
                    name="model"
                    control={control}
                    defaultValue={valueModify.model}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          fullWidth
                          label="Model de Véhicule *"
                          variant="outlined"
                          id={field.name}
                          {...field}
                          value={field.value}
                          type="text"
                        />
                      </>
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <div className="p-field p-col-6">
                  <Controller
                    name="serie"
                    control={control}
                    defaultValue={valueModify.serie}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          label={"Numero de chassis *"}
                          variant="outlined"
                          id={field.name}
                          fullWidth
                          error={errors.serie}
                          {...field}
                          value={field.value}
                          type="text"
                          name="serie"
                        />
                      </>
                    )}
                  />
                  {errors.serie && errors.serie.type === "required" && (
                    <small className="alert-danger p-1">
                      Le Numero de chassis est requis !
                    </small>
                  )}
                  {errors.serie && errors.serie.type === "maxLength" && (
                    <small className="alert-danger p-1">
                      La taille maximal est depassé
                    </small>
                  )}
                  {errors.serie && errors.serie.type === "minLength" && (
                    <small className="alert-danger p-1">
                      La taille minimal n&apos;est pas respecter
                    </small>
                  )}
                </div>
              </Col>
              <Col>
                <div className="p-field p-col-6">
                  <Controller
                    name="gpsData"
                    control={control}
                    defaultValue={valueModify.gpsData}
                    rules={{
                      maxLength: 50,
                      minLength: 3,
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          label="Identifiant GPS"
                          variant="outlined"
                          type="text"
                          name="gpsData"
                          fullWidth
                          id={field.name}
                          {...field}
                          value={field.value}
                        />
                      </>
                    )}
                  />
                  {errors.gpsData && errors.gpsData.type === "maxLength" && (
                    <small className="alert-danger p-1">
                      La taille maximal est depassé
                    </small>
                  )}
                  {errors.gpsData && errors.gpsData.type === "minLength" && (
                    <small className="alert-danger p-1">
                      La taille minimal n&apos;est pas respecter
                    </small>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <div className="p-field p-col-6">
                  <label htmlFor="color">
                    Couleur <i className="danger-color">*</i>
                  </label>
                  <Controller
                    name="color"
                    control={control}
                    defaultValue={valueModify.color}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <div className="d-flex justify-content-around">
                          <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue="#003863"
                            title="Choose your color"
                            value={JSON.parse(field.value)}
                            onChange={({ target: { value } }) => {
                              field.onChange(JSON.stringify(value));
                            }}
                          />
                          {valueModify.color && (
                            <small
                              style={{
                                backgroundColor: JSON.parse(valueModify.color),
                                height: 30,
                                width: 200,
                              }}
                            ></small>
                          )}
                        </div>
                        {errors.color && errors.color.type === "required" && (
                          <small className="alert-danger p-1">
                            La couleur est requise !
                          </small>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>
              <Col>
                <div className="p-field p-col-12 p-md-6">
                  <Controller
                    name="registrationNumber"
                    control={control}
                    defaultValue={valueModify.registrationNumber}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          label="N° Immatriculation"
                          variant="outlined"
                          id={field.name}
                          error={errors.registrationNumber}
                          {...field}
                          value={field.value}
                          fullWidth
                          type="text"
                          name="registrationNumber"
                        />
                      </>
                    )}
                  />
                  {errors.registrationNumber &&
                    errors.registrationNumber.type === "required" && (
                      <small className="alert-danger p-1">
                        N° Immatriculation est requis !
                      </small>
                    )}
                </div>
              </Col>
              <Col>
                <div className="p-field p-col-12 p-md-6">
                  <Controller
                    name="power"
                    control={control}
                    defaultValue={valueModify.power}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <>
                        <TextField
                          label="Puissance du moteur"
                          variant="outlined"
                          id={field.name}
                          error={errors.power}
                          fullWidth
                          type="text"
                          name="power"
                          {...field}
                          value={field.value}
                        />
                      </>
                    )}
                  />

                  {errors.power && errors.power.type === "required" && (
                    <small className="alert-danger p-1">
                      Puissance du moteur est requise !
                    </small>
                  )}
                </div>
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <Form.Group controlId="formFileSm" className="mb-3">
                  <label htmlFor="address">Photo du Véhicule</label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    size="md"
                    onChange={chooseImage}
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex">
                {valueModify.image &&
                  valueModify.image.length >= 0 &&
                  valueModify.image.map((url, id) => {
                    return (
                      <div className="m-1" key={id}>
                        <Image
                          src={
                            url?.startsWith("http")
                              ? url
                              : `${process.env.LIEN_BACK_IMAGE}${url}`
                          }
                          template="Preview Content"
                          alt="Image Text"
                          width="100"
                          height="100"
                          style={{
                            borderRadius: "10%",
                            border: "1px solid #003863 ",
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          style={{ zIndex: 15005, cursor: "pointer" }}
                          onClick={() =>
                            setValueModify({
                              image: valueModify.image.filter(
                                (url, idimg) => idimg == !id
                              ),
                            })
                          }
                        >
                          <AiFillDelete color="red" />
                        </IconButton>
                      </div>
                    );
                  })}
              </Col>
            </Row>
          </DialogContent>
          <DialogActions>
            <ButtonSubmit autoFocus type="submit" />
          </DialogActions>
        </form>
      </BootstrapDialog>
      {modalOn && (
        <PopUpMutation
          query={UPDATE_VEHICLE}
          setModalON={setModalOn}
          openModal={modalOn}
          confirmMutation={confirmMutation}
          setDataGet={setData}
        />
      )}
      {toast.state && (
        <ToastCustom
          stateToast={toast.state}
          body={toast.body}
          header={toast.header}
          type={toast.type}
          delay={toast.delay}
          awaitView={toast.awaitView}
        />
      )}
    </>
  );
}


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}
{...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
