// Importar el useState de React
import React, { useState, useEffect } from 'react';
// Importar los servicios de numbers
import personsService from './services/numbers';
// Importar los componentes 
import SearchFilter from './components/SearchFilter';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonList';
import Notification from './components/Notification';


// Componente Principal
const App = () => {
  // Estados de la aplicación
  const [persons, setPersons] = useState([]); // Estado para la lista de personas registradas comienza con un valor vacío
  const [newName, setNewName] = useState(''); // Estado para agregar un nuevo nombre
  const [newNumber, setNewNumber] = useState(''); // Estado para agregar un nuevo número
  const [searchTerm, setSearchTerm] = useState(''); // Estado para buscar personas
  const [notification, setNotification] = useState({ message: '', type: '' }); // Estado para mostrar una notificación

  // Hook useEffect: se ejecuta una vez al cargar el componente para obtener todas las personas desde el servidor.
  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  // Función para mostrar un mensaje y que desaparazca a los 5 segundos
  const showNotification = (message, type) => {
    setNotification({message, type});
    setTimeout(() =>{
      setNotification({message:'', type:''});
    }, 5000);
  }

  // Manejadores de eventos
  const handleNameChange = (event) => setNewName(event.target.value); // Evento para agregar nuevo nombre
  const handleNumberChange = (event) => setNewNumber(event.target.value); // Evento para agregar nuevo número
  const handleSearchChange = (event) => setSearchTerm(event.target.value); // Evento para buscar personas
  const handleDelete = (id) => { // Evento para eliminar registro
    const personToDelete = persons.find(person => person.id === id); // Encuentra la persona dentro del array
    // Condición
    if(window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) { // Cartel de confirmación--Si confirma entonces
      personsService.remove(id) // Elimina el registro por el id
        .then(() => {
          setPersons(persons.filter(person => person.id !== id)); // Entonces reinicia el array con los cambios realizados
          showNotification(`Deleted ${personToDelete.name}`, 'success'); // Muestra un mensaje confirmando la eliminación
        })
        .catch(error => { // En caso de error muestra un mensaje
          console.error('Error deleting person:', error);
          showNotification('Error deleting person. Please try again.', 'error');
        });
    }
  };

  const addPerson = (event) => { // Función para agregar una nueva persona usando el evento
    event.preventDefault(); // Evita que el formulario recargue la página.
  
    const existingPerson = persons.find(person => person.name === newName); // Creamos una variable para personas ya registradas
  
    if (existingPerson) {
      // Si la persona ya existe, pedimos confirmación
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
  
      if (confirmUpdate) {
        // Creamos un nuevo objeto con el número actualizado
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        // Enviamos una solicitud PUT para actualizar el registro
        personsService // Servicio para actualizar el registro
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            // Actualizamos el estado local con el registro actualizado
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}`, 'success');
          })
          .catch(error => {
            console.error('Error updating person:', error);
            setErrorMessage(
              `Information of ${newName} has already been removed from the server`
            );
            // Eliminamos del estado local el registro que ya no está en el servidor
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          });
      }
    } else {
      // Si no existe, creamos un nuevo registro
      const personObject = {
        name: newName,
        number: newNumber,
      };
  
      // Enviamos una solicitud PUT para crear un nuevo registro
      personsService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showNotification(`Added ${returnedPerson.name}`, 'success');
      })
        .catch(error => {
          console.error('Error adding person:', error);
          showNotification('Error adding person. Please try again.', 'error');
        });
      }
    };
  
  // Funcion para mostrar la lista de personas
  const personsToShow = searchTerm ? persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())) : persons;




  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <SearchFilter searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <h2>Add a New</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow} onDelete={handleDelete}/>
    </div>
  );
}

export default App;


