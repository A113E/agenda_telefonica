const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
  export default PersonForm