import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ConfirmContainer } from 'react-confirm-manager';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <ConfirmContainer animation='rotateRight'/>
  </>,
)