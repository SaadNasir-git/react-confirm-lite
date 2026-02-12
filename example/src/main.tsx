import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { showClosest } from '../../dist/index'

showClosest()

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    {/* <ConfirmContainer/> */}
  </>,
)
