import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { EmpresasApi } from './services/HomeServicesRTK';
import { FodaApi } from './services/FodaServicesRtk';
import { LoginApi } from './services/SignServicesRtk';

const reloadState = JSON.parse(localStorage.getItem("Reduxkey") || "{}");

const store = configureStore(
    {
        reducer: rootReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(FodaApi.middleware, EmpresasApi.middleware, LoginApi.middleware),
        preloadedState: reloadState
    });

store.subscribe(() => {
    const { auth } = store.getState();
    localStorage.setItem("Reduxkey", JSON.stringify({ auth }));
});

setupListeners(store.dispatch);

export default store;


