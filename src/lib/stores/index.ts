import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './rootReducer'
import { rootSaga } from './rootSaga'
import { initializeAuth } from '@/features/authentication/stores/auth.saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  devTools: import.meta.env.DEV,
})

sagaMiddleware.run(rootSaga)

store.dispatch(initializeAuth())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch