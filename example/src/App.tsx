import { confirm } from 'react-confirm-manager';
import './App.css'

function App() {

  const handleConfirm = async () => {
    const result = await confirm({ message: 'Are you sure?', okText: 'Yes', cancelText: 'No' });
    console.log(result);
  }

  return (
    <div className="App" style={{ height: '20000px' }}>
      <h1>React Confirm Manager</h1>
      <p>Click the buttons below to see the confirm dialogs in action.</p>
      <div className="button-container">
        <button onClick={handleConfirm}>Show Confirm</button>
      </div>
      <button onClick={handleConfirm} style={{ marginTop: '1000px' }}>Show Confirm</button>
    </div>
  )
}

export default App