import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';

const AppRouter = () => {
    const dataRouter = [
        {
            path: '*',
            component: <App />
        },
        {
            path: '/login',
            component: <Login />
        }
    ]
    return (
        <BrowserRouter>
            <Routes>
                {dataRouter.map((item, index) => {
                        return (
                            <Route key={index} path={item.path} element={item.component}></Route>
                        );
                })}
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;