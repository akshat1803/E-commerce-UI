// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Products from './Pages/Products'; // Adjust the import as necessary
import Cart from './Pages/Cart'; // Adjust the import as necessary
import Home from './Pages/Home'; // Adjust the import as necessary
import LoginRegister from './Pages/Register'; // Adjust the import as necessary

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // App is the main component wrapping everything
        children: [
            {
                index: true, // Render Home when the path is exactly '/'
                element: <Home />,
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'cart',
                element: <Cart />,
            },
            {
                path: 'login',
                element: <LoginRegister />, // The login/register component
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
