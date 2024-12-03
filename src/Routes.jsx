import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import Layout from './Layout.jsx';
import RegisterForm from "./components/Register.jsx";
import Contact from "./features/SOSAlerts/Contact/contact.jsx";
import SendAlerts from "./features/SOSAlerts/SendAlerts/sendAlerts.jsx";
import Dashboard from "./features/Dashboard/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
console.log('Routes.jsx');

// Lazy load components
const App = lazy(() => import('./App.jsx'));
const ErrorPage = lazy(() => import('./components/ErrorPage.jsx'));
const Login = lazy(() => import("./components/Login.jsx"));


// Create routes
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/contact" element={<Contact /> }/>
            <Route path="/sos-alert" element={<SendAlerts /> }/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
        </Route>

    )
);

// Render the app with Suspense
ReactDOM.createRoot(document.getElementById('root')).render(
    <Suspense fallback={<div className="loading"> <img src="/loading.svg" alt="loading..." /> </div>}>
        <RouterProvider router={router} />
    </Suspense>
);
