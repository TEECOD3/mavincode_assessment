import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DashboardData, CreateDashboardItemRequest, UpdateDashboardItemRequest, DashboardFilters } from '@/features/dashboard/types/dashboard.types';
import { dashboardUseCase } from '@/features/dashboard/services/dashboard.usecase';
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  createItemStart,
  createItemSuccess,
  createItemFailure,
  updateItemStart,
  updateItemSuccess,
  updateItemFailure,
  deleteItemStart,
  deleteItemSuccess,
  deleteItemFailure,
} from '@/features/dashboard/stores/dashboard.slice';

export const FETCH_DASHBOARD_DATA = 'dashboard/fetchDashboardData';
export const CREATE_DASHBOARD_ITEM = 'dashboard/createDashboardItem';
export const UPDATE_DASHBOARD_ITEM = 'dashboard/updateDashboardItem';
export const DELETE_DASHBOARD_ITEM = 'dashboard/deleteDashboardItem';
export const FILTER_DASHBOARD_DATA = 'dashboard/filterDashboardData';

export const fetchDashboardData = () => ({
  type: FETCH_DASHBOARD_DATA,
});

export const createDashboardItem = (data: CreateDashboardItemRequest, createdBy: string) => ({
  type: CREATE_DASHBOARD_ITEM,
  payload: { data, createdBy },
});

export const updateDashboardItem = (id: string, data: UpdateDashboardItemRequest) => ({
  type: UPDATE_DASHBOARD_ITEM,
  payload: { id, data },
});

export const deleteDashboardItem = (id: string) => ({
  type: DELETE_DASHBOARD_ITEM,
  payload: { id },
});

export const filterDashboardData = (filters: DashboardFilters) => ({
  type: FILTER_DASHBOARD_DATA,
  payload: { filters },
});

function* fetchDashboardDataSaga(): Generator<any, void, any> {
  try {
    yield put(fetchDataStart());
    
    const result = yield call(() => Promise.all([
      dashboardUseCase.getDashboardData(),
      dashboardUseCase.getDashboardMetrics(),
      dashboardUseCase.getChartData(),
      dashboardUseCase.getActivities(),
    ]));

    const [items, metrics, charts, activities] = result as [any, any, any, any];
    yield put(fetchDataSuccess({ items, metrics, charts, activities }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch dashboard data';
    yield put(fetchDataFailure(message));
  }
}

function* createDashboardItemSaga(action: PayloadAction<{ data: CreateDashboardItemRequest; createdBy: string }>): Generator<any, void, any> {
  try {
    yield put(createItemStart());
    const { data, createdBy } = action.payload;
    const newItem = yield call(dashboardUseCase.createDashboardItem.bind(dashboardUseCase), data, createdBy);
    yield put(createItemSuccess(newItem as DashboardData));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create dashboard item';
    yield put(createItemFailure(message));
  }
}

function* updateDashboardItemSaga(action: PayloadAction<{ id: string; data: UpdateDashboardItemRequest }>): Generator<any, void, any> {
  try {
    yield put(updateItemStart());
    const { id, data } = action.payload;
    const updatedItem = yield call(dashboardUseCase.updateDashboardItem.bind(dashboardUseCase), id, data);
    yield put(updateItemSuccess(updatedItem as DashboardData));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update dashboard item';
    yield put(updateItemFailure(message));
  }
}

function* deleteDashboardItemSaga(action: PayloadAction<{ id: string }>): Generator<any, void, any> {
  try {
    yield put(deleteItemStart());
    const { id } = action.payload;
    yield call(dashboardUseCase.deleteDashboardItem.bind(dashboardUseCase), id);
    yield put(deleteItemSuccess(id));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete dashboard item';
    yield put(deleteItemFailure(message));
  }
}

function* filterDashboardDataSaga(action: PayloadAction<{ filters: DashboardFilters }>): Generator<any, void, any> {
  try {
    yield put(fetchDataStart());
    const { filters } = action.payload;
    const filteredItems = yield call(dashboardUseCase.filterDashboardData.bind(dashboardUseCase), filters);
    
    const result = yield call(() => Promise.all([
      dashboardUseCase.getDashboardMetrics(),
      dashboardUseCase.getChartData(),
      dashboardUseCase.getActivities(),
    ]));

    const [metrics, charts, activities] = result as [any, any, any];
    yield put(fetchDataSuccess({ items: filteredItems as DashboardData[], metrics, charts, activities }));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to filter dashboard data';
    yield put(fetchDataFailure(message));
  }
}

export function* watchDashboard() {
  yield takeLatest(FETCH_DASHBOARD_DATA, fetchDashboardDataSaga);
  yield takeEvery(CREATE_DASHBOARD_ITEM, createDashboardItemSaga);
  yield takeEvery(UPDATE_DASHBOARD_ITEM, updateDashboardItemSaga);
  yield takeEvery(DELETE_DASHBOARD_ITEM, deleteDashboardItemSaga);
  yield takeLatest(FILTER_DASHBOARD_DATA, filterDashboardDataSaga);
}

export default watchDashboard;