
import Footer from "../src/components/Widgets/Footer"; 
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Widgets/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Login from "./pages/Login";

const App = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1, overflowY: 'auto' }}> 
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<About />} />
                    <Route path="/" element={<Faqs />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default App;





