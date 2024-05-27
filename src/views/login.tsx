import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setMensaje("");
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { correo, contrasena },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const { Mensaje, es_administrador } = response.data;
      setMensaje(Mensaje);

      // Limpiar el formulario al iniciar sesión correctamente
      setCorreo("");
      setContrasena("");

      // Determinar a qué página redirigir
      if (es_administrador) {
        navigate("/agregar/cliente");
      } else {
        navigate("/teams");
      }
    } catch (error: any) {
      if (error.response) {
        setMensaje(error.response.data.Error);
      } else {
        setMensaje("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="correo"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="contrasena"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Contraseña:
          </label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Iniciar Sesión
        </button>
      </form>
      {mensaje && <p style={{ color: "red", marginTop: "20px" }}>{mensaje}</p>}
    </div>
  );
};

export default Login;
