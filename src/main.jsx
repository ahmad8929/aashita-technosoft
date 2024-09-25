// lib
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

// component
import App from './App.jsx'

// store
import { store } from './redux/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ChakraProvider>
          <App />
          <Toaster position='top-right' />
        </ChakraProvider>
      </Router>
    </Provider>
  </StrictMode>,
)
