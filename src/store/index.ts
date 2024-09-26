import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import rootReducer from './reducer/root.reducer'

const reduxStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
        }
      })
  })

  const persistor = persistStore(store)

  return { store, persistor }
}

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = ReturnType<typeof reduxStore>['store']['dispatch']
export default reduxStore
