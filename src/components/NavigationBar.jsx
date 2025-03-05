import { useLocation, useNavigate } from "react-router-dom";
import AppLogo from "../assets/app-logo.svg?react";
import Search from "../assets/search.svg?react";
import RoundedButton from "./RoundedButton";

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

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
      w-full h-[60px] rounded-full py-2 px-8 bg-black flex items-center justify-between
    `}>
      <div className={`flex items-center ${isLoginPage ? "gap-128" : "gap-6"}`}>
        <LogoWithText />
        <div className="flex items-center gap-6">
          {routes.map(({ name, path }) => (
            <RouteButton
              key={path}
              route={name}
              selected={location.pathname === path}
              onClick={() => navigate(path)}
            />
          ))}
        </div>
      </div>

      {!isLoginPage && (
        <div className="flex items-center gap-6 h-full py-1">
          <SearchBar />
          <RoundedButton
            action={"Masuk"}
            onClick={() => navigate("/login")}
            className="h-full"
          />
        </div>
      )}
    </div>
  );
}

function LogoWithText() {
  return (
    <div className="flex gap-4 items-center">
      <AppLogo className="h-[30px] w-[30px]" />
      <b>Kiyay Goldfish</b>
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
      onClick={onClick}>
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
      flex py-2 px-4 w-full h-full items-center text-secondary-text
      rounded-full bg-white
    `}>
      <input
        value={value}
        onChange={(e) => onValueChange(e.target)}
        placeholder="Pencarian"
      />
      <Search className="w-[20px] h-[20px] select-none" />
    </div>
  );
}
