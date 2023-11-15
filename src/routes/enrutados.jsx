import { useRoutes } from "react-router-dom";
import { RESTAURANTES_ROUTES } from "./routes";
import Navegacion from "../componetns/navegacion";
import Login from "../pages/login";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/general/",
      element: <Navegacion />,
      children: [...RESTAURANTES_ROUTES],
    },
  ]);

  return routes;
}
