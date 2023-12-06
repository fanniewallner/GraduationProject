import { RouterProvider } from "react-router";
import { router } from "./router";
import "./App.css";

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
