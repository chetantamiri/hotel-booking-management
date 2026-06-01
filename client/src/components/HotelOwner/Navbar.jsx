import React from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useUser, useClerk, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <img src={assets.logo} alt="logo" className="h-8 object-contain" />
        </Link>
        <span className="hidden sm:block w-px h-6 bg-gray-200" />
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-md active:scale-95"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
