
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, LogOut, User } from "lucide-react";

const NavbarLinks = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
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
      {user && (
        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-primary flex items-center ${
              isActive ? "text-primary" : "text-foreground/80"
            }`
          }
        >
          <Calendar className="h-4 w-4 mr-1" />
          My Bookings
        </NavLink>
      )}
      {user ? (
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium text-foreground/80 hover:text-primary flex items-center"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-1" />
          Sign Out
        </Button>
      ) : (
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-primary flex items-center ${
              isActive ? "text-primary" : "text-foreground/80"
            }`
          }
        >
          <User className="h-4 w-4 mr-1" />
          Sign In
        </NavLink>
      )}
    </>
  );
};

export default NavbarLinks;
