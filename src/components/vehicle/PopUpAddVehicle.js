import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import getYears from "../custom/getYears";
import { CREATE_VEHICLE } from '../../graphql/queries';
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  ConvertRGBtoHex,
  GetDrivers,
  GetTypeVehicle,
  HexToRgb,
  PostImage,
  GetListYears,
} from "../../utils";
import { Form, Image, Row, Col } from 'react-bootstrap';
import { schema } from '../../schema/vehicleSchemaValidator';
import { addVehicleInState } from '../../redux/slice/globalSlice';
import ToastCustom from "../ToastCustom";
import PopUpMutation from '../custom/PopUpMutation';
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

export default function PopUpAddVehicle({ openModal, setModalON }) {
	const dispatch = useAppDispatch();
	const [data, setData] = useState(null);
	const [image, setImage] = useState([]);
	const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const handleClose = () => setModalON(false);
	const [toast, setToast] = useState({
		state: false,
		message: '',
		type: '',
		header: '',
		delay: null,
	});

	useEffect(() => {
		if (data) {
			const { createVehicle } = data;
			dispatch(addVehicleInState(createVehicle));
			setTimeout(() => {
				setModalON(false);
			}, 2000);
		}
	}, [data, dispatch, setModalON]);
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	async function onSubmit(data) {
		await schema
			.isValid({
				...data,
				image,
			})
			.then((valid) => {
				if (valid) {
					setVariablesMutation({
						...data,
						image,
					});
					setModalOn(true);
				} else {
					setToast({
            state: true,
            message: JSON.stringify("Quelque chose s'est mal passé"),
            type: "error",
            header: "Erreur",
            delay: 3000,
          });
				}
			});
	}

	const confirmMutation = async (mutation) => {
		const listImage = image;
		const imageUrl = [];
		if (image.length > 0) {
			for (const file of listImage) {
				setToast({
					header: 'Envoi des images',
					type: 'info',
					awaitView: true,
					state: true,
				});
				const { url } = await PostImage(file);
				imageUrl.push(url);
			}
			setToast({ state: false });
		}
		try {
			await mutation({
				variables: { vehicle: { ...variablesMutation, image: imageUrl } },
			});
		} catch (error) {
			setToast({
        state: true,
        body: JSON.stringify(error),
        type: "error",
        header: "Erreur",
        delay: 3000,
      });
		}
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setImage([...image, reader.result]);
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
          Créer un Véhicule
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Row className="p-fluid p-formgrid p-grid">
              <Col className="p-field p-col-12 p-sm-12 p-lg-6 p-md-6">
                <Controller
                  name="idDriver"
                  control={control}
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
              </Col>
              <Col>
                <Controller
                  name="startYear"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <>
                      <InputLabel id="demo-simple-select-standard-label">
                        Année de debut de service*
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
                    L&apos;année de debut de service est requis !
                  </small>
                )}
              </Col>
              <Col>
                <Controller
                  name="yearConstruction"
                  control={control}
                  rules={{
                    required: true,
                  }}
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
              <Col className="p-field p-col-12 p-md-6">
                <Controller
                  name="model"
                  control={control}
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
                        type="text"
                      />
                    </>
                  )}
                />
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <Controller
                  name="serie"
                  control={control}
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
              </Col>
              <Col>
                <Controller
                  name="gpsData"
                  control={control}
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
                        error={errors.gpsData}
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
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col>
                <div className="p-field p-col-6">
                  <label htmlFor="color">Couleur *</label>
                  <Controller
                    name="color"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    defaultValue={JSON.stringify("#003863")}
                    render={({ field }) => (
                      <>
                        <div className="d-flex justify-content-around">
                          <Form.Control
                            type="color"
                            id="color"
                            defaultValue="#003863"
                            title="Choisir une couleur"
                            value={JSON.parse(field.value)}
                            onChange={({ target: { value } }) => {
                              field.onChange(JSON.stringify(value));
                            }}
                          />
                        </div>
                        {errors.color && errors.color.type === "required" && (
                          <small className="alert-danger p-1">
                            La color est requise !
                          </small>
                        )}
                      </>
                    )}
                  />
                </div>
              </Col>
              <Col className="p-field p-col-12 p-md-6">
                <Controller
                  name="registrationNumber"
                  control={control}
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
              </Col>
              <Col className="p-field p-col-12 p-md-6">
                <Controller
                  name="power"
                  control={control}
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
              </Col>
            </Row>
            <Row className="mt-3 mb-3">
              <Col className="p-field p-col-12">
                <Form.Group controlId="formFileSm" className="mb-3">
                  <label htmlFor="address">Photo</label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    size="md"
                    onChange={chooseImage}
                  />
                </Form.Group>
              </Col>
              <Col className="p-field p-col-12 d-flex align-content-center">
                {image.length > 0 &&
                  image.map((url, id) => {
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
                            setImage(image.filter((url, idimg) => idimg == !id))
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
          query={CREATE_VEHICLE}
          setModalON={setModalOn}
          openModal={modalOn}
          confirmMutation={confirmMutation}
          setDataGet={setData}
        />
      )}
      <ToastCustom
        stateToast={toast.state}
        body={toast.message}
        header={toast.header}
        delay={toast.delay}
        type={toast.type}
      />
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