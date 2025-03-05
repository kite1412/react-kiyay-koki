import AppLogo from "../assets/app-logo.svg?react";
import Search from "../assets/search.svg?react";

export default function NavigationBar() {
  return (
    <div className={`
      w-full h-[60px] rounded-full py-2 px-8 bg-black flex items-center justify-between
    `}>
      <div className="flex gap-6 items-center">
        <LogoWithText />
        <RouteButton 
          route={"Beranda"}
          selected={true}
          onClick={() => {}}
        />
        <RouteButton 
          route={"Koleksi"}
          selected={false}
          onClick={() => {}}
        />
        <RouteButton 
          route={"Kontak"}
          selected={false}
          onClick={() => {}}
        />
        <RouteButton 
          route={"Tentang"}
          selected={false}
          onClick={() => {}}
        />
      </div>

      <div className="flex items-center gap-6">
        
      </div>
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
 * Text button for routes
 * @param {string} route - name of the route. 
 * @param {boolean} selected - whether this route selected or not. 
 * @param {Function} onClick - callback function for click event. 
 * @returns 
 */
function RouteButton({ 
  route,
  selected, 
  onClick
}) {
  return (
    <div
      className={`
        ${selected ? "text-primary font-bold" : "text-white" }
        select-none hover:cursor-pointer ${selected ? "hover:opacity-100" : "hover:opacity-80"}
      `}
      onClick={onClick}
    >
      {route}
    </div>
  );
}