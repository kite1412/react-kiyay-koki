import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import bg from "./assets/landing-page-bg.png";
import DetailPage from "./pages/DetailPage";
import CollectionPage from "./pages/CollectionPage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider } from "./contexts/AuthContext";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);

  return (
    <Router>
      <AuthProvider 
        children={
          <div
            className={`
            text-white w-screen h-screen bg-gradient-to-tr from-black to-dark-teal-blue
              overflow-x-hidden relative
            `}
            onScroll={e => {
              const y = e.currentTarget.scrollTop;
              setShowNavBar(scrollY > y);
              setScrollY(y);
            }}
          >
            <Header className="sticky top-0 z-100" />
            {/* 40px comes from Header's height */}
            <AnimatePresence>
              {
                showNavBar && <motion.div
                  className={`
                    max-lg:w-full max-lg:px-6 lg:w-3/4 fixed z-100 left-1/2 transform -translate-x-1/2 
                    top-[calc(40px*3)]
                  `}
                  initial={{ y: -100, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <NavigationBar />
                </motion.div>
              }
            </AnimatePresence>

            <div className="flex justify-center">
              <Routes>
                <Route 
                  path="/"
                  element={
                    <>
                      <div className="absolute">
                        <div className={`
                          absolute inset-0 bg-gradient-to-tr from-[rgb(40,40,40)] to-dark-teal-blue
                          mix-blend-multiply
                        `} />
                        <img src={bg} className="inset-0 w-full max-lg:h-screen max-md:h-[200vh] object-cover" />
                      </div>
                      <HomePage />
                    </>
                  } 
                />
                <Route
                  path="/login"
                  element={
                    <LoginPage />
                  }
                />
                <Route 
                  path="/kontak"
                  element={
                    <ContactPage />
                  } 
                />

                <Route 
                  path="/tentang"
                  element={
                    <AboutPage />
                  } 
                />

                <Route 
                  path="/detail/:type/:id"
                  element={
                    <DetailPage />
                  }
                />
                <Route 
                  path="/koleksi"
                  element={
                    <CollectionPage />
                  }
                />
                <Route   />
              </Routes>
            </div>
          </div>
        }
      />
    </Router>
  );
}

export default App;
