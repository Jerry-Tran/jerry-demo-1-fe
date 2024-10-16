import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import reduxStore from '@/store'

import App from './App.tsx'

import './sentry.ts'

import './index.css'

const { store, persistor } = reduxStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
