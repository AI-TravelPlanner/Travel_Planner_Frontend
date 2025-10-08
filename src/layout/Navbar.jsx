import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/authSlice/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

const navigationLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "Explore", active: true },
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handlePlanTripClick = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/plan-trip");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 shadow-md">
      <div className="flex h-16 justify-between gap-4 mx-10">
        {/* Left side */}
        <div className="flex gap-2">
          {/* Mobile menu trigger */}
          <div className="flex items-center md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Link to="/">
                    {/* Hamburger icon */}
                    <svg
                      className="pointer-events-none"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d="M4 12L20 12"
                        className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center transition-all duration-300 group-aria-expanded:rotate-45"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                      />
                    </svg>
                  </Link>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="py-1.5"
                          active={link.active}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/">
              <Logo />
            </Link>
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="h-full">
                    <NavigationMenuLink
                      active={link.active}
                      href={link.href}
                      className="text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user && (
            <Avatar className="w-10 h-10">
              {user.photoURL ? (
                <AvatarImage
                  src={user.photoURL}
                  alt={user.displayName || user.name || user.email || "User"}
                />
              ) : (
                <AvatarFallback>
                  {(user.displayName || user.name || user.email || "NA")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          )}

          {!user ? (
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-4"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-sm cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-4"
            >
              Logout
            </Button>
          )}

          {/* Plan Trip Button */}
          <Button
            onClick={handlePlanTripClick}
            variant="default"
            size="sm"
            className="text-sm cursor-pointer bg-[#4A1919] hover:bg-[#6B2B2B] px-4 py-4"
          >
            Plan Trip
          </Button>
        </div>
      </div>
    </header>
  );
}
