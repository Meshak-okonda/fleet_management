import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { GetAges, GetSex } from "../../utils";
import { Row, Col } from "react-bootstrap";
import {
  AddControllerInState,
  AddSabotierInState,
} from "../../redux/slice/globalSlice";
import { CREATE_CONTROLLER } from "../../graphql/queries";
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

export default function PopUpAddPointer({ openModal, setModalON }) {
  const [createPointer, { data, error, loading, reset }] =
    useMutation(CREATE_CONTROLLER);
  const dispatch = useAppDispatch();
  const handleClose = () => setModalON(false);

  useEffect(() => {
    if (data) {
      const { createController } = data;
      if (createController) {
        dispatch(AddControllerInState(createController));
      }
    }
  }, [data, dispatch, setModalON]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  async function onSubmit(data) {
    await createPointer({
      variables: {
        controller: data,
      },
    });
    setModalON(false);
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
          Créer un Controller
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
