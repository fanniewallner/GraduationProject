import { RouterProvider } from "react-router";
import { router } from "./router";
import "./App.scss";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
