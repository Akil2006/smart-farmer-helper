import { Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="bg-leaf py-4 px-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {!isHome && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-leaf/80"
          >
            <ArrowLeft className="w-8 h-8" />
          </Button>
        )}
        <div className={`flex items-center gap-3 ${isHome ? "" : "flex-1 justify-center mr-14"}`}>
          <div className="bg-primary-foreground p-2 rounded-full">
            <Leaf className="w-8 h-8 text-leaf" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-primary-foreground">
            Smart Farm Advisor
          </h1>
        </div>
        {isHome && <div className="w-14" />}
      </div>
    </header>
  );
};

export default Header;
