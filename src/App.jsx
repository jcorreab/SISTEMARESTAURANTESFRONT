// import { Route, Routes } from "react-router-dom";
// // import "./App.css";
// import Login from "./pages/login";
// import NotistackProvider from "./componetns/NotistackProvider";
import Router from "./routes/enrutados";
// import Categorias from "./pages/Categorias/Cateforias";

// const Login = () => <h1>Login</h1>;

function App() {
  return (
   
      // <NotistackProvider>
        <Router />
      // </NotistackProvider>
    
  );
}
{
  /* <Routes>
<Route path="/" element={<Login />} />

<Router />
<Route path="/Categorias" element={<Categorias />} /> 
</Routes> */
}
export default App;
