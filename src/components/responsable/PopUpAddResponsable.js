import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CREATE_RESPONSABLE } from "../../graphql/queries";
import { useAppDispatch } from "../../hooks";
import { GetAges, GetSex, PostImage } from "../../utils";
import { Form, Image, Row, Col } from "react-bootstrap";
import { schema } from "../../schema/responsableSchemaValidator";
import { addResponsableInState } from "../../redux/slice/globalSlice";
import PopUpMutation from "../custom/PopUpMutation";
import ToastCustom from "../ToastCustom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonSubmit from "../ButtonSubmit";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AiFillDelete } from "react-icons/ai";

export default function PopUpAddResponsable({ openModal, setModalON }) {
	const dispatch = useAppDispatch();
	const [data, setData] = useState(null);
	const [image, setImage] = useState('');
	const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const [spinner, setSpinner] = useState(false);
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
      const { createResponsable } = data;
      setTimeout(() => handleClose(), 2000);
      dispatch(addResponsableInState(createResponsable));
    }
  }, [data, dispatch, handleClose]);
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm();

	async function onSubmit(data) {
		await schema.isValid({ ...data, image }).then((valid) => {
			if (valid) {
				setVariablesMutation({ ...data });
				setModalOn(true);
			} else {
				setToast({
					state: true,
					message: 'Reverifier vos données !',
					type: 'success',
					header: 'Felicitation',
					delay: 3000,
				});
			}
		});
	}

	const confirmMutation = async (mutation) => {
		let listUrl = '';
		if (image && image.length > 0) {
			setToast({
				header: 'Envoi des images',
				type: 'info',
				awaitView: true,
				state: true,
			});
			const { url } = await PostImage(image);
			listUrl = url;
			setToast({ state: false });
		}
		try {
			await mutation({
				variables: { responsable: { ...variablesMutation, image: listUrl } },
			});
			reset();
		} catch (error) {
			setToast({
        state: true,
        message: JSON.stringify(error.message),
        type: "error",
        header: "Erreur",
        delay: 3000,
      });
		}
	};

	function chooseImage({ target }) {
		var reader = new FileReader();

		reader.onloadend = function ({ target }) {
			setImage(reader.result);
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
          Créer un Responsable
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <div className="p-fluid p-formgrid p-grid">
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="addResponsable"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Ajouter un Responsable"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
                <Col>
                  <Controller
                    name="upResponsable"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Modification Responsable"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
                <Col>
                  <Controller
                    name="delResponsable"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Supprimer un Responsable"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="addVehicle"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Ajouter de Véhicule"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
                <Col>
                  <Controller
                    name="upVehicle"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Modification Véhicule"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
                <Col>
                  <Controller
                    name="delVehicle"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Supprimer Véhicule"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="addDriver"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Ajouter de Chauffeur"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
                <Col>
                  <Controller
                    name="upDriver"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Modification Chauffeur"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
                <Col>
                  <Controller
                    name="delDriver"
                    control={control}
                    defaultValue={true}
                    render={({ field }) => {
                      return (
                        <>
                          <FormControlLabel
                            control={
                              <Switch
                                onChange={({ target: { checked } }) => {
                                  field.onChange(checked);
                                }}
                                defaultChecked
                              />
                            }
                            label="Supprimer Chauffeur"
                          />
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className="p-field p-col-12 p-md-6">
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 20,
                      minLength: 3,
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
                          {errors.name && errors.name.type === "required" && (
                            <small className="alert-danger p-1">
                              Le nom est requis !
                            </small>
                          )}
                          {errors.name && errors.name.type === "maxLength" && (
                            <small className="alert-danger p-1">
                              La taille minimal n&apos;est pas respecter (20
                              caractères)
                            </small>
                          )}
                          {errors.name && errors.name.type === "minLength" && (
                            <small className="alert-danger p-1">
                              La taille minimal n&apos;est pas respecter (3
                              caractères)
                            </small>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-12 p-md-6">
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 20,
                      minLength: 3,
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
                          {errors.lastName &&
                            errors.lastName.type === "required" && (
                              <small className="alert-danger p-1">
                                Le Post nom est requis !
                              </small>
                            )}
                          {errors.lastName &&
                            errors.lastName.type === "maxLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (20
                                caractères)
                              </small>
                            )}
                          {errors.lastName &&
                            errors.lastName.type === "minLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (3
                                caractères)
                              </small>
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
                    name="email"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 50,
                      minLength: 3,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="E - Mail *"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.email && errors.email.type === "required" && (
                            <small className="alert-danger p-1">
                              Le mail est requis !
                            </small>
                          )}
                          {errors.email &&
                            errors.email.type === "maxLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (20
                                caractères)
                              </small>
                            )}
                          {errors.email &&
                            errors.email.type === "minLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (3
                                caractères)
                              </small>
                            )}
                          {errors.email && errors.email.type === "pattern" && (
                            <small className="alert-danger p-1">
                              email invalide
                            </small>
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
                    name="password"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 50,
                      minLength: 8,
                      pattern: /^[a-zA-Z0-9]+$/,
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
                          {errors.password &&
                            errors.password.type === "required" && (
                              <small className="alert-danger p-1">
                                le mot de passe est requis !
                              </small>
                            )}
                          {errors.password &&
                            errors.password.type === "maxLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (50
                                caractères)
                              </small>
                            )}
                          {errors.password &&
                            errors.password.type === "minLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (8
                                caractères)
                              </small>
                            )}
                          {errors.password &&
                            errors.password.type === "pattern" && (
                              <small className="alert-danger p-1">
                                le mot de passe ne doit contenir que des lettres
                              </small>
                            )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-6">
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: true,
                      maxLength: 50,
                      minLength: 8,
                      pattern: /^[0-9]+$/,
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <TextField
                            fullWidth
                            label="Numero de Téléphone *"
                            variant="outlined"
                            id={field.name}
                            error={errors.name}
                            {...field}
                            type="text"
                          />
                          {errors.phone && errors.phone.type === "required" && (
                            <small className="alert-danger p-1">
                              le mot de passe est requis !
                            </small>
                          )}
                          {errors.phone &&
                            errors.phone.type === "maxLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (50
                                caractères)
                              </small>
                            )}
                          {errors.phone &&
                            errors.phone.type === "minLength" && (
                              <small className="alert-danger p-1">
                                La taille minimal n&apos;est pas respecter (8
                                caractères)
                              </small>
                            )}
                          {errors.phone && errors.phone.type === "pattern" && (
                            <small className="alert-danger p-1">
                              le format du numero de Téléphone est invalide
                              (0-9)
                            </small>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col className="p-field p-col-3">
                  <Controller
                    name="age"
                    control={control}
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
                            label="Age *"
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
                          {errors.age && (
                            <small className="alert-danger p-1">
                              L&apos;age est requis !
                            </small>
                          )}
                        </>
                      );
                    }}
                  />
                </Col>
                <Col className="p-field p-col-3">
                  <Controller
                    name="sex"
                    control={control}
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
                            label="Sexe du responsable"
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
                          {errors.sex && (
                            <small className="alert-danger p-1">
                              Le sexe est requis !
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
                    <label htmlFor="address">Photo du Responsable</label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      size="md"
                      onChange={chooseImage}
                    />
                  </Form.Group>
                </Col>
                <Col className="p-field p-col-12 d-flex align-content-center">
                  {image && (
                    <div className="m-1" s>
                      <Image
                        src={
                          image?.startsWith("http")
                            ? image
                            : `${process.env.LIEN_BACK_IMAGE}${image}`
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
                        onClick={() => setImage(null)}
                      >
                        <AiFillDelete color="red" />
                      </IconButton>
                    </div>
                  )}
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
          query={CREATE_RESPONSABLE}
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
