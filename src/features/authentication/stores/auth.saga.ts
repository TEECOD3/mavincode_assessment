import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/features/authentication/types/auth.types';
import { authUseCase } from '@/features/authentication/services/auth.usecase';
import { loginStart, loginSuccess, loginFailure, logout, setUser, initializeStart, initializeComplete } from '@/features/authentication/stores/auth.slice';

export const LOGIN_REQUEST = 'auth/loginRequest';
export const LOGOUT_REQUEST = 'auth/logoutRequest';
export const INITIALIZE_AUTH = 'auth/initializeAuth';

export const loginRequest = (credentials: { email: string; password: string }) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const initializeAuth = () => ({
  type: INITIALIZE_AUTH,
});

function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    yield put(loginStart());
    const { email, password } = action.payload;
    const result: { user: User; token: string } = yield call(authUseCase.login.bind(authUseCase), email, password);
    yield put(loginSuccess(result));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    yield put(loginFailure(message));
  }
}

function* logoutSaga() {
  try {
    yield call(authUseCase.logout.bind(authUseCase));
    yield put(logout());
  } catch {
    yield put(logout());
  }
}

function* initializeAuthSaga() {
  try {
    yield put(initializeStart());
    const user: User | null = yield call(authUseCase.initializeAuth.bind(authUseCase));
    if (user) {
      yield put(setUser(user));
    } else {
      yield put(initializeComplete());
    }
  } catch (error) {
    console.error('Auth initialization error:', error);
    yield put(initializeComplete());
  }
}

export function* watchAuth() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(INITIALIZE_AUTH, initializeAuthSaga);
}

export default watchAuth;