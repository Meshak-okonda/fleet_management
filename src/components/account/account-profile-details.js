import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import { UPDATE_RESPONSABLE } from "../../graphql/queries";
import { useForm, Controller } from 'react-hook-form';
import { GetAges, GetSex, getDate, PostImage } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateResponsableInState } from "../../redux/slice/globalSlice";
import { connexionUser } from "../../redux/slice/userSlice";
import PopUpMutation from "../custom/PopUpMutation";
import ToastCustom from "../ToastCustom";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ButtonSubmit from "../ButtonSubmit";
import { Form, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";


export const AccountProfileDetails = (props) => {
  const { user } = useAppSelector((state) => state.userConnected);
  const dispatch = useAppDispatch();
	const [data, setData] = useState(null);
  const [modalOn, setModalOn] = useState(false);
	const [variablesMutation, setVariablesMutation] = useState({});
	const handleClose = () => setModalOn(false);
  const [userImage, setUserImage] = useState(user.image);
	const [toast, setToast] = useState({
		state: false,
		message: '',
		type: '',
		header: '',
		delay: null,
	});

	useEffect(() => {
		if (data) {
			const { updateResponsable } = data;
      dispatch(updateResponsableInState(updateResponsable));
      dispatch(connexionUser(updateResponsable));
			localStorage.removeItem('user');
			localStorage.setItem(
        "user",
        JSON.stringify({ ...updateResponsable, date: getDate() })
      	);
			setTimeout(() => {
				setModalOn(false);
			}, 1000);
		}
	}, [data, dispatch]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
  } = useForm();


  const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;
  const removeProperties = (object, ...keys) =>
    keys.length
      ? removeProperties(removeProperty(keys.pop(), object), ...keys)
      : object;

  function onSubmit(data) {
    const otherInfo = removeProperties(
      user,
      "delete",
      "date",
      "id",
      "createdAt",
      "token",
      "superAdm"
    );

    setVariablesMutation({ ...otherInfo, ...data });
    setModalOn(true);
  }
  const recupNumberInString = (string) => {
    const regex = /\d+/g;
    const result = string.match(regex);
    return result[0];
  };

  const confirmMutation = async (mutation) => {
    let imageUrl = "";
    try {
      if (userImage) {
        if (!userImage.includes("http")) {
          setToast({
            header: "Envoi des images",
            message: "Envoi des images",
            type: "info",
            awaitView: true,
            state: true,
          });
          const { url } = await PostImage(userImage);
          imageUrl = url;
          setUserImage(url);
        }else{
          imageUrl = userImage;
        }
      }
      setToast({ state: false });
      await mutation({
        variables: {
          updateResponsableId: user.id,
          responsable: { ...variablesMutation, image: imageUrl },
        },
      });
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
      setUserImage(target.result);
    };
    if (target.files[0]) {
      reader.readAsDataURL(target.files[0]);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="Mis à jour du profil" title="Edition" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: true,
                  maxLength: 20,
                  minLength: 3,
                }}
                defaultValue={user.name}
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
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z]+$/,
                  maxLength: 20,
                  minLength: 3,
                }}
                defaultValue={user.lastName}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        fullWidth
                        label="Post nom *"
                        variant="outlined"
                        id={field.name}
                        error={errors.lastName}
                        {...field}
                        value={field.value}
                        type="text"
                      />
                      {errors.lastName &&
                        errors.lastName.type === "required" && (
                          <small className="alert-danger p-1">
                            Le post nom est requis !
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
                      {errors.lastName &&
                        errors.lastName.type === "pattern" && (
                          <small className="alert-danger p-1">
                            le post nom ne doit contenir que des lettres
                          </small>
                        )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{
                  maxLength: 50,
                  minLength: 3,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                }}
                defaultValue={user.email}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        fullWidth
                        label="E - Mail *"
                        variant="outlined"
                        id={field.name}
                        error={errors.email}
                        {...field}
                        value={field.value}
                        type="text"
                      />
                      {errors.email && errors.email.type === "maxLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (20
                          caractères)
                        </small>
                      )}
                      {errors.email && errors.email.type === "minLength" && (
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
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  maxLength: 50,
                  minLength: 8,
                  pattern: /^[0-9]+$/,
                }}
                defaultValue={user.phone}
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        fullWidth
                        label="Numero de Téléphone *"
                        variant="outlined"
                        id={field.name}
                        error={errors.phone}
                        {...field}
                        value={field.value}
                        type="text"
                      />
                      {errors.phone && errors.phone.type === "maxLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (50
                          caractères)
                        </small>
                      )}
                      {errors.phone && errors.phone.type === "minLength" && (
                        <small className="alert-danger p-1">
                          La taille minimal n&apos;est pas respecter (8
                          caractères)
                        </small>
                      )}
                      {errors.phone && errors.phone.type === "pattern" && (
                        <small className="alert-danger p-1">
                          le format du numero de Téléphone est invalide (0-9)
                        </small>
                      )}
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="age"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue={user.age}
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
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                name="sex"
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue={user.sex}
                render={({ field }) => {
                  return (
                    <>
                      <InputLabel id="demo-simple-select-standard-label">
                        Sexe *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={field.value}
                        label="Sexe du responsable"
                        placeholder={field.value}
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
            </Grid>
            <Grid item md={12} xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{
                  maxLength: 50,
                  minLength: 8,
                }}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <>
                      <TextField
                        fullWidth
                        label="Mot de passe"
                        variant="outlined"
                        id={field.name}
                        error={errors.password}
                        {...field}
                        value={field.value}
                        type="text"
                      />
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
                    </>
                  );
                }}
              />
            </Grid>
            <Grid item md={5} xs={12}>
              <Form.Group controlId="formFileSm" className="mb-3">
                <label htmlFor="address">Photo du Responsable</label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  size="md"
                  onChange={chooseImage}
                />
              </Form.Group>
            </Grid>
            <Grid item md={7} xs={12} className="d-flex">
              {userImage && (
                <div className="m-1">
                  <Image
                    src={
                      userImage?.startsWith("http")
                        ? userImage
                        : `${process.env.LIEN_BACK_IMAGE}${userImage}`
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
                    onClick={() => setUserImage(null)}
                  >
                    <AiFillDelete color="red" />
                  </IconButton>
                </div>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <ButtonSubmit type="submit" />
        </Box>
      </Card>
      {modalOn && (
        <PopUpMutation
          query={UPDATE_RESPONSABLE}
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
    </form>
  );
};
