import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "@/components/Header";
import axios from "axios";

interface FormValues {
  nombre: string;
  apellido: string;
  dni: number;
  correo: string;
  telefono: number;
  contrasena: string;
  id_rol: number; // Nuevo campo para el rol
}

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      const response = await axios.post(
        "https://backend-jt8e.onrender.com/agregar/cliente/",
        values,
      );

      if (response.status === 201) {
        console.log("Cliente creado exitosamente");
      } else {
        console.error("Error al crear el cliente:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }

    setSubmitting(false);
  };

  return (
    <Box m="20px">
      <Header title="CREAR USUARIO" subtitle="Crear nuevo Usuario" />

      <Formik
        initialValues={{
          nombre: "",
          apellido: "",
          dni: "",
          correo: "",
          telefono: "",
          contrasena: "",
          id_rol: 2, // Valor predeterminado para el rol (2: usuario)
        }}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(5, minmax(0, 10fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="apellido"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.apellido}
                name="apellido"
                error={!!touched.apellido && !!errors.apellido}
                helperText={touched.apellido && errors.apellido}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="DNI"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dni}
                name="dni"
                error={!!touched.dni && !!errors.dni}
                helperText={touched.dni && errors.dni}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.correo}
                name="correo"
                error={!!touched.correo && !!errors.correo}
                helperText={touched.correo && errors.correo}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Celular"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefono}
                name="telefono"
                error={!!touched.telefono && !!errors.telefono}
                helperText={touched.telefono && errors.telefono}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contrasena}
                name="contrasena"
                error={!!touched.contrasena && !!errors.contrasena}
                helperText={touched.contrasena && errors.contrasena}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                select
                fullWidth
                variant="filled"
                label="Role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_rol}
                name="id_rol"
                error={!!touched.id_rol && !!errors.id_rol}
                helperText={touched.id_rol && errors.id_rol}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Usuario</MenuItem>
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validación del esquema
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const checkoutSchema = yup.object().shape({
  nombre: yup.string().required("required"),
  apellido: yup.string().required("required"),
  dni: yup.number().required("required"),
  correo: yup.string().email("invalid email").required("required"),
  telefono: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  contrasena: yup.string().required("contrasena").required("required"),
});

export default Form;
