const Notification = ({ message, type }) => {
    if (!message) return null;
  
    const notificationStyle = {
      color: type === 'success' ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: '20px',
      border: `1px solid ${type === 'success' ? 'green' : 'red'}`,
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    };
  
    return <div style={notificationStyle}>{message}</div>;
  };
  
  export default Notification;