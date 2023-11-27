import Categorias from "../pages/Categorias/Cateforias";
import Restaurante from "../pages/Pedidos/pedidos";
import Productos from "../pages/Productos/Productos";

export const RESTAURANTES_ROUTES = [
  {
    path: "categorias",
    element: <Categorias />,
  },
  {
    path: "productos",
    element: <Productos />,
  },

  {
    path: "pedidos",
    element: <Restaurante />,
  },
];
