import { confirm, ConfirmContainer } from 'react-confirm-lite'
import './App.css'

export default function App() {
  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete item',
      message: 'This action cannot be undone. Continue?',
      okText: 'Delete',
      cancelText: 'Cancel'
    })

    if (!confirmed) {
      console.log('User cancelled')
      return
    }

    const doubleCheck = await confirm({
      title: 'Final confirmation',
      message: 'Are you absolutely sure?',
      okText: 'Yes, delete it',
      cancelText: 'Go back'
    })

    console.log('Final decision:', doubleCheck)
  }

  return (
    <div className="app">
      <h1>react-confirm-lite</h1>
      <p>Example usage</p>

      <button className="danger" onClick={handleDelete}>
        Delete item
      </button>

      <ConfirmContainer animation="flip"/>
    </div>
  )
}
