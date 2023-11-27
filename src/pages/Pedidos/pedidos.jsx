import React, { useState } from "react";
import {
  Grid,
  Paper,
  Badge,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CloseIcon from "@mui/icons-material/Close";

// eslint-disable-next-line react/prop-types
function Mesa({ numero, cuenta, pedidos, onClick }) {
  const mesaColor = cuenta ? "green" : "black";
  const sillasColor = pedidos ? "blue" : "black";
  const cuentaLabel = cuenta ? "Cuenta" : "";
  const pedidoCount = pedidos || 0;

  return (
    <Grid item>
      <Badge badgeContent={pedidoCount} color="primary">
        <Paper
          elevation={3}
          sx={{ padding: 2, backgroundColor: mesaColor }}
          onClick={onClick}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <EventSeatIcon sx={{ color: sillasColor }} />
            <TableRestaurantIcon />
            <EventSeatIcon sx={{ color: sillasColor }} />
          </Box>
          <Typography variant="caption" display="block" gutterBottom>
            Mesa {numero}
          </Typography>
          {cuentaLabel && (
            <Typography variant="caption" display="block" gutterBottom>
              {cuentaLabel}
            </Typography>
          )}
        </Paper>
      </Badge>
    </Grid>
  );
}

function Restaurante() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const mesas = [
    { numero: 1, cuenta: true, pedidos: 0 },
    { numero: 2, cuenta: true, pedidos: 0 },
    { numero: 3, pedidos: 1 },
    // ... más mesas
  ];
  const abrirDialogo = (numero) => {
    setMesaSeleccionada(mesas.find((mesa) => mesa.numero === numero));
    setDialogoAbierto(true);
  };

  const cerrarDialogo = () => {
    setDialogoAbierto(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Restaurante
      </Typography>
      <Grid container spacing={2}>
        {mesas.map((mesa, index) => (
          <Mesa
            key={index}
            numero={mesa.numero}
            cuenta={mesa.cuenta}
            pedidos={mesa.pedidos}
            onClick={abrirDialogo}
          />
        ))}
      </Grid>
      <Dialog
        open={dialogoAbierto}
        onClose={cerrarDialogo}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Detalles de la Mesa {mesaSeleccionada?.numero}
          <IconButton
            aria-label="close"
            onClick={cerrarDialogo}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Aquí puedes poner el contenido que necesitas mostrar, como el pedido actual, opciones, etc. */}
          <Typography variant="body1">
            Pedidos pendientes: {mesaSeleccionada?.pedidos || "Ninguno"}
          </Typography>
          {/* Agrega más contenido como sea necesario */}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Restaurante;
