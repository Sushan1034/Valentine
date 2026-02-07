import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ValentineProvider } from './context/ValentineContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ValentineProvider>
            <App />
        </ValentineProvider>
    </React.StrictMode>,
)
