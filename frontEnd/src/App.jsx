import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Widgets/Navbar";
import Footer from "./components/Widgets/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Login from "./pages/Login";
import Dashboard from "./pages/Teacher/Dashboard"; // Import your components


const App = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faqs" element={<Faqs />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard/*" element={<Dashboard />} /> {/* Wildcard for Dashboard */}
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;









