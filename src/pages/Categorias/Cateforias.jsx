import { useEffect, useState } from "react";
import {
  Grid,
  // Card, Box,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import ModalCategoria from "../../componetns/MoodalCategoria";
import { useCategory } from "../../hooks/useCategory";

function Categorias() {
  const { getCategories, deleteCategory } = useCategory();
  const columns = [
    {
      field: "id",
      headerName: "linea",
      width: 55,
      align: "center",
      hide: true,
    },

    {
      field: "image",
      headerName: "Imagen",
      width: 200,
      editable: false,
      align: "center",
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.title || "imagen"}
          style={{ width: "auto", height: 50, borderRadius: "4px" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "path_to_default_image";
          }} // en caso de que la imagen no se encuentre
        />
      ),
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 400,
      editable: false,
      align: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} placementF="top">
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 100,
      align: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (param) => (
        <IconButton
          color="primary"
          onClick={() => {
            eliminarProductoTabla(param);
          }}
          component="span"
          size="small"
        >
          <DeleteRoundedIcon style={{ color: "#FF3030" }} />
        </IconButton>
      ),
    },
  ];
  const [listaCategorias, setListaCategorias] = useState([]);
  const [tipoModal, setTipoModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [datosEditar, setDatosEditar] = useState({});
  const toggleShow = () => setOpenModal((p) => !p);
  //   const [datosCategorias, setDatosCategorias] = useState({

  //   })
  const eliminarProductoTabla = async (e) => {
    try {
      await deleteCategory(e.id);
      const nuevaLista = listaCategorias.filter((f) => f.id !== e.id);
      setListaCategorias(nuevaLista);
    } catch (error) {
      console.log(error);
    }

    // console.log(e);
  };
  const obtenerDatosGrid = async () => {
    try {
      const categorias = await getCategories();
      const listado = categorias.map((f) => ({
        ...f,
        nombre: f.title,
      }));

      //    console.log(listado);
      setListaCategorias(listado);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerDatosGrid();
  }, []);

  const Nuevo = () => {
    setTipoModal("Nuevo");
    setOpenModal(true);
  };
  const Editar = () => {
    setTipoModal("Editar");
    setOpenModal(true);
  };
  const abrirModal = (datos, tipo) => {
    if (tipo === "Nuevo") {
      setDatosEditar({});
      Nuevo();
    } else {
      setDatosEditar(datos);
      Editar();
    }
  };

  return (
    <>
      <ModalCategoria
        openModal={openModal}
        toggleShow={toggleShow}
        tipo={tipoModal}
        datosEditar={datosEditar}
      />
      <Grid container>
        <Grid container item justifyContent="flex-end">
          <Grid item md={1.2} sm={1.7} xs={6}>
            <Button
              fullWidth
              variant="text"
              onClick={() => abrirModal("Nuevo")}
              startIcon={<InsertDriveFileRoundedIcon />}
            >
              {" "}
              Nuevo{" "}
            </Button>
          </Grid>
        </Grid>
        <Grid container item>
          <div
            style={{
              paddingTop: "1rem",
              height: "45vh",
              width: "100%",
            }}
          >
            <DataGrid
              density="compact"
              // disableSelectionOnClick
              // disableExtendRowFullWidth
              rowHeight={80}
              sx={{
                "& .MuiDataGrid-cell": {
                  border: "none",
                },
                ".blueCell": {
                  backgroundColor: "grid.azul",
                },
                ".orangeCell": {
                  backgroundColor: "grid.rojo",
                },
                ".yellowCell": {
                  backgroundColor: "grid.amarillo",
                },
              }}
              rows={listaCategorias}
              columns={columns}
              onRowDoubleClick={(e) => abrirModal(e.row, "Editar")}
              disableColumnMenu
              hideFooter
              getRowId={(rows) => rows.id}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}

              // getRowClassName={(params) => `super-app-theme--${params.row.status}`}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Categorias;
