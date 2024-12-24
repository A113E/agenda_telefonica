import Person from './Person'
const PersonsList = ({ persons, onDelete }) => (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} onDelete={onDelete} />
      ))}
    </div>
  );
  export default PersonsList