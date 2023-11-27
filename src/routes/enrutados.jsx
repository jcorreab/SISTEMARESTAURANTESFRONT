import { useRoutes } from "react-router-dom";
import { RESTAURANTES_ROUTES } from "./routes";
import Navegacion from "../componetns/navegacion";
import Login from "../pages/login";
import ProtectedRoute from "../layouts/proteccionRutas";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/general/",
      element: (
        <ProtectedRoute>
          <Navegacion />
        </ProtectedRoute>
      ),
      children: RESTAURANTES_ROUTES.map((route) => ({
        ...route,
        element: <ProtectedRoute>{route.element}</ProtectedRoute>,
      })),
    },
    // {
    //   path: "/general/",
    //   element: <Navegacion />,
    //   children: [...RESTAURANTES_ROUTES],
    // },
  ]);

  return routes;
}
