import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <div
        className={`
        text-white w-screen h-screen bg-gradient-to-tr from-black to-dark-teal-blue
        overflow-x-hidden relative
        `}>
        <Header className="sticky top-0 z-1" />
        {/* 40px comes from Header's height */}
        <div
          className={`
            w-3/4 fixed z-1 left-1/2 transform -translate-x-1/2 top-[calc(40px*3)]
          `}
        >
          <NavigationBar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
