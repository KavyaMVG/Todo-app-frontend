import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";

const routes = [
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export default routes;
