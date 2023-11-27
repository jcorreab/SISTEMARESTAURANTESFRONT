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
// import ModalCategoria from "../../componetns/MoodalCategoria";
import { useProduct } from "../../hooks/useProduct";
import ModalProducto from "../../componetns/ModalProductos";

// import useMensaje from "../../hooks/useMensaje";

function Productos() {
  const { getProducts } = useProduct();
  const styleActive = {
    color: "#00AB55",
    borderRadius: "1rem",
    border: "solid 0px #00AB55",
    backgroundColor: "#cbf5d8",
  };

  const styleInactive = {
    color: "#bd2323",
    borderRadius: "1rem",
    border: "0px solid #bd2323",
    backgroundColor: "#e7b9b9",
  };
  const columns = [
    // {
    //   field: "id",
    //   headerName: "linea",
    //   width: 55,
    //   align: "center",
    //   hide: true,
    // },

    {
      field: "image",
      headerName: "Imagen",
      width: 250,
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
      field: "title",
      headerName: "Producto",
      width: 240,
      editable: false,
      align: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} placementF="top">
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "price",
      headerName: "Precio",
      width: 150,
      editable: false,
      align: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} placementF="top">
          <div>{params.value}</div>
        </Tooltip>
      ),
    },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 240,
      editable: false,
      align: "center",
      renderCell: (params) => (
        <Tooltip title={params.value} placementF="top">
          <div>{params.value}</div>
        </Tooltip>
      ),
    },

    {
      field: "active",
      headerName: "Activo",
      width: 120,
      editable: false,
      align: "center",
      renderCell: (param) =>
        param.row.active === true ? (
          <Button variant="containded" style={styleActive}>
            Activo
          </Button>
        ) : (
          <Button variant="containded" style={styleInactive}>
            Inactivo
          </Button>
        ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      width: 100,
      align: "center",
      headerClassName: "super-app-theme--header",
      renderCell: () => (
        <IconButton
          color="primary"
          onClick={() => {
            //      eliminarProductoTabla(param);
          }}
          component="span"
          size="small"
        >
          <DeleteRoundedIcon style={{ color: "#FF3030" }} />
        </IconButton>
      ),
    },
  ];

  const [listaProductos, setListaProductos] = useState([]);
  const [tipoModal, setTipoModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [datosEditar, setDatosEditar] = useState({});
  // const { mensajeSistema } = useMensaje();
  const toggleShow = () => setOpenModal((p) => !p);
  //   const [datosCategorias, setDatosCategorias] = useState({

  //   })
  // const eliminarProductoTabla = async (e) => {
  //   try {
  //     await deleteCategory(e.id);
  //     const nuevaLista = listaCategorias.filter((f) => f.id !== e.id);
  //     setListaCategorias(nuevaLista);
  //   } catch (error) {
  //     //   console.log(error);
  //   }

  //   // console.log(e);
  // };
  const obtenerDatosGrid = async () => {
    try {
      const productos = await getProducts();
      const MapeadosProductos = productos.map((f) => ({
        ...f,
        categoria: f.category_data.title,
        activo: f.active,
      }));
      setListaProductos(MapeadosProductos);
      console.log(MapeadosProductos);
      // const listado = categorias.map((f) => ({
      //   ...f,
      //   nombre: f.title,
      // }));

      //    console.log(listado);
      //     setListaCategorias(listado);
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
    console.log(tipo);
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
      <ModalProducto
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
              onClick={() => {
                setTipoModal("Nuevo");
                abrirModal({}, "Nuevo");
              }}
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
              paddingTop: "2rem",
              height: "65vh",
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
              rows={listaProductos}
              columns={columns}
              onRowDoubleClick={(e) => {
                setTipoModal("Editar");
                abrirModal(e.row, "Editar");
              }}
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

export default Productos;
