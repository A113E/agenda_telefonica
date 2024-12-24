import axios from 'axios';
const baseUrl = '/api/persons';


// Función para obtener todas las notas desde el servidor.
const getAll = () => {
  // Realiza una solicitud GET a la URL base para obtener los datos.
  const request = axios.get(baseUrl)
  // Devuelve una promesa que extrae la propiedad `data` de la respuesta del servidor.
  return request.then(response => response.data)
}

// Función para crear una nueva nota en el servidor.
const create = newObject => {
  // Realiza una solicitud POST a la URL base, enviando el nuevo objeto como cuerpo de la solicitud.
  const request = axios.post(baseUrl, newObject)
  // Devuelve una promesa que extrae la propiedad `data` de la respuesta del servidor.
  return request.then(response => response.data)
}

// Función para actualizar una nota existente en el servidor.
const update = (id, newObject) => {
  // Realiza una solicitud PUT a una URL específica (`/api/notes/:id`), enviando el objeto actualizado como cuerpo.
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  // Devuelve una promesa que extrae la propiedad `data` de la respuesta del servidor.
  return request.then(response => response.data)
}

// Función para eliminar una nota existente en el servidor.
const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

export default { getAll, create, update, remove };
