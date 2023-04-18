import { combineReducers } from 'redux';
import { authSlice } from './Slices/secSlice';
import { EmpresasApi } from './services/HomeServicesRTK'
import { FodaApi } from './services/FodaServicesRtk'
import { LoginApi } from './services/SignServicesRtk'; 


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    EmpresasApi: EmpresasApi.reducer,
    FodaApi: FodaApi.reducer,
    LoginApi: LoginApi.reducer,
});

export default rootReducer;
