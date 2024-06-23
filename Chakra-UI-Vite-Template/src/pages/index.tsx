import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./home";
//import { Cuenta } from "./home";
import { Landing } from "./landing";
import { Main } from "./main";
import { Login2 } from "./login/login"; 
import { Certificados } from "./certificados";
import { Sign } from "./sign";


const routes = [
  { path: "/", Page: Landing },
  { path: "/login", Page: Login },
  //{ path: "/cuenta", Page: Cuenta },
  { path: "/main", Page: Main },
  {path: "/certificados", Page: Certificados},
  {path: "/sign", Page: Sign}
 
];

function Routing() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {routes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
}

export { Routing };
