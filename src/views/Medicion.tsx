import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MedidasAntropometricas: React.FC = () => {
  const { idCliente } = useParams<{ idCliente: string }>();
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/pliegues/add/${idCliente}`,
        values,
      );
      if (response.status == 201) {
        console.log("valoracion creada exitosamente");
      } else {
        console.log("Error al incluir la:", response.data.mensaje);
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
    setSubmitting(false);
  };
};

export default MedidasAntropometricas;
