// import { useState } from "react";
import {
  Grid,
  Modal,
  Fade,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useCategory } from "../hooks/useCategory";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

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
ModalCategoria.propTypes = {
  openModal: PropTypes.bool.isRequired,
  tipo: PropTypes.string.isRequired,
  toggleShow: PropTypes.func.isRequired,
  datosEditar: PropTypes.object,
  // proveedor: PropTypes.number.isRequired,
  // resetearLista: PropTypes.bool.isRequired,
};

export default function ModalCategoria(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { openModal, toggleShow, tipo, datosEditar } = props;
  const { addCategory, updateCategory } = useCategory();
  const [datosCategoria, setDatosCategoria] = useState({
    nombre: "",
    archivo: null,
  });

  const cambiarNombre = (e) => {
    setDatosCategoria({
      ...datosCategoria,
      nombre: e.target.value,
    });
  };

  const [preview, setPreview] = useState(""); // Estado para la vista previa de la imagen

  // Función para manejar el cambio en el input de archivo
  const cambiarArchivo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDatosCategoria((prev) => ({ ...prev, archivo: file }));
      setPreview(URL.createObjectURL(file)); // Crea una URL para la vista previa de la imagen
    }
  };
  const grabarDatos = async (tipos) => {
    setPreview("");
    const datos = {
      title: datosCategoria.nombre,
      image: datosCategoria.archivo,
    };
    console.log(datosEditar);
    if (tipos === "Nuevo") {
      await addCategory(datos);
      toggleShow();
      enqueueSnackbar("La Categoria se Guardo con Exito", {
        variant: "success",
      });
    } else {
      await updateCategory(datosEditar.id, datos);
      enqueueSnackbar("success", "La Categoria se Actualizo con Exito");
      toggleShow();
    }
  };
  useEffect(() => {
    console.log(tipo);
    setPreview("");

    if (tipo === "Editar") {
      setDatosCategoria({
        nombre: datosEditar.title,
        archivo: datosEditar.image,
      });
      fetchAndPreviewImage(datosEditar.image);
    } else {
      setDatosCategoria({
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

  const fetchAndPreviewImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setPreview(objectURL);
      })
      .catch((error) => console.error("Error al cargar la imagen:", error));
  };

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
                  label="Nombre de la Categoría"
                  variant="outlined"
                  value={datosCategoria.nombre}
                  onChange={cambiarNombre}
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
                  onClick={() => grabarDatos("grabar")}
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
