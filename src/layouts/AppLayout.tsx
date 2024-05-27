import { Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "@/components/theme";
// import Logo from "@/components/Logo";
import Topbar from "@/components/Topbar";
import SideBar from "@/components/SideBar";

export default function AppLayout() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <SideBar />
            <main className="content">
              <Topbar />
              <Outlet />
            </main>
          </div>
          {/* <footer className="py-5"> */}
          {/*   <p className="text-center"> */}
          {/*     Todos los derechos reservados {new Date().getFullYear()} */}
          {/*   </p> */}
          {/* </footer> */}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}
