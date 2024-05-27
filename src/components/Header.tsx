// import { Typography, Box, useTheme } from "@mui/material";
// import { tokens } from "./theme";
//
// const Header = ({ title, subtitle }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <Box mb="30px">
//       <Typography
//         variant="h2"
//         color={colors.grey[100]}
//         fontWeight="bold"
//         sx={{ m: "0 0 5px 0" }}
//       >
//         {title}
//       </Typography>
//       <Typography variant="h5" color={colors.greenAccent[400]}>
//         {subtitle}
//       </Typography>
//     </Box>
//   );
// };
//
// export default Header;

import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "./theme";

// Define las propiedades esperadas para el componente Header
interface HeaderProps {
  title: string; // El título del encabezado
  subtitle: string; // El subtítulo del encabezado
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      {" "}
      {/* Margin-bottom de 30px */}
      <Typography
        variant="h2"
        color={colors.grey[100]} // Color basado en el tema
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }} // Margin de 0 arriba y 5px abajo
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
