
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchIcon, MapPin } from "lucide-react";

const NavbarLinks = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-foreground/80"
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/services"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary ${
            isActive ? "text-primary" : "text-foreground/80"
          }`
        }
      >
        Services
      </NavLink>
      <NavLink
        to="/find-professionals"
        className={({ isActive }) =>
          `text-sm font-medium transition-colors hover:text-primary flex items-center ${
            isActive ? "text-primary" : "text-foreground/80"
          }`
        }
      >
        <MapPin className="h-4 w-4 mr-1" />
        Find Professionals
      </NavLink>
    </>
  );
};

export default NavbarLinks;
