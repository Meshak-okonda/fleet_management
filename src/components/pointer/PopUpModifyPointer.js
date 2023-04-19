import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { GetAges, GetSex } from "../../utils";
import { Row, Col } from "react-bootstrap";
import { updatePointerInState } from "../../redux/slice/globalSlice";
import { UPDATE_POINTER } from "../../graphql/queries";
import { useMutation } from "@apollo/client";
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

export default function PopUpModifyDriver({
  openModal,
  setModalON,
  updateDriver,
}) {
  const [updatePointer, { data, error, loading, reset }] =
    useMutation(UPDATE_POINTER);
  const dispatch = useAppDispatch();
  const handleClose = () => setModalON(false);

  useEffect(() => {
    if (data && data.updatePointer) {
      dispatch(updatePointerInState(data.updatePointer));
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
    await updatePointer({
      variables: {
        updatePointerId: updateDriver.id,
        pointer: { ...data, age: parseInt(data.age) },
      },
    });
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
          Modification de {`${updateDriver.name} ${updateDriver.lastName}`}
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <div>
              <Row className="mt-3 mb-3">
                <Col>
                  <Controller
                    name="name"
                    defaultValue={updateDriver.name}
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
                    defaultValue={updateDriver.lastName}
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
                    name="password"
                    defaultValue=""
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
                    name="age"
                    defaultValue={`${updateDriver.age}`}
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
                    defaultValue={`${updateDriver.sex}`}
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
            </div>
          </DialogContent>
          <DialogActions>
            {error && setTimeout(() => reset(), 3000)}
            <ButtonSubmit
              color={error ? "error" : data ? "success" : "primary"}
              loading={loading}
              autoFocus
              type="submit"
            />
          </DialogActions>
        </form>
      </BootstrapDialog>
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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
