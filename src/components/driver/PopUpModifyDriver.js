import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UPDATE_DRIVER } from "../../graphql/queries";
import { useAppDispatch } from "../../hooks";
import {
  GetAges,
  GetSex,
  GetVehicles,
  GetYearsLicense,
  PostImage,
} from "../../utils";
import { Form, Image, Row, Col } from "react-bootstrap";
import { schema } from "../../schema/driveSchemaValidator";
import { updateDriveInState } from "../../redux/slice/globalSlice";
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

export default function PopUpModifyDriver({
	openModal,
	setModalON,
	updateDriver,
}) {
	const [valueModify, setValueModify] = useState(updateDriver);
	const [variablesMutation, setVariablesMutation] = useState({});
	const [modalOn, setModalOn] = useState(false);
	const [data, setData] = useState(null);
	const dispatch = useAppDispatch();
	const handleClose = () => setModalON(false);
	const [toast, setToast] = useState({
		state: false,
		body: '',
		header: '',
		type: '',
		delay: 6000,
	});

	useEffect(() => {
		if (data) {
			if (data.updateDriver) {
				dispatch(updateDriveInState(data.updateDriver));
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
		reset,
	} = useForm();

	async function onSubmit(data) {
		await schema
			.isValid({ ...data, image: valueModify.image })
			.then((valid) => {
				if (valid) {
					setVariablesMutation({ ...data });
					setModalOn(true);
				} else {
					setToast({
            header: "Erreur",
            type: "error",
            body: "Reverifier les données SVP!",
            state: true,
          });
				}
			});
	}

	const confirmMutation = async (mutation) => {
		const imageUrl = [];
		if (valueModify.image && valueModify.image.length > 0) {
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
		try {
			await mutation({
				variables: {
					updateDriverId: valueModify.id,
					driver: {
						...variablesMutation,
						password: variablesMutation.password || '',
						image: imageUrl,
						age: parseInt(variablesMutation.age),
					},
				},
			});
			reset();
		} catch (error) {
			setToast({
        header: "Erreur",
        body: `${JSON.stringify(error.message)}`,
        type: "error",
        state: true,
      });
		}
	};

	const recupNumberInString = (string) => {
		const regex = /\d+/g;
		const result = string.match(regex);
		return result[0];
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setValueModify({
				...valueModify,
				image: [reader.result],
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
          Modification de {`${valueModify.name} ${valueModify.lastName}`}
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <div>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="name"
                    defaultValue={valueModify.name}
                    rules={{
                      required: {
                        value: true,
                        message: "Le nom est obligatoire",
                      },
                      minLength: {
                        value: 3,
                        message: "Le nom doit contenir au moins 3 caractères",
                      },
                      maxLength: {
                        value: 30,
                        message: "Le nom doit contenir moins de 30 caractères",
                      },
                    }}
                    control={control}
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
                            value={field.value}
                            type="text"
                          />
                        </>
                      );
                    }}
                  />
                  {errors.name && (
                    <div className="alert-danger p-1">
                      {errors.name.message}
                    </div>
                  )}
                </Col>
                <Col>
                  <Controller
                    name="lastName"
                    defaultValue={valueModify.lastName}
                    rules={{
                      required: {
                        value: true,
                        message: "Le post nom est obligatoire",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "Le post nom doit contenir au moins 3 caractères",
                      },
                      maxLength: {
                        value: 30,
                        message:
                          "Le post nom doit contenir moins de 30 caractères",
                      },
                    }}
                    control={control}
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
                            value={field.value}
                            type="text"
                          />
                        </>
                      );
                    }}
                  />
                  {errors.lastname && (
                    <div className="alert-danger p-1">
                      {errors.lastname.message}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="phone"
                    defaultValue={valueModify.phone}
                    rules={{
                      minLength: {
                        value: 10,
                        message:
                          "Le numero de Téléphone doit contenir au moins 10 caractères",
                      },
                      maxLength: {
                        value: 14,
                        message:
                          "Le numero doit contenir moins de 30 caractères",
                      },
                      pattern: {
                        value: "^[0-9]*$",
                        message:
                          "Le numero de Téléphone doit contenir que des chiffres",
                      },
                    }}
                    control={control}
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
                            value={field.value}
                            type="text"
                          />
                        </>
                      );
                    }}
                  />
                  {errors.phone && (
                    <div className="alert-danger p-1">
                      {errors.phone.message}
                    </div>
                  )}
                </Col>
                <Col>
                  <Controller
                    name="password"
                    rules={{
                      minLength: {
                        value: 8,
                        message:
                          "Le mot de passe doit contenir au moins 8 caractères",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "Le mot de passe doit contenir moins de 20 caractères",
                      },
                    }}
                    control={control}
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
                            value={field.value}
                            type="text"
                          />
                        </>
                      );
                    }}
                  />
                  {errors.password && (
                    <div className="alert-danger p-1">
                      {errors.password.message}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="email"
                    defaultValue={valueModify.email || ""}
                    rules={{
                      minLength: {
                        value: 5,
                        message: "Le mail doit contenir au moins 5 caractères",
                      },
                      maxLength: {
                        value: 50,
                        message: "Le mail doit contenir moins de 50 caractères",
                      },
                      pattern: {
                        value:
                          "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
                        message: "mauvais format d'e-mail",
                      },
                    }}
                    control={control}
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
                            value={field.value}
                            type="text"
                          />
                        </>
                      );
                    }}
                  />
                  {errors.email && (
                    <div className="alert-danger p-1">
                      {errors.email.message}
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="licenseValidity"
                    defaultValue={`${valueModify.licenseValidity}`}
                    rules={{
                      required: {
                        value: true,
                        message: "Validité du permis est obligatoire",
                      },
                    }}
                    control={control}
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
                            label="Validité de la license"
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
                        </>
                      );
                    }}
                  />
                  {errors.licenseValidity && (
                    <div className="alert-danger p-1">
                      {errors.licenseValidity.message}
                    </div>
                  )}
                </Col>
                <Col>
                  <Controller
                    name="age"
                    defaultValue={`${valueModify.age}`}
                    rules={{
                      required: {
                        value: true,
                        message: "L'age est obligatoire",
                      },
                    }}
                    control={control}
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
                              field.onChange(value);
                            }}
                          >
                            {GetAges().map(({ value, label }) => (
                              <MenuItem value={value} key={label}>
                                {label}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      );
                    }}
                  />
                  {errors.age && (
                    <div className="alert-danger p-1">{errors.age.message}</div>
                  )}
                </Col>
                <Col>
                  <Controller
                    name="sex"
                    defaultValue={`${valueModify.sex}`}
                    rules={{
                      required: {
                        value: true,
                        message: "Le sexe est obligatoire",
                      },
                    }}
                    control={control}
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
                        </>
                      );
                    }}
                  />
                  {errors.sex && (
                    <div className="alert-danger p-1">{errors.sex.message}</div>
                  )}
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
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
                <Col className="d-flex">
                  {valueModify.image &&
                    valueModify.image.length > 0 &&
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
                                ...valueModify,
                                image: valueModify.image.filter(
                                  (image, index) => index !== id
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
            </div>
          </DialogContent>
          <DialogActions>
            <ButtonSubmit autoFocus type="submit" />
          </DialogActions>
        </form>
      </BootstrapDialog>
      {modalOn && (
        <PopUpMutation
          query={UPDATE_DRIVER}
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
