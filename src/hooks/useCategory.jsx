import { useEffect, useState } from "react";
import {
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../services/categoria_services";
// import { useAuth } from "./useAuth";
import { getToken } from "../function/tocken";
import { useSnackbar } from "notistack";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar("La Categoria se Guardo con Exito", {
        variant: "success",
      });
      // enqueueSnackbar("success", "La Categoria se Guardo con Exito");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar("Ocurrio un error al realizar la transaccion reintente", {
        variant: "error",
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
      enqueueSnackbar("La Categoria se Actualizo con Exito", {
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Ocurrio un error al realizar la transaccion reintente", {
        variant: "error",
      });

      setError(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategoryApi(id, token);
      enqueueSnackbar("success", "La Categoria se Elimino con Exito");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(
        "error",
        "Ocurrio un error al realizar la transaccion reintente"
      );

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
