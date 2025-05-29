import axios from "axios";
import Swal from "sweetalert2";

// Cargar la URL del backend desde el entorno
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Función para mostrar mensajes de error
const ToastError = (title, message) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
  });
};

// Función para mostrar mensajes de advertencia
const ToastWarning = (title, message) => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: message,
  });
};

// Interceptores de solicitud
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptores de respuesta
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status !== 500) {
      ToastError("Vaya...", "Algo salió mal. Por favor, inténtalo más tarde.");
    }

    if (error.response && error.response.status === 400) {
      console.error("Bad Request:", error.response);
      const errorData = error.response.data;
      const firstKey = Object.keys(errorData)[0];
      const firstValue = errorData[firstKey];

      ToastWarning("¡Ups!", firstValue);
    }

    return Promise.reject(error);
  }
);

export default {
  async doDelete(url, data) {
    return await axios.delete(url, { data });
  },
  async doPost(url, data) {
    return await axios.post(url, data);
  },
  async doGet(url) {
    return await axios.get(url);
  },
  async doPut(url, data) {
    return await axios.put(url, data);
  },
  async doPostFile(url, data) {
    return await axios.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async doPutFile(url, data) {
    return await axios.put(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};