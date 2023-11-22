import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../function/tocken";
import { useUser } from "../hooks/useUser";
import { useSnackbar } from "notistack";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const { getMe } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getMe(token);
        setAuth({ token, me });
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = async (token) => {
    try {
      console.log(token);
      setToken(token);
      const me = await getMe(token);
      enqueueSnackbar("Bienvenido a GASTOGESTOR", {
        variant: "success",
      });
      setAuth({ token, me });
    } catch (error) {
      enqueueSnackbar("Usuario y Contraseña incorrecta", {
        variant: "erroe",
      });
      console.log(error);
    }
    // console.log(token);
    // setToken(token);
    // const me = await getMe(token);
    // setAuth({ token, me });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
