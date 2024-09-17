import { configureStore } from '@reduxjs/toolkit'

import { persistStore } from 'redux-persist'

import { thunk } from 'redux-thunk'

import rootReducer from './reducer/root.reducer'

const reduxStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }).concat(thunk)
  })
  const persistor = persistStore(store)
  return { store, persistor }
}

export default reduxStore
