import { combineReducers } from 'redux'

import { persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import { authReducer, dashboardReducer, userReducer, workspaceSharingReducer } from '@/store/slices'

const commonConfig = {
  storage
}

const authPersistConfig = {
  ...commonConfig,
  key: 'authData',
  whitelist: ['isLoggedIn']
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  dashboard: dashboardReducer,
  workspaceSharing: workspaceSharingReducer
})

export default rootReducer
