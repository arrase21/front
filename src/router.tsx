import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AppLogin from "@/layouts/AppLogin";
import ClientesGrid from "@/views/teams";

import LoginForm from "@/views/login";
import Form from "@/views/form";
import { useMode, ColorModeContext } from "./components/theme";
import { ThemeProvider } from "@mui/material";
import AddValoracion from "@/views/add_valoracion";

export default function Router() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLogin />}>
              <Route path="/login" element={<LoginForm />} />
            </Route>
            <Route element={<AppLayout />}>
              {/* <Route path="/" element={<DashboardView />} index /> */}
              <Route path="/" element={<ClientesGrid />} index />
              <Route path="/teams" element={<ClientesGrid />} />
              <Route path="/agregar/cliente" element={<Form />} />
              {/* <Route path="/valoracion/add/:idCliente" element={<Valoracion />} /> */}
              <Route
                path="/agregar/valoracion/:idCliente"
                element={<AddValoracion />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
