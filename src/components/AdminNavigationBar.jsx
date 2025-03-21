import { useLocation, useNavigate } from "react-router-dom";
import AppLogo from "./AppLogo";
import Fishbowl from "../assets/fishbowl.svg?react";
import Contact from "../assets/contact.svg?react";
import { ADMIN_COLLECTION_PATH, ADMIN_CONTACT_DETAIL_PATH, ADMIN_CONTACTS_PATH, ADMIN_EDIT_PRODUCT_PATH } from "../constants/adminPaths";
import SignOutButton from "./SignOutButton";

export default function AdminNavigationBar() {
  const destinations = [
    { 
      name: "Koleksi",
      icon: <Fishbowl />, 
      mainRoute: ADMIN_COLLECTION_PATH,
      altRoutes: [ADMIN_EDIT_PRODUCT_PATH]
    },
    { 
      name: "Kontak",
      icon: <Contact />, 
      mainRoute: ADMIN_CONTACTS_PATH,
      altRoutes: [ADMIN_CONTACT_DETAIL_PATH] 
    }
  ];
  
  return (
    <div className="flex flex-col justify-between h-full py-14 px-10">
      <div className="flex flex-col gap-10">
        <AppLogo className="ms-2" />
        <div className="flex flex-col gap-4">
          {
            destinations.map(d => (
              <DestinationBar 
                name={d.name}
                icon={d.icon}
                mainRoute={d.mainRoute}
                altRoutes={d.altRoutes}
              />
            ))
          }
        </div>
      </div>
      <SignOutButton className="ms-2" />
    </div>
  );
}

function DestinationBar({
  name,
  icon,
  mainRoute,
  altRoutes
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selected = pathname === mainRoute || altRoutes.find(r => r === pathname);

  return (
    <div 
      className={`
        flex gap-4 rounded-[8px] p-2 font-bold items-center border-2
        ${selected ? "border-primary bg-black" : "border-soft-black bg-soft-black"}
        transition-colors select-none cursor-pointer duration-300 min-w-[200px]
      `}
      onClick={() => navigate(mainRoute)}
    >
      <div className={`
        p-2 rounded-[8px] border-1 border-primary ${selected ? "bg-primary" : "bg-black"}
        transition-colors duration-400 ease-in-out
      `}>
        {icon}
      </div>
      {name}
    </div>
  );
}