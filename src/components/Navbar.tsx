
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Trophy, PlusCircle, Home, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  console.log('Current User: ', user)

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      navigate("/");
    }
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
        location.pathname === to
          ? "bg-primary text-white shadow-lg"
          : "hover:bg-gray-100"
      )}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5a5a5a] to-secondary">
              LeetBoard
            </span>
            
          </Link>
          <div className="flex items-center gap-4">
            <NavLink to="/">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/contests">
              <Trophy className="w-4 h-4" />
              <span>Contests</span>
            </NavLink>
            <NavLink to="/contests/new">
              <PlusCircle className="w-4 h-4" />
              <span>New Contest</span>
            </NavLink>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
