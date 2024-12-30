const PersonForm = ({ newName, newPhone, onNameChange, onPhoneChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newPhone} onChange={onPhoneChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
  export default PersonForm