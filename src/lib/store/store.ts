import {configureStore} from '@reduxjs/toolkit'
import tabSlice from './features/tab/tabSlice';
import loginApiReducer from './thunk/loginActionCreatorThunk';
import cookieCheckApiReducer from './thunk/cookieCheckActionCreatorThunk';
import logoutApiReducer from './thunk/LogoutActionCreatorThunk';
import getUserDataApiReducer from './thunk/GetUserDataActionCreatorThunk';
import addUserApiReducer from './thunk/addUserActionCreatorThunk';
import getUserByRoleApiReducer from './thunk/getByRoleUserActionCreatorThunk';
import globalSearchUserApiReducer from './thunk/GlobalSearchUserActionCreatorThunk';
import getUserByColumnFilterApiReducer from './thunk/GetUesrByColumnFilterActionCreatorThunk';
import approvalNotificationApiReducer from './thunk/approvalNotificationActionCreatorThunk';
import acceptSalaryApprovalApiReducer from './thunk/acceptSalaryApprovalActionCreatorThunk';
import rejectSalaryApiReducer from './thunk/rejectSalaryActionCreatorThunk';
import getUserByRoleSalaryApiReducer from './thunk/GetUserByRoleSalaryActionCreatorThunk';
import updateSalaryTempApiReducer from './thunk/UpdateSalaryActionCreatorThunk';

export const makeStore = () => {
  return configureStore({
    reducer: { 
      tab: tabSlice,
      loginApiReducer: loginApiReducer,
      cookieCheckApiReducer: cookieCheckApiReducer,
      logoutApiReducer:logoutApiReducer,
      getUserDataApiReducer:getUserDataApiReducer,
      addUserApiReducer:addUserApiReducer,
      getUserByRoleApiReducer:getUserByRoleApiReducer,
      globalSearchUserApiReducer:globalSearchUserApiReducer,
      getUserByColumnFilterApiReducer:getUserByColumnFilterApiReducer,
      approvalNotificationApiReducer:approvalNotificationApiReducer,
      acceptSalaryApprovalApiReducer:acceptSalaryApprovalApiReducer,
      rejectSalaryApiReducer:rejectSalaryApiReducer,
      getUserByRoleSalaryApiReducer:getUserByRoleSalaryApiReducer,
      updateSalaryTempApiReducer:updateSalaryTempApiReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']