import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Container, Link, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { CONNECTION_RESPONSABLE } from "../graphql/queries";
import { useAppDispatch, useAppSelector } from "../hooks";
import { connexionUser } from "../redux/slice/userSlice";
import { getDate } from "../utils/index";
import { useLazyQuery } from "@apollo/client";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const [connection, { data, error, loading }] = useLazyQuery(
    CONNECTION_RESPONSABLE,
    {
      onError: (e) => {
        setMessage({
          value: true,
          message: e.message,
        });
        setTimeout(() => setMessage({ value: false }), 5000);
      },
    }
  );
  const { user } = useAppSelector((state) => state.userConnected);
  const [message, setMessage] = useState({
    value: false,
    message: 6000,
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "la taille maximal est 20")
        .min(3, "la taille minimal est 3")
        .required("Le nom d'utilisateur est requis"),
      password: Yup.string()
        .max(20, "la taille maximal est 20")
        .min(8, "la taille minimal est 8")
        .required("Le Mor de passe est requis"),
    }),
    onSubmit: async () => {
      await connection({
        variables: {
          name: formik.values.name,
          password: formik.values.password,
        },
      });
      setTimeout(() => {
        allowButton();
      }, 1000);
    },
  });

  const allowButton = () => {
    formik.isSubmitted = false;
  };

  if (data && data.connectionResponsable) {
    const { connectionResponsable } = data;
    dispatch(connexionUser(connectionResponsable));
    localStorage.setItem(
      "user",
      JSON.stringify({ ...connectionResponsable, date: getDate() })
    );
    localStorage.setItem("token", connectionResponsable.token);
    setTimeout(() => {
      router.push("/dashbord");
    }, 2000);
  }

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (user && user.date === getDate()) {
      setTimeout(() => {
        dispatch(connexionUser(user));
        router.push("/dashbord");
      }, 3500);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Connexion | Fleet Management Soft</title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h3">
                Connexion
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Bienvenue sur la page de connexion Connexion de{" "}
                <strong>fleet management software</strong>
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Connectez - vous avec vos identifiants !
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nom d'utilisateur"
              margin="normal"
              name="name"
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mot de passe"
              margin="normal"
              name="password"
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <LoadingButton
                loading={loading}
                fullWidth
                size="large"
                type="submit"
                color={
                  message.value ? "error" : user.name ? "success" : "primary"
                }
                variant="contained"
              >
                {message.value
                  ? message.message
                  : loading
                  ? "Connexion en cours"
                  : user.name
                  ? `Bienvenue ${user.name}`
                  : "Connexion"}
              </LoadingButton>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Mot de passe oublié ?{" "}
              <NextLink href="/recovery">
                <Link href="/recovery">Cliquez ici</Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
