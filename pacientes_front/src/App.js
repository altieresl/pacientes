import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Index from "./components/Pacientes/ListarPacientes";
import NovoPaciente from "./components/Pacientes/NovoPaciente";
import {withAuthenticationRequired} from "@auth0/auth0-react";

const NovoPacienteAuth = withAuthenticationRequired(NovoPaciente);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path: "/novo/:pacienteId?",
    element: <NovoPacienteAuth/>,
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

