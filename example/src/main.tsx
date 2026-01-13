import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfirmContainer } from '../../dist/index'
createRoot(document.getElementById('root')!).render(
  <>
    <App />
    {/* <ConfirmContainer/> */}
  </>,
)
