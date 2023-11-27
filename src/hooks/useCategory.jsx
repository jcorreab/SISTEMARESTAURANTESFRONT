import { useEffect, useState } from "react";
import {
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../services/categoria_services";
// import { useAuth } from "./useAuth";
import { getToken } from "../function/tocken";

import useMensaje from "../hooks/useMensaje";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(null);

  const { mensajeSistema } = useMensaje();

  // const { auth } = useAuth();
  const token = getToken();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setLoading(false);
      setCategories(response);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      await addCategoryApi(data, token);
      mensajeSistema({
        texto: "La Categoria se grabo Con Exito",
        variante: "success",
      });
      // enqueueSnackbar("success", "La Categoria se Guardo con Exito");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      mensajeSistema({
        texto: "Problemas al Actualizar la Categoria Contacte a Soporte...",
        variante: "error",
      });
      // enqueueSnackbar(
      //   "error",
      //   "Ocurrio un error al realizar la transaccion reintente"
      // );
      setError(error);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      setLoading(true);
      await updateCategoryApi(id, data, token);
      mensajeSistema({
        texto: "La Categoria se Actualizo con Exito",
        variante: "success",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      mensajeSistema({
        texto: "Problemas al Actualizar la Categoria Contacte a Soporte...",
        variante: "error",
      });

      setError(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategoryApi(id, token);
      mensajeSistema({
        texto: "La Categoria se Elimino Con Exito",
        variante: "success",
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      mensajeSistema({
        texto: "Problemas al Eliminar la Categoria Contacte a Soporte...",
        variante: "error",
      });

      setError(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return {
    loading,
    error,
    categories,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
