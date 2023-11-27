import {
  // Grid,
  // Fade,
  // Box,
  // Stack,
  InputAdornment,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import Image from "../componetns/Image";
import imagenLogo from "../assets/LOGORES.png";
import { LoadingButton } from "@mui/lab";
import { useRef, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { loginApi } from "../services/loginservices";
// import { useAuth } from "../hooks/useAuth";
import { setToken } from "../function/tocken";
import useMensaje from "../hooks/useMensaje";

function Login() {
  const userRef = useRef();
  // const { login } = useAuth();
  const { mensajeSistema } = useMensaje();

  const navegacion = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const cambiarEmail = (e) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };
  const cambiarPassword = (e) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };
  const ingresarLogin = async () => {
    try {
      const response = await loginApi(user);
      const { access } = response;
      setToken(access);
      //  await login(access)
      navegacion("/general/categorias");
      // console.log(access);
    } catch (error) {
      mensajeSistema({
        texto: "Usuario y Contraseña Incorrecta",
        variante: "error",
      });
    }
  };

  return (
    <>
      <Grid
        container
        style={{ minHeight: "100vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} style={{ padding: 20 }}>
          <Image visibleByDefault alt="login" src={imagenLogo} />
        </Grid>
        <Grid item xs={12} sm={6} container spacing={2} style={{ padding: 20 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            <strong> GastroGestor </strong> es propiedad Intelectual de
            <strong> Jazmany Correa </strong> Prohibida su duplicación o uso no
            autorizado bajo las leyes de derechos de autor
          </Alert>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={userRef}
              label="Email"
              fullWidth
              value={user.email}
              onChange={(e) => {
                cambiarEmail(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              required
              // inputRef={passwordRef}
              label="Contraseña"
              type="password"
              fullWidth
              value={user.password}
              onChange={(e) => {
                cambiarPassword(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              onClick={ingresarLogin}
              // Manejador de eventos y otros props
            >
              Acceder
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid container md={12} spacing={1}>
        <Grid item md={6}>
          <Image visibleByDefault disabledEffect alt="login" src={imagenLogo} />
        </Grid>
        <Grid containeritem md={6} spacing={2}>
          <Grid item md={12}>
            <TextField
              required
              inputRef={userRef}
              label="Usuario"
              fullWidth
              value={user.codigoUsuario}
              onChange={(e) => {
                cambiarUsuario(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              required
              // inputRef={passwordRef}
              label="contraseña"
              type="password"
              fullWidth
              value={user.password}
              onChange={(e) => {
                cambiarPassword(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={12}>
            <LoadingButton
              fullWidth
              size="large"
              variant="contained"
              onClick={() => {
                //    iniciarSesion();
              }}
              //  loading={cargando}
            >
              Acceder
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
}

export default Login;
