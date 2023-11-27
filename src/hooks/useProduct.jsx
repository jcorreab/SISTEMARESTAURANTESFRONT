import { useState } from "react";
import {
  getProductsApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsByCategoryApi,
} from "../services/producto_services";
// import { useAuth } from "./";
import { getToken } from "../function/tocken";
import useMensaje from "../hooks/useMensaje";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const { mensajeSistema } = useMensaje();

  //   const { auth } = useAuth();
  const token = getToken();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      // console.log("este es el response del hook", response);
      setLoading(false);
      return response;
      //   setProducts(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductApi(data, token);
      mensajeSistema({
        texto: "El Producto se grabo Con Exito",
        variante: "success",
      });
      setLoading(false);
    } catch (error) {
      mensajeSistema({
        texto: "Problemas al Grabar el Producto , Porfavor Contacte a Soporte",
        variante: "error",
      });
      setError(error);
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data, token);
      mensajeSistema({
        texto: "El Producto se actualizo Con Exito",
        variante: "success",
      });
      setLoading(false);
    } catch (error) {
      mensajeSistema({
        texto:
          "Problemas al Actualizar el Producto , Porfavor Contacte a Soporte",
        variante: "error",
      });
      setError(error);
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, token);
      mensajeSistema({
        texto: "El Producto se elimino Con Exito",
        variante: "success",
      });
      setLoading(false);
    } catch (error) {
      mensajeSistema({
        texto: "Problemas al Eliminar el Producto , Porfavor Contacte a Soporte",
        variante: "error",
      });
      setError(error);
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      const product = await getProductByIdApi(id);
      return product;
    } catch (error) {
      setError(error);
    }
  };

  const getProductsByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryApi(idCategory);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    products,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
  };
}
