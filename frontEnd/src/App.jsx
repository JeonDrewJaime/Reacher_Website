import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Widgets/Navbar";
import Footer from "./components/Widgets/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Login from "./pages/Login";
import Dashboard from "./pages/Teacher/Dashboard"; 
import { testRealtimeDatabase } from "../../backEnd/tests/testDatabaseConnection";
import "./general.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Call the test function when the component mounts
    testRealtimeDatabase();
  }, []);
  
  const location = useLocation();
  const isDashboardPage = location.pathname.includes('/dashboard');

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} /> 
          </Routes>
        </div>
        <Footer style={{ backgroundColor: isDashboardPage ? 'var(--pri)' : 'var(--footer-bg)' }} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
