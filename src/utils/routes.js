import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import TaskList from "../components/TaskList";

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
  {
    path: "/todo",
    element: <TaskList />,
  },
];

export default routes;
