import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import appRouter from 'navigation/app.router'
import './styles/sanitize.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={appRouter}/>
  </StrictMode>,
)
