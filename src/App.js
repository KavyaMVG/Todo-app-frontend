import "./App.css";
// import dotenv from "dotenv";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./utils/routes";

function App() {
  const router = createBrowserRouter(routes);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
