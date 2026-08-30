import { confirm } from 'react-confirm-manager';
import './App.css'

function App() {

  const handleConfirm = async () => {
    const result = await confirm({ message: 'Are you sure?', okText: 'Yes', cancelText: 'No' });
    console.log(result);
  }

  return (
    <div>
      <button onClick={handleConfirm}>Show Confirm</button>
      <div style={{height:"200px", width: "100%", backgroundColor:"grey"}}>

      </div>
    </div>
  )
}

export default App