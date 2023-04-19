import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CREATE_DRIVER } from "../../graphql/queries";
import { useAppDispatch } from "../../hooks";
import {
  GetAges,
  GetListYears,
  GetSex,
  GetYearsLicense,
  PostImage,
} from "../../utils";
import { Form, Image, Row, Col } from "react-bootstrap";
import { schema } from "../../schema/driveSchemaValidator";
import { addDriverInState } from "../../redux/slice/globalSlice";
import PopUpMutation from "../custom/PopUpMutation";
import ToastCustom from "../ToastCustom";
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
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonSubmit from "../ButtonSubmit";
import { AiFillDelete } from "react-icons/ai";


export default function PopUpAddDriver({ openModal, setModalON }) {
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
			const { createDriver } = data;
			if (createDriver) {
				dispatch(addDriverInState(createDriver));
				setTimeout(() => {
					setModalON(false);
				}, 1000);
			}
		}
	}, [data, dispatch, setModalON]);

	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
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
            message: "Quelque chose s'est mal passé",
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
			setToast({
				state: true,
				message: 'Envoie fichier(s)',
				type: 'info',
				awaitView: true,
			});
			for (const file of listImage) {
				const { url } = await PostImage(file);
				imageUrl.push(url);
			}
			setToast({
				state: false,
			});
		}
		try {
			await mutation({
				variables: { driver: { ...variablesMutation, image: imageUrl } },
			});
			setToast({
				state: true,
				message: 'Votre action avec succès',
				type: 'success',
				header: 'Felicitation',
				delay: 3000,
			});
			reset();
		} catch (error) {
			setToast({
				state: true,
				message: JSON.stringify(error),
				type: 'error',
				header: 'Erreur',
				delay: 3000,
			});
		}
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setImage([reader.result]);
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
          Créer un chauffeur
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <div className="p-fluid p-formgrid p-grid">
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    control={control}
                    name="name"
                    rules={{
                      required: {
                        value: true,
                        message: "Le nom est requis",
                      },
                      minLength: {
                        value: 3,
                        message: "La taille minimal n'est pas respecter(3)",
                      },
                      maxLength: {
                        value: 20,
                        message: "La taille maximal est depassé(20)",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="Nom *"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.name && (
                            <div className="alert-danger">
                              {errors.name.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-12 p-md-6">
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{
                      required: {
                        value: true,
                        message: "Le post nom est requis",
                      },
                      minLength: {
                        value: 3,
                        message: "La taille minimal n'est pas respecter(3)",
                      },
                      maxLength: {
                        value: 20,
                        message: "La taille maximal est depassé(20)",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="Post nom *"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.lastName && (
                            <div className="alert-danger">
                              {errors.lastName.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className="p-field p-col-6">
                  <Controller
                    control={control}
                    name="phone"
                    rules={{
                      maxLength: {
                        value: 14,
                        message: "La taille maximal est depassé(14)",
                      },
                      pattern: {
                        value: "^[0-9]*$",
                        message:
                          "Le numero de Téléphone doit contenir que des chiffres",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="Numero de Téléphone"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.phone && (
                            <div className="alert-danger">
                              {errors.phone.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-6">
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: {
                        value: true,
                        message: "Le mot de passe est requis",
                      },
                      minLength: {
                        value: 8,
                        message: "La taille minimal n'est pas respecter(8)",
                      },
                      maxLength: {
                        value: 20,
                        message: "La taille maximal est depassé(20)",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="Mot de passe *"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.password && (
                            <div className="alert-danger">
                              {errors.password.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className="p-field p-col-6">
                  <Controller
                    control={control}
                    name="email"
                    rules={{
                      minLength: {
                        value: 8,
                        message: "La taille minimal n'est pas respecter(8)",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Mauvais format",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="E - Mail"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.email && (
                            <div className="alert-danger p-1">
                              {errors.email.message}
                            </div>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className="p-field p-col-6">
                  <Controller
                    control={control}
                    name="licenseValidity"
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <InputLabel id="demo-simple-select-standard-label">
                            Validité du permis *
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={`${field.value}`}
                            label="Validité du permis *"
                            fullWidth
                            onChange={({ target: { value } }) => {
                              field.onChange(value);
                            }}
                          >
                            {GetYearsLicense().map(({ value, label }) => (
                              <MenuItem value={value} key={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.licenseValidity &&
                            errors.licenseValidity.type === "required" && (
                              <small className="alert-danger">
                                Validité du permis est requise !
                              </small>
                            )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-6">
                  <Controller
                    control={control}
                    name="age"
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <InputLabel id="demo-simple-select-standard-label">
                            Age *
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={`${field.value}`}
                            label="Validité de la license"
                            fullWidth
                            onChange={({ target: { value } }) => {
                              field.onChange(parseInt(value));
                            }}
                          >
                            {GetAges().map(({ value, label }) => (
                              <MenuItem value={value} key={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.age && errors.age.type === "required" && (
                            <small className="alert-danger">
                              L&apos;age est requis !
                            </small>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-6">
                  <Controller
                    control={control}
                    name="sex"
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <InputLabel id="demo-simple-select-standard-label">
                            Sexe *
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={`${field.value}`}
                            label="Validité de la license"
                            fullWidth
                            onChange={({ target: { value } }) => {
                              field.onChange(value);
                            }}
                          >
                            {GetSex().map(({ value, label }) => (
                              <MenuItem value={value} key={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.sex && errors.sex.type === "required" && (
                            <small className="alert-danger">
                              Le Sexe est requis !
                            </small>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className="p-field p-col-12">
                  <Form.Group controlId="formFileSm" className="mb-3">
                    <label htmlFor="address">Photo</label>
                    <Form.Control
                      type="file"
                      size="md"
                      accept="image/png, image/jpeg, image/jpg"
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
                              setImage(
                                image.filter((url, idimg) => idimg == !id)
                              )
                            }
                          >
                            <AiFillDelete color="red" />
                          </IconButton>
                        </div>
                      );
                    })}
                </Col>
              </Row>
            </div>
          </DialogContent>
          <DialogActions>
            <ButtonSubmit autoFocus type="submit" />
          </DialogActions>
        </form>
      </BootstrapDialog>
      {modalOn && (
        <PopUpMutation
          query={CREATE_DRIVER}
          setModalON={setModalOn}
          openModal={modalOn}
          confirmMutation={confirmMutation}
          setDataGet={setData}
        />
      )}
      {toast.state && (
        <ToastCustom
          stateToast={toast.state}
          body={toast.message}
          header={toast.header}
          delay={toast.delay}
          type={toast.type}
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
