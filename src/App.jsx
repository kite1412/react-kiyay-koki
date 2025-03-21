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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ResetScroll from "./components/ResetScroll";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import { ABOUT_PATH, CART_PATH, COLLECTION_PATH, CONTACT_PATH, DETAIL_PATH, HOME_PATH, LOGIN_PATH, PROFILE_PATH, WISHLIST_PATH } from "./constants/paths";
import ProfilePage, { AddressForm } from "./pages/ProfilePage";
import AlertDialog from "./components/AlertDialog";
import { ModalProvider, ModalType, useModal } from "./contexts/ModalContext";
import AdminNavigationBar from "./components/AdminNavigationBar";
import { ADMIN_COLLECTION_PATH, ADMIN_CONTACT_DETAIL_PATH, ADMIN_CONTACTS_PATH, ADMIN_EDIT_PRODUCT_PATH } from "./constants/adminPaths";
import AdminCollectionPage from "./pages/admin/AdminCollectionPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminContactDetailPage from "./pages/admin/AdminContactDetailPage";

function App() {
  return (
    <Router>
      <ResetScroll />
      <AuthProvider>
        <ModalProvider>
          <ResolveContent />
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

function ResolveContent() {
  const { isAuthenticated } = useAuth();
  const [roleStatus, setRoleStatus] = useState(0);
  

  useEffect(() => {
    // for development purpose.
    setRoleStatus(localStorage.getItem("role") === "admin" ? 1 : -1);
  }, [isAuthenticated]);

  return (
    roleStatus === 1 ? <AdminContent /> : roleStatus === -1 ? <UserContent /> : <></>
  );
}

function UserContent() {
  const [scrollY, setScrollY] = useState(0);
  const [showNavBar, setShowNavBar] = useState(true);
  
  return (
    <div
      id="container"
      className={`
      text-white w-screen h-screen bg-[linear-gradient(30deg,_#000000_20%,_#0b5876_100%)]
        overflow-x-hidden relative
      `}
      onScroll={e => {
        const y = e.currentTarget.scrollTop;
        setShowNavBar(scrollY > y || scrollY === 0);
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

      <div className="flex justify-center h-full">
        <Routes>
          <Route 
            path={HOME_PATH}
            element={
              <>
                <div className="absolute">
                  <div className={`
                    absolute inset-0 bg-[linear-gradient(60deg,_rgba(0,0,0,0.85)_40%,_rgba(11,88,118,0.75)_100%)]
                  `} />
                  <img src={bg} className="inset-0 w-full max-lg:h-screen max-md:h-[200vh] object-cover select-none" />
                </div>
                <HomePage />
              </>
            } 
          />
          <Route
            path={LOGIN_PATH}
            element={
              <LoginPage />
            }
          />
          <Route 
            path={CONTACT_PATH}
            element={
              <ContactPage />
            } 
          />
          <Route 
            path={ABOUT_PATH}
            element={
              <AboutPage />
            } 
          />
          <Route 
            path={DETAIL_PATH}
            element={
              <DetailPage />
            }
          />
          <Route 
            path={COLLECTION_PATH}
            element={
              <CollectionPage />
            }
          />
          <Route 
            path={CART_PATH}
            element={
              <CartPage />
            }
          />
          <Route 
            path={WISHLIST_PATH}
            element={
              <WishlistPage />
            }
          />
          <Route 
            path={PROFILE_PATH}
            element={
              <ProfilePage />
            }
          />
        </Routes>
      </div>
      <Overlay />
    </div>
  );
}

function AdminContent() {
  return (
    <div className={`
      h-screen w-screen bg-soft-black grid grid-cols-[1fr_4fr]
      overflow-y-auto relative
    `}>
      <AdminNavigationBar />
      <Routes>
        <Route 
          index
          path={ADMIN_COLLECTION_PATH}
          element={<AdminCollectionPage />}          
        />
        <Route 
          path={ADMIN_EDIT_PRODUCT_PATH}
          element={<AdminEditProductPage />}
        />
        <Route 
          path={ADMIN_CONTACTS_PATH}
          element={<AdminContactsPage />}
        />
        <Route 
          path={ADMIN_CONTACT_DETAIL_PATH}
          element={<AdminContactDetailPage />}
        />
      </Routes>
      <Overlay />
    </div>
  );
}

function Overlay() {
  const { modalData } = useModal();
  const modalType = modalData.type;
  const params = modalData.params;
  const dismissStyle = {
    scale: 0,
    opacity: 0
  }

  return (
    <AnimatePresence>
      {
        modalType !== ModalType.NONE && <motion.div
          className={`
            z-200 h-screen w-screen fixed inset-0 bg-black/80 flex items-center justify-center
          `}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
        >
          <motion.div
            initial={dismissStyle}
            exit={dismissStyle}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.1
              }
            }}
            className="w-full h-full flex items-center justify-center"
          >
            {
              modalType === ModalType.ALERT_DIALOG ? <AlertDialog 
                title={params.title}
                desc={params.desc}
                cancelText={params.cancelText}
                confirmText={params.confirmText}
                onCancel={params.onCancel}
                onConfirm={params.onConfirm}
              /> : 
              modalType === ModalType.ADDRESS_FORM ? <AddressForm 
                address={params.address}
                onCancel={params.onCancel}
              /> :
              <></>
            }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  );
}