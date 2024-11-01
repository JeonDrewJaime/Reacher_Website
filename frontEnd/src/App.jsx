import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Widgets/Navbar";
import Footer from "./components/Widgets/Footer";
import Schedule from "./pages/Teacher/Schedule";
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Login from "./pages/Login";
import Dashboard from "./pages/Teacher/Dashboard"; // Import your components
import "./general.css";

const App = () => {
    const location = useLocation();

    // Check if the current path includes '/dashboard'
    const isDashboardPage = location.pathname.includes('/dashboard');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<About />} />
                    <Route path="/" element={<Faqs />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard/*" element={<Dashboard />} /> 
                </Routes>
            </div>
            {/* Conditionally set footer color to var(--pri) when on dashboard */}
            <Footer style={{ backgroundColor: isDashboardPage ? 'var(--pri)' : 'var(--footer-bg)' }} /> 
        </div>
    );
};

export default App;










