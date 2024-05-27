// import React, { useEffect, useState } from "react";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import { Box } from "@mui/material";
// import Header from "@/components/Header";
//
// interface Valoracion {
//   id?: number;
//   talla_en_cm: number;
//   talla_en_metros: number;
//   peso_en_kg: number;
//   diametro_humero: number;
//   diametro_femur: number;
// }
//
// const Valoracion: React.FC = () => {
//   const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
//   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
//   const [currentValoracionId, setCurrentValoracionId] = useState<number | null>(
//     null,
//   );
//
//   useEffect(() => {
//     const fetchValoraciones = (id: number) => {
//       axios
//         .get(`http://localhost:5000/valoracion/${id}`)
//         .then((response) => {
//           const data = response.data.valoraciones as Valoracion[];
//           setValoraciones(data);
//         })
//         .catch((error) => {
//           console.error("Error al obtener valoraciones:", error);
//         });
//     };
//   }, []);
//
//   const handleDelete = (id: number) => {
//     // Implementa la lógica para eliminar una valoración
//   };
//
//   const handleEdit = (id: number) => {
//     setCurrentValoracionId(id);
//     setOpenEditModal(true);
//   };
//
//   // const handleEditModalClose = () => {
//   //   setOpenEditModal(false);
//   //   setCurrentValoracionId(null);
//   // };
//
//   // Define las columnas para el DataGrid
//   const columns: GridColDef[] = [
//     // { field: "id", headerName: "ID", width: 90 },
//     { field: "talla_en_cm", headerName: "Talla (cm)", width: 150 },
//     { field: "talla_en_metros", headerName: "Talla (metros)", width: 150 },
//     { field: "peso_en_kg", headerName: "Peso (kg)", width: 100 },
//     { field: "diametro_humero", headerName: "Diámetro húmero", width: 100 },
//     { field: "diametro_femur", headerName: "Diámetro fémur", width: 100 },
//     {
//       field: "actions",
//       headerName: "Acciones",
//       sortable: false,
//       width: 150,
//       renderCell: (params: GridRenderCellParams) => (
//         <>
//           <IconButton onClick={() => handleEdit(params.id as number)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton onClick={() => params.id as number}>
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];
//
//   return (
//     <Box>
//       <Header title="Valoraciones de Cliente" subtitle="Lista"></Header>
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={valoraciones}
//           columns={columns}
//           getRowId={(row) => row.id}
//         />
//       </div>
//     </Box>
//   );
// };
//
// export default Valoracion;
//

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Box } from "@mui/material";
import Header from "@/components/Header";

interface Valoracion {
  id?: number;
  talla_en_cm: number;
  talla_en_metros: number;
  peso_en_kg: number;
  diametro_humero: number;
  diametro_femur: number;
}

const Valoracion: React.FC = () => {
  const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
  // const [setOpenEditModal] = useState<boolean>(false);
  // const [setCurrentValoracionId] = useState<number | null>(null);

  useEffect(() => {
    const fetchValoraciones = () => {
      axios
        // .get("http://localhost:5000/valoracion")
        .get("https://backend-jt8e.onrender.com/valoraciones/")
        .then((response) => {
          const data = response.data.valoraciones as Valoracion[];
          setValoraciones(data);
        })
        .catch((error) => {
          console.error("Error al obtener valoraciones:", error);
        });
    };

    fetchValoraciones();
  }, []);

  const handleDelete = (id: number) => {
    axios
      // .delete(`http://localhost:5000/valoracion/${id}`)
      .delete(`http://backend-jt8e.onrender.com/valoracion/${id}`)
      .then(() => {
        setValoraciones((prevValoraciones) =>
          prevValoraciones.filter((valoracion) => valoracion.id !== id),
        );
      })
      .catch((error) => {
        console.error("Error al eliminar valoración:", error);
      });
  };

  // const handleEdit = (id: number) => {
  //   setCurrentValoracionId(id);
  //   setOpenEditModal(true);
  // };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },
    { field: "talla_en_cm", headerName: "Talla (cm)", width: 150 },
    { field: "talla_en_metros", headerName: "Talla (metros)", width: 150 },
    { field: "peso_en_kg", headerName: "Peso (kg)", width: 100 },
    { field: "diametro_humero", headerName: "Diámetro húmero", width: 100 },
    { field: "diametro_femur", headerName: "Diámetro fémur", width: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {/* <IconButton onClick={() => handleEdit(params.id as number)}> */}
          {/*   <EditIcon /> */}
          {/* </IconButton> */}
          <IconButton onClick={() => handleDelete(params.id as number)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Header title="Valoraciones de Cliente" subtitle="Lista"></Header>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={valoraciones}
          columns={columns}
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
};

export default Valoracion;
