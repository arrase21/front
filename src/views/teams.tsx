import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import EditModal from "./EditModal";
import { Box } from "@mui/material";
import Header from "@/components/Header";
import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Define el tipo para el cliente
interface Cliente {
  id_cliente: number;
  nombre: string;
  apellido: string;
  dni: number;
  correo: string;
  telefono: number;
  contrasena: string;
}

const ClientesGrid: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [currentClienteId, setCurrentClienteId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(
          "https://backend-jt8e.onrender.com/clientes/",
          // "http://localhost:5000/clientes/",
        );
        const data = response.data.Clientes.map((cliente: Cliente) => ({
          ...cliente,
          id_cliente: cliente.id_cliente,
        }));
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    axios
      .delete(`https://backend-jt8e.onrender.com/eliminar/cliente/${id}/`)
      // .delete(`http://localhost:5000/eliminarcliente/${id}`)
      .then(() => {
        setClientes((prev) =>
          prev.filter((cliente) => cliente.id_cliente !== id),
        );
      })
      .catch((error) => {
        console.error("Error al eliminar cliente:", error);
      });
  };

  const handleEdit = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    setCurrentClienteId(id);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setCurrentClienteId(null);
  };

  const handleClienteUpdated = () => {
    axios
      .get("https://backend-jt8e.onrender.com/cliente/")
      // .get("http://localhost:5000/clientes/")
      .then((response) => {
        const data = response.data.Clientes as Cliente[];
        setClientes(data);
      })
      .catch((error) => {
        console.error("Error al obtener clientes:", error);
      });
  };

  const handlePromoteCliente = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    axios
      .patch(`https://backend-jt8e.onrender.com/cliente/promover_admin/${id}`)
      .then(() => {
        handleClienteUpdated();
      })
      .catch((error) => {
        console.error("Error al promover cliente:", error);
      });
  };

  const handleDemoteCliente = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    axios
      .patch(`https://backend-jt8e.onrender.com/cliente/promover_user/${id}`)
      .then(() => {
        handleClienteUpdated();
      })
      .catch((error) => {
        console.error("Error al degradar cliente:", error);
      });
  };

  const columns: GridColDef[] = [
    { field: "id_cliente", headerName: "ID", width: 90 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "dni", headerName: "Dni", width: 100 },
    { field: "correo", headerName: "Correo", width: 100 },
    { field: "telefono", headerName: "Teléfono", width: 90 },
    { field: "contrasena", headerName: "Contraseña", width: 90 },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton
              onClick={(event) => handleEdit(event, params.id as number)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(event) => handleDelete(event, params.id as number)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={(event) =>
                handlePromoteCliente(event, params.id as number)
              }
            >
              <ArrowCircleUp />
            </IconButton>
            <IconButton
              onClick={(event) =>
                handleDemoteCliente(event, params.id as number)
              }
            >
              <ArrowCircleDown />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    navigate(`/agregar/valoracion/${params.id}`);
  };

  return (
    <Box>
      <Header title="Manejador De Clientes" subtitle=""></Header>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={clientes}
          columns={columns}
          checkboxSelection
          getRowId={(row) => row.id_cliente}
          onRowClick={handleRowClick}
        />
        <EditModal
          open={openEditModal}
          onClose={handleEditModalClose}
          clienteId={currentClienteId}
          onClienteUpdated={handleClienteUpdated}
        />
      </div>
    </Box>
  );
};

export default ClientesGrid;
