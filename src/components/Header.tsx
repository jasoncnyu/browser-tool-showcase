import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const avatarUrl = user
    ? `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(user.email)}`
    : "";

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-xs">{user.name[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => navigate("/mypage")}>
                  <User className="mr-2 h-4 w-4" />
                  MyPage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
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
            {user ? (
              <>
                <Link to="/mypage" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
                  MyPage
                </Link>
                <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="text-left text-sm font-medium text-muted-foreground">
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
