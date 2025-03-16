import { useLocation, useNavigate } from "react-router-dom";
import Search from "../assets/search.svg?react";
import RoundedButton from "./RoundedButton";
import AppLogo from "./AppLogo";
import useScreenWidth from "../hooks/useScreenWidth";
import { minLgPx, minMdPx } from "../constants/breakpoints";
import SignIn from "../assets/sign-in.svg?react";
import { useAuth } from "../contexts/AuthContext";
import ShoppingCart from "../assets/shopping-cart.svg?react";
import Love from "../assets/love.svg?react";
import User from "../assets/user.svg?react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const screenWidth = useScreenWidth();
  const isSm = screenWidth < minMdPx;
  const { isAuthenticated } = useAuth();
  const icon = "hover:cursor-pointer hover:text-primary";

  const routes = [
    { name: "Beranda", path: "/" },
    { name: "Koleksi", path: "/koleksi" },
    { name: "Kontak", path: "/kontak" },
    { name: "Tentang", path: "/tentang" },
  ];

  const isLoginPage = location.pathname === "/login";

  return (
    <div
      className={`
        w-full h-[60px] rounded-full py-2 px-8 max-md:px-4 bg-black flex 
        items-center justify-between flex-wrap max-md:text-[14px]
      `}
    >
      <div 
        className={`
          flex items-center ${!isLoginPage ? "gap-4" : "justify-between w-full"}
        `}
      >
        <AppLogo withText={screenWidth > minLgPx} />
        <div className="flex items-center gap-4 max-lg:gap-3">
          {
            routes.map(({ name, path }) => (
              <RouteButton
                key={path}
                route={name}
                selected={location.pathname === path}
                onClick={() => navigate(path)}
              />
            ))
          }
        </div>
      </div>

      {!isLoginPage && (
        <div className="flex items-center lg:gap-6 gap-2 h-full py-1">
          <SearchBar />
          {
            !isAuthenticated ? <RoundedButton
              action={
                !isSm ? "Masuk" : <SignIn className="h-[20px] w-[20px]" /> 
              }
              onClick={() => navigate("/login")}
              className="h-full"
              horizontalPadding={ isSm ? 8 : 24 }
            /> : <div 
              className="flex gap-2 items-center select-none"
            >
              <ShoppingCart 
                className={`${icon} size-[24px]`}
                onClick={() => navigate("/keranjang")} 
              />
              <Love 
                className={`${icon} size-[20px] max-md:hidden`} 
              />
              <User 
                className={`p-1 bg-primary rounded-full md:ml-4 hover:cursor-pointer`}
              />
            </div>
          }
        </div>
      )}
    </div>
  );
}

/**
 * Text button for individual route.
 * @param {string} route - name of the route.
 * @param {boolean} selected - whether this route selected or not.
 * @param {Function} onClick - callback function for click event.
 * @returns
 */
function RouteButton({ route, selected, onClick }) {
  return (
    <div
      className={`
        ${selected ? "text-primary font-bold" : "text-white"}
        select-none hover:cursor-pointer ${
          selected ? "hover:opacity-100" : "hover:opacity-80"
        }
      `}
      onClick={onClick}
    >
      {route}
    </div>
  );
}

/**
 * Search bar for navigation bar.
 * @param {string} value - text field's value.
 * @param {(newValue: string) => void} onValueChange - callback function when the value changes.
 */
function SearchBar({ value, onValueChange }) {
  return (
    <div
      className={`
        flex lg:py-2 lg:px-4 max-lg:p-2 w-full h-full items-center text-secondary-text
        rounded-full bg-white
      `}
    >
      <input
        value={value}
        onChange={(e) => onValueChange(e.target)}
        placeholder="Pencarian"
        className={`max-lg:hidden lg:w-[100px] xl:w-[150px] outline-none`}
      />
      <Search className="w-[20px] h-[20px] select-none" />
    </div>
  );
}
