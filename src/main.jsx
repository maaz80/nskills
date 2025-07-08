import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Providers from './context/provider.jsx'
import { ToastProvider } from './components/customtoast/CustomToast.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <StrictMode> */}
  <ToastProvider>
  <Providers>
    <App />
    </Providers>
    </ToastProvider>
  {/* </StrictMode> */}
  </BrowserRouter>,
)
