import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-primary-foreground">
            LT
          </div>
          <span className="font-heading text-lg font-bold text-foreground">Local Tools</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            What are Local Tools?
          </Link>
          <Link to="/submit" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Submit a Tool
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Globe className="h-4 w-4" />
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/login">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link to="/about" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              What are Local Tools?
            </Link>
            <Link to="/submit" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Submit a Tool
            </Link>
            <Link to="/login" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Log in / Sign up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
