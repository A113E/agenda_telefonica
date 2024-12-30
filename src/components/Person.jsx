const Person = ({ person, onDelete }) => (
    <li>
      {person.name} {person.phone}
      <button onClick={() => onDelete(person.id)}>delete</button>
    </li>
  );
  export default Person