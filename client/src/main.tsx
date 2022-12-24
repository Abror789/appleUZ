import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {persistor,store} from "./Redux/store";
import {Provider} from "react-redux";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
            <BrowserRouter>
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                    <App />
                    <ToastContainer/>
                </QueryParamProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
  </>
)

