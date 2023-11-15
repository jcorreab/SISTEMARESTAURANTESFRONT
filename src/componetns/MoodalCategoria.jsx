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

// import * as ServiciosAjusteIngresoXlote from '../servicios/ajuste_ingreso_x_lote_services';
// import DisableTextField from '../../../../../../components/admenterprice/DisabledTextField';
// import { formatearFecha } from '../../../../../../utils/admenterprice/funciones/funciones';

// const stylemodal = {
//   borderRadius: "1rem",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", sm: "90%", md: "90%", lg: "45%" },
//   height: "auto",
//   bgcolor: "background.paper",
//   boxShadow: 24,
// };
const stylemodal = {
  borderRadius: "1rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "90%", md: "60%", lg: "40%" }, // Ajusta el ancho para dispositivos más grandes
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4, // Añade padding alrededor del contenido del modal
};
ModalCategoria.propTypes = {
  openModal: PropTypes.bool.isRequired,
  tipo: PropTypes.string.isRequired,
  toggleShow: PropTypes.func.isRequired,
  // proveedor: PropTypes.number.isRequired,
  // resetearLista: PropTypes.bool.isRequired,
};

export default function ModalCategoria(props) {
  // eslint-disable-next-line react/prop-types
  const { openModal, toggleShow } = props;
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
  // const cambiarArchivo = (e) => {
  //   setDatosCategoria({
  //     ...datosCategoria,
  //     archivo: e.target.value,
  //   });
  // };
  const [preview, setPreview] = useState(""); // Estado para la vista previa de la imagen

  // Función para manejar el cambio en el input de archivo
  const cambiarArchivo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDatosCategoria((prev) => ({ ...prev, archivo: file }));
      setPreview(URL.createObjectURL(file)); // Crea una URL para la vista previa de la imagen
    }
  };
  // console.log("mira esto de aca",codigoalternativo)
  // const DesactivarBusqueda = producto > 0 && bodega > 0;

  //  const [rowsFilter, setRowFilter] = useState({});

  //   const [datosProducto, setDatosProducto] = useState({
  //     codigo: 0,
  //     codigoproducto: "",
  //     nombre: "",
  //   });

  //   const onTrigger = (event) => {
  //     props.parentCallback(event);
  //   };

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
              Añadir Categoría
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
            </Grid>
          </Box>
        </Box>
      </Fade>
      {/* <Fade in={openModal}>
        <Box sx={stylemodal}>
          <div style={{ margin: "1rem", fontWeight: "bold" }}>
             <h2>Selección de {props.nombre} </h2> 
          </div>
          <Box ml={2} mr={2}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  value={datosCategoria.nombre}
                  onChange={(e) => {
                    cambiarNombre(e);
                  }}
                />
              </Grid>
              <Grid item xl={9} lg={9} md={6} sm={9} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  autoFocus
                  label="Imagen"
                  name="buscar"
                  variant="outlined"
                  onChange={(e) => {
                    cambiarArchivo(e);
                  }}
                  value={datosCategoria.archivo}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Fade> */}
    </Modal>
  );
}
