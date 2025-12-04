import { all, fork } from 'redux-saga/effects'
import { watchAuth } from '@/features/authentication/stores/auth.saga'
import { watchDashboard } from '@/features/dashboard/stores/dashboard.saga'

export function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchDashboard),
  ])
}