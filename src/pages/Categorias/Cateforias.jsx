import { useEffect, useState } from "react";
import {
  Grid,
  // Card, Box,
  Button,
  Tooltip,
} from "@mui/material";
import { DataGrid, esES } from "@mui/x-data-grid";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import ModalCategoria from "../../componetns/MoodalCategoria";

function Categorias() {
  const [listaCategorias, setListaCategorias] = useState([]);
//   const [tipoModal, setTipoModal] = useState("nuevo");
  const [openModal, setOpenModal] = useState(false);
  const toggleShow = () => setOpenModal((p) => !p);
  //   const [datosCategorias, setDatosCategorias] = useState({

  //   })
  const obtenerDatosGrid = () => {
    setListaCategorias([]);
  };
  useEffect(() => {
    obtenerDatosGrid();
  }, []);

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
    // {
    //   field: "delete",
    //   headerName: "Eliminar",
    //   width: 100,
    //   align: "center",
    //   headerClassName: "super-app-theme--header",
    //   renderCell: (param) => (
    //     <IconButton
    //       color="primary"
    //       onClick={() => {
    //         eliminarProductoTabla(param);
    //       }}
    //       component="span"
    //       size="small"
    //     >
    //       <DeleteRoundedIcon style={{ color: "#FF3030" }} />
    //     </IconButton>
    //   ),
    // },
  ];
  const Nuevo = () => {
    setOpenModal(true);
  };
  console.log("Si estoy renderisando");
  return (
    <>
      <ModalCategoria
        openModal={openModal}
        toggleShow={toggleShow}
        tipo="nuevo"
      />
      <Grid container>
        <Grid container item justifyContent="flex-end">
          <Grid item md={1.2} sm={1.7} xs={6}>
            <Button
              fullWidth
              variant="text"
              onClick={() => Nuevo()}
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
              rowHeight={20}
              // onCellEditCommit={(e) => {
              //   console.log(e);
              //   editarColumnaGrid(e);
              // }}
              // checkboxSelection
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
              // columns={columns.map((column) => ({
              //   ...column,
              //   renderCell: renderCellWithTooltip,
              // }))}
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
