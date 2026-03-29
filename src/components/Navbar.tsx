import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "About Us", to: "/about" },
  { label: "Academics", to: "/academics" },
  { label: "Facilities", to: "/facilities" },
  { label: "Admissions", to: "/admissions" },
  { label: "Gallery", to: "/gallery" },
  // { label: "Staff", to: "/staff" },
  { label: "Contact", to: "/contact" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <span className="block font-heading text-lg font-bold text-foreground">
              Shri Basweshwar
            </span>
            <span className="block text-xs text-muted-foreground">Education Campus</span>
          </div>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === l.to ||
                  location.pathname.startsWith(l.to + "/")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* 🔥 ADMIN BUTTON FIXED */}
          <li>
            <Link
              to={isLoggedIn ? "/admin" : "/login"}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.startsWith("/admin")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-card">
          <ul className="flex flex-col p-4 gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === l.to ||
                    location.pathname.startsWith(l.to + "/")
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}

            {/* 🔥 ADMIN MOBILE FIX */}
            <li>
              <Link
                to={isLoggedIn ? "/admin" : "/login"}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium ${
                  location.pathname.startsWith("/admin")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;