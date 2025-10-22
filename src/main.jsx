import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Global } from './global.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Global>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Global>
  </BrowserRouter>
)
