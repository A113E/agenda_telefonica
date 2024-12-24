// Importa la función defineConfig desde Vite, que se utiliza para definir la configuración del proyecto.
import { defineConfig } from 'vite'
// Importa el plugin de React para integrarlo con Vite.
import react from '@vitejs/plugin-react'

// Exporta la configuración del proyecto utilizando la función defineConfig.
// Esta es la configuración que Vite utilizará para compilar y servir el proyecto.
export default defineConfig({
  // Define los plugins que se utilizarán en el proyecto.
  plugins: [
    react() // Agrega soporte para React usando el plugin oficial de Vite.
  ],
  // Configuración del servidor de desarrollo.
  server: {
    // Configuración de un proxy para manejar solicitudes a la API.
    proxy: {
      // Redirige todas las solicitudes que comienzan con "/api".
      '/api': {
        // Define el destino del proxy. En este caso, las solicitudes se redirigen a "http://localhost:3001".
        target: 'http://localhost:3001',
        // Habilita el cambio del origen (origin) en las solicitudes proxied.
        // Esto puede ser necesario para evitar problemas de CORS (Cross-Origin Resource Sharing).
        changeOrigin: true,
      },
    }
  },
})

