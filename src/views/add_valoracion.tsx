import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import Header from "@/components/Header";
import { useParams } from "react-router-dom";
// import { useState } from "react";

// Configuración de Axios
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://backend-jt8e.onrender.com";

// Esquema de validación con Yup
const validationSchema = yup.object().shape({
  // fecha: yup.number().required("La fecha en cm es requerida"),
  talla_cm: yup.number().required("La talla en cm es requerida"),
  talla_mts: yup.number().required("La talla en metros es requerida"),
  peso_kg: yup.number().required("El peso en kg es requerido"),
  diametro_humero: yup.number().required("El diámetro del húmero es requerido"),
  diametro_femur: yup.number().required("El diámetro del fémur es requerido"),
  tricipital: yup.number().required("El pliegue tricipital es requerido"),
  subescapular: yup.number().required("El pliegue subescapular es requerido"),
  suprailiaco: yup.number().required("El pliegue suprailiaco es requerido"),
  abdominal: yup.number().required("El pliegue abdominal es requerido"),
  muslo_medial: yup.number().required("El pliegue del muslo es requerido"),
  pierna: yup.number().required("El pliegue de la pierna es requerido"),
  v_cuello: yup.number().required("La volumetría del cuello es requerida"),
  v_hombro: yup.number().required("La volumetría de los hombros es requerida"),
  v_torax: yup.number().required("La volumetría del tórax es requerida"),
  v_abdomen: yup.number().required("La volumetría del abdomen es requerida"),
  v_bitrocanterico: yup
    .number()
    .required("La volumetría de las caderas es requerida"),
  v_muslo_medial: yup.number().required("La volumetría del muslo es requerida"),
  v_pierna: yup.number().required("La volumetría de la pierna es requerida"),
  v_brazo_contraido: yup
    .number()
    .required("La volumetría del brazo contraído es requerida"),
});

const AddValoracion: React.FC = () => {
  const { idCliente } = useParams<{ idCliente: string }>();

  // const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const valoracionResponse = await axios.post(
        `/valoracion/add/${idCliente}`,
        values,
      );
      const volumetriaResponse = await axios.post(
        `/volumetria/add/${idCliente}`,
        values,
      );
      const plieguesResponse = await axios.post(
        `/pliegues/add/${idCliente}`,
        values,
      );

      if (
        valoracionResponse.status === 201 &&
        volumetriaResponse.status === 201 &&
        plieguesResponse.status === 201
      ) {
        console.log("Mediciones creadas exitosamente");
      } else {
        console.error("Error al crear las mediciones:", {
          valoracion: valoracionResponse.data?.mensaje,
          volumetria: volumetriaResponse.data?.mensaje,
          pliegues: plieguesResponse.data?.mensaje,
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header title="CREAR VALORACIÓN CLIENTE" subtitle="" />
      <Formik
        initialValues={{
          // fecha: "",
          talla_cm: "",
          talla_mts: "",
          peso_kg: "",
          diametro_humero: "",
          diametro_femur: "",
          tricipital: "",
          subescapular: "",
          suprailiaco: "",
          abdominal: "",
          muslo_medial: "",
          pierna: "",
          v_cuello: "",
          v_hombro: "",
          v_torax: "",
          v_abdomen: "",
          v_bitrocanterico: "",
          v_muslo_medial: "",
          v_pierna: "",
          v_brazo_contraido: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mb="20px">
              <Typography variant="h3" gutterBottom color="#4cceac">
                Datos Básicos
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap="10px"
              >
                {/* <Box width="calc(50% - 10px)"> */}
                {/*   <DatePicker */}
                {/*     label="Selecciona una fecha" */}
                {/*     value={selectedDate} */}
                {/*     onChange={handleDateChange} */}
                {/*     renderInput={(params: TextFieldProps) => ( */}
                {/*       <TextField {...params} name="fecha" /> */}
                {/*     )} */}
                {/*   /> */}
                {/*   <ErrorMessage name="fecha" component="div" /> */}
                {/* </Box> */}

                {/* <Box width="calc(50% - 10px)"> */}
                {/*   <Field */}
                {/*     as={TextField} */}
                {/*     fullWidth */}
                {/*     variant="filled" */}
                {/*     type="number" */}
                {/*     label="Fecha" */}
                {/*     name="fecha" */}
                {/*   /> */}
                {/*   <DatePicker */}
                {/*     selected={startDate} */}
                {/*     onChange={(date) => setStartDate(date)} */}
                {/*   /> */}
                {/*   <ErrorMessage name="talla_cm" component="div" /> */}
                {/* </Box> */}

                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Talla en cm"
                    name="talla_cm"
                  />
                  <ErrorMessage name="talla_cm" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Talla en metros"
                    name="talla_mts"
                  />
                  <ErrorMessage name="talla_mts" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Peso en kg"
                    name="peso_kg"
                  />
                  <ErrorMessage name="peso_kg" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Diámetro del húmero"
                    name="diametro_humero"
                  />
                  <ErrorMessage name="diametro_humero" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Diámetro del fémur"
                    name="diametro_femur"
                  />
                  <ErrorMessage name="diametro_femur" component="div" />
                </Box>
              </Box>
            </Box>

            <Box mb="20px">
              <Typography variant="h3" gutterBottom color="#4cceac">
                Volumetría
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap="10px"
              >
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen Cuello"
                    name="v_cuello"
                  />
                  <ErrorMessage name="v_cuello" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen Hombros"
                    name="v_hombro"
                  />
                  <ErrorMessage name="v_hombro" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen del Tórax"
                    name="v_torax"
                  />
                  <ErrorMessage name="v_torax" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen del Abdomen"
                    name="v_abdomen"
                  />
                  <ErrorMessage name="v_abdomen" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen de Caderas"
                    name="v_bitrocanterico"
                  />
                  <ErrorMessage name="v_bitrocanterico" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen del Muslo"
                    name="v_muslo_medial"
                  />
                  <ErrorMessage name="v_muslo_medial" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen de la Pierna"
                    name="v_pierna"
                  />
                  <ErrorMessage name="v_pierna" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Volumen del Brazo Contraído"
                    name="v_brazo_contraido"
                  />
                  <ErrorMessage name="v_brazo_contraido" component="div" />
                </Box>
              </Box>
            </Box>

            <Box mb="20px">
              <Typography variant="h3" gutterBottom color="#4cceac">
                Pliegues
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                gap="10px"
              >
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Pliegue Tricipital"
                    name="tricipital"
                  />
                  <ErrorMessage name="tricipital" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Pliegue Subescapular"
                    name="subescapular"
                  />
                  <ErrorMessage name="subescapular" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Pliegue Suprailiaco"
                    name="suprailiaco"
                  />
                  <ErrorMessage name="suprailiaco" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Pliegue Abdominal"
                    name="abdominal"
                  />
                  <ErrorMessage name="abdominal" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Pliegue del Muslo"
                    name="muslo_medial"
                  />
                  <ErrorMessage name="muslo_medial" component="div" />
                </Box>
                <Box width="calc(50% - 10px)">
                  <Field
                    as={TextField}
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Pliegue de la Pierna"
                    name="pierna"
                  />
                  <ErrorMessage name="pierna" component="div" />
                </Box>
              </Box>
            </Box>

            <Box display="flex" justifyContent="end">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear Nueva Valoración"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddValoracion;
