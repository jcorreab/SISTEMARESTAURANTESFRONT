// import { useState } from "react";
import {
  Grid,
  Modal,
  Fade,
  TextField,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useCategory } from "../hooks/useCategory";

import { useEffect } from "react";
import useMensaje from "../hooks/useMensaje";
import { NumericFormat } from "react-number-format";
import { useProduct } from "../hooks/useProduct";

const stylemodal = {
  borderRadius: "1rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "90%", md: "60%", lg: "40%" },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4, // Añade padding alrededor del contenido del modal
};
ModalProducto.propTypes = {
  openModal: PropTypes.bool.isRequired,
  tipo: PropTypes.string.isRequired,
  toggleShow: PropTypes.func.isRequired,
  datosEditar: PropTypes.object,
  // proveedor: PropTypes.number.isRequired,
  // resetearLista: PropTypes.bool.isRequired,
};

export default function ModalProducto(props) {
  const { openModal, toggleShow, tipo, datosEditar } = props;
  const { getCategories } = useCategory();
  const { addProduct, updateProduct } = useProduct();
  const { mensajeSistema } = useMensaje();
  const [listaCategorias, setListaCategorias] = useState([]);
  const [datosProducto, setDatosProducto] = useState({
    nombre: "",
    archivo: null,
    categoria: 1,
    precio: 0.0,
    activo: false,
  });

  const cambiarNombre = (e) => {
    setDatosProducto({
      ...datosProducto,
      nombre: e.target.value,
    });
  };
  const CambiarValorPrecio = (e) => {
    setDatosProducto({
      ...datosProducto,
      precio: e.floatValue,
    });
  };

  const [preview, setPreview] = useState(""); // Estado para la vista previa de la imagen

  // Función para manejar el cambio en el input de archivo
  const cambiarArchivo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDatosProducto((prev) => ({ ...prev, archivo: file }));
      setPreview(URL.createObjectURL(file)); // Crea una URL para la vista previa de la imagen
    }
  };
  const cambiarCategoria = (e) => {
    setDatosProducto({
      ...datosProducto,
      categoria: e.target.value,
    });
  };
  const CambiarActico = (e) => {
    setDatosProducto({
      ...datosProducto,
      activo: e.target.checked,
    });
  };
  const grabarDatos = async () => {
    setPreview("");
    if (datosProducto.nombre.trim().length == 0) {
      mensajeSistema({
        texto: "Ingrese Por Favor el Nombre de la Categoria",
        variante: "warning",
      });
      return false;
    }
    if (datosProducto.archivo === null) {
      mensajeSistema({
        texto: "Porfavor suba la imagen de la Categoria",
        variante: "warning",
      });
      return false;
    }
    // {
    //   "title": "string",
    //   "price": "string",
    //   "active": true,
    //   "category": 0,
    //   "category_data": {
    //     "title": "string"
    //   }
    // }
    const datos = {
      title: datosProducto.nombre,
      image: datosProducto.archivo,
      price: datosProducto.precio.toFixed(2),
      category: datosProducto.categoria,
      active: datosProducto.activo
    };

    // console.log(datosEditar);
    if (tipo === "Nuevo") {
      try {
        await addProduct(datos);
        toggleShow();
        // mensajeSistema({
        //   texto: "La Categoria se grabo Con Exito",
        //   variante: "success",
        // });
      } catch (error) {
        mensajeSistema({
          texto: "Problemas al Actualizar la Categoria Contacte a Soporte...",
          variante: "error",
        });
      }
    } else {
      try {
        await updateProduct(datosEditar.id, datos);
        // mensajeSistema({
        //   texto: "La Categoria se Actualizo con Exito",
        //   variante: "success",
        // });

        toggleShow();
      } catch (error) {
        mensajeSistema({
          texto: "Problemas al Actualizar la Categoria Contacte a Soporte...",
          variante: "error",
        });
      }
    }
  };

  const ObtenerCategorias = async () => {
    const categorias = await getCategories();
    setListaCategorias(categorias);
  };
  useEffect(() => {
    ObtenerCategorias();
  }, []);

  const fetchAndPreviewImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setPreview(objectURL);
      })
      .catch((error) => console.error("Error al cargar la imagen:", error));
  };
  useEffect(() => {
    setPreview("");

    if (tipo === "Editar") {
      setDatosProducto({
        ...datosProducto,
        nombre: datosEditar.title,
        archivo: datosEditar.image,
        categoria: datosEditar.category,
      });
      fetchAndPreviewImage(datosEditar.image);
    } else {
      setDatosProducto({
        nombre: "",
        archivo: null,
      });
    }

    // if (datosEditar !== null && datosEditar.length === 0) {
    //   console.log('Quedo aqui');
    //   fetchAndPreviewImage(datosEditar.image);
    //   // setPreview(URL.createObjectURL(datosEditar.image));
    // }
  }, [datosEditar]);
  return (
    <Modal
      open={openModal}
      onClose={toggleShow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={openModal}>
        <Box sx={stylemodal}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`${tipo === "Nuevo" ? "Añadir" : "Editar"} Categoría`}
            </Typography>
            <IconButton onClick={toggleShow}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box mt={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nombre del Producto"
                  variant="outlined"
                  value={datosProducto.nombre}
                  onChange={cambiarNombre}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Categoria"
                  fullWidth
                  size="small"
                  onChange={(e) => {
                    cambiarCategoria(e);
                  }}
                  value={datosProducto.categoria}
                >
                  {listaCategorias.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8}>
                <NumericFormat
                  label="Precio"
                  name="Precio"
                  customInput={TextField}
                  value={datosProducto.precio}
                  size="small"
                  type="text"
                  prefix="$"
                  thousandSeparator
                  onValueChange={(f) => {
                    CambiarValorPrecio(f);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={datosProducto.activo || false}
                      //  defaultChecked={true}
                      onChange={(e) => {
                        CambiarActico(e);
                      }}
                      value={datosProducto.activo}
                    />
                  }
                  label="Activo"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  Subir Imagen
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={cambiarArchivo}
                  />
                </Button>
              </Grid>
              {preview && (
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={2}
                    border="1px dashed"
                    borderColor="grey.400"
                    mt={2}
                  >
                    <img
                      src={preview}
                      alt="Vista previa"
                      style={{ maxWidth: "100%", maxHeight: "250px" }}
                    />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  onClick={() => grabarDatos()}
                >
                  Grabar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
