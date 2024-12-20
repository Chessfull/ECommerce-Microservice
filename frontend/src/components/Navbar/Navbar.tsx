import { ShoppingCart, LogIn, UserPlus, LogOut } from "lucide-react"; // Added LogOut
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { CartModal } from "../ShoppingCart/CartModal";
import { AuthModal } from "../Auth/AuthModal";
import { useAuth } from "../../contexts/AuthContext";



export const Navbar = () => {
  const logoUrl = "https://i.ibb.co/KsgRyvK/Ekran-g-r-nt-s-2024-12-20-222513-removebg-preview.png";
  const { userId, user, logout } = useAuth(); // Added user here
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [basketData, setBasketData] = useState(null);
  const { getTotalItems } = useCart();

  const fetchBasketData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/basket/${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch basket");
      const data = await response.json();
      setBasketData(data);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  const handleCartClick = () => {
    fetchBasketData();
    setIsCartOpen(true);
  };

  return (
    <>
      <nav className="bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
            <img src={logoUrl} alt="Logo" className="h-20" />
            </div>
            <div className="flex items-center space-x-4">
              {userId ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white">Welcome, {user?.name}</span>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 text-white"
                  >
                    <LogOut className="h-4 w-4 text-white " />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 text-white"
                  >
                    <LogIn className="h-4 w-4 text-white" /> Login
                  </button>
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4 text-white" /> Sign Up
                  </button>
                </>
              )}

              <button
                onClick={() => handleCartClick()}
                className="p-2 relative text-gray-600 hover:text-gray-800 text-white"
              >
                <ShoppingCart className="h-6 w-6 text-white" />
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        type="login"
      />

      <AuthModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        type="register"
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        basketData={basketData}
      />
    </>
  );
};
