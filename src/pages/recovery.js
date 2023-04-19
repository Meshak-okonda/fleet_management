import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { REINITIALISATION_ACCOUNT } from "../graphql/queries";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToastCustom from "../components/ToastCustom";
import { useMutation } from "@apollo/client";

const Register = () => {
  const [mutation, { data, loading, error }] = useMutation(
    REINITIALISATION_ACCOUNT
  );
  const router = useRouter();
  const [toast, setToast] = useState({
    state: false,
    message: "",
    type: "",
    header: "",
    delay: null,
  });
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().max(255).required("Le code est obligatoire"),
      name: Yup.string().max(255).required("Le nom est obligatoire"),
    }),
    onSubmit: async () => {
      onSubmitForm();
    },
  });

  const onSubmitForm = async () => {
    let name = formik.values.name;
    let code = formik.values.code;

    await mutation({
      variables: { name, code },
    });
    setTimeout(() => {
      allowButton();
    }, 1000);
  };

  const allowButton = () => {
    formik.isSubmitted = false;
  };

  if (error)
  return (
    <>
      <Head>
        <title>Recovery Account | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Connexion
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Recupération du compte
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Remplisez ce formulaire pour lancé le processus de recupération
                du compte
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.code && formik.errors.code)}
              fullWidth
              helperText={formik.touched.code && formik.errors.code}
              label="Code de reinitialisation CPS"
              margin="normal"
              name="code"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.code}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nom d'utilisateur"
              margin="normal"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Confirmer
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      <ToastCustom
        header="Erreur"
        body={`Erreur : ${error.message || ""}`}
        stateToast={true}
        type="error"
      />
    </>
  );


  if (data)
    return (
      <>
        <Head>
          <title>Recovery Account | Fleet Management Soft</title>
        </Head>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <NextLink href="/" passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                Connexion
              </Button>
            </NextLink>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Recupération du compte
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Remplisez ce formulaire pour lancé le processus de
                  recupération du compte
                </Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.code && formik.errors.code)}
                fullWidth
                helperText={formik.touched.code && formik.errors.code}
                label="Code de reinitialisation CPS"
                margin="normal"
                name="code"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.code}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nom d'utilisateur"
                margin="normal"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
              />
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Confirmer
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
        <ToastCustom
          header="Félicitation"
          body="Mail envoyer avec succès à votre compte ! Verifiez votre boite mail pour la suite."
          stateToast={true}
          type="success"
        />
      </>
    );

  if (loading)
    return (
      <>
        <Head>
          <title>Recovery Account | Fleet Management Soft</title>
        </Head>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <NextLink href="/" passHref>
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                Connexion
              </Button>
            </NextLink>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Recupération du compte
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Remplisez ce formulaire pour lancé le processus de
                  recupération du compte
                </Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.code && formik.errors.code)}
                fullWidth
                helperText={formik.touched.code && formik.errors.code}
                label="Code de reinitialisation CPS"
                margin="normal"
                name="code"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.code}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nom d'utilisateur"
                margin="normal"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
              />
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Confirmer
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
        <ToastCustom
          header="Félicitation"
          body="En cours de traitement"
          stateToast={true}
          type="info"
        />
      </>
    );

  return (
    <>
      <Head>
        <title>Recovery Account | Fleet Management Soft</title>
      </Head>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Connexion
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Recupération du compte
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Remplisez ce formulaire pour lancé le processus de recupération
                du compte
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.code && formik.errors.code)}
              fullWidth
              helperText={formik.touched.code && formik.errors.code}
              label="Code de reinitialisation CPS"
              margin="normal"
              name="code"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.code}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nom d'utilisateur"
              margin="normal"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Confirmer
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      {toast.state && (
        <ToastCustom
          header="Mauvais identifiant"
          body={toast.body}
          stateToast={toast.stateToast}
          type={toast.type}
        />
      )}
    </>
  );
};

export default Register;
