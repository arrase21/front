import React from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const ClienteActions = ({ clienteId }: { clienteId: number }) => {
  const promoverAdmin = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/cliente/promover_admin/${clienteId}`,
      );
      console.log(response.data.Mensaje);
    } catch (error) {
      console.error("Error al promover a administrador:", error);
    }
  };

  const promoverUser = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/cliente/promover_user/${clienteId}`,
      );
      console.log(response.data.Mensaje);
    } catch (error) {
      console.error("Error al degradar a usuario:", error);
    }
  };

  return (
    <Box>
      <Button
        onClick={promoverAdmin}
        color="primary"
        variant="contained"
        style={{ marginRight: "10px" }}
      >
        Promover a Administrador
      </Button>
      <Button onClick={promoverUser} color="secondary" variant="contained">
        Degradar a Usuario
      </Button>
    </Box>
  );
};

export default ClienteActions;
