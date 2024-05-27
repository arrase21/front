import Header from "@/components/Header";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "react-pro-sidebar/dist/css/styles.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useMode, ColorModeContext } from "@/components/theme";
import { ThemeProvider } from "@mui/material";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  clienteId: number | null;
  onClienteUpdated?: () => void;
}

interface Cliente {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  contrasena: string;
}

const EditModal = ({
  open,
  onClose,
  clienteId,
  onClienteUpdated,
}: EditModalProps) => {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });

  useEffect(() => {
    if (clienteId) {
      axios
        .get(`https://backend-jt8e.onrender.com/cliente/${clienteId}`)
        // .get(`http://localhost:5000/cliente/${clienteId}`)
        .then((response) => {
          const clienteData = response.data as Cliente;
          setCliente(clienteData);
        })
        .catch((error) => {
          console.error("Error al obtener el cliente:", error);
        });
    }
  }, [clienteId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!clienteId) return;
    axios
      .patch(
        `https://backend-jt8e.onrender.com/actualizar/cliente/${clienteId}/`, // URL correcta
        cliente,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => {
        if (onClienteUpdated) {
          onClienteUpdated(); // Notifica la actualización
        }
        onClose(); // Cierra el modal
      })
      .catch((error) => {
        console.error("Error al actualizar el cliente:", error);
      });
  };

  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={onClose}>
          <Header title="Editar Cliente " subtitle=" "></Header>
          <DialogContent>
            <TextField
              name="nombre"
              label="Nombre"
              fullWidth
              value={cliente.nombre}
              onChange={handleChange}
            />
            <TextField
              name="apellido"
              label="Apellido"
              fullWidth
              value={cliente.apellido}
              onChange={handleChange}
            />
            <TextField
              name="correo"
              label="Correo"
              fullWidth
              value={cliente.correo}
              onChange={handleChange}
            />
            <TextField
              name="telefono"
              label="Teléfono"
              fullWidth
              value={cliente.telefono}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default EditModal;
