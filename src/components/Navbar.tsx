import React from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">KrishiMitra</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="/" className="hover:bg-green-700 px-3 py-2 rounded-md">Home</a>
              <a href="/upload" className="hover:bg-green-700 px-3 py-2 rounded-md">Upload</a>
              <a href="/Prediction" className="hover:bg-green-700 px-3 py-2 rounded-md">Predict</a>
              <a href="/dashboard" className="hover:bg-green-700 px-3 py-2 rounded-md">Dashboard</a>
              <a href="/about" className="hover:bg-green-700 px-3 py-2 rounded-md">About Us</a>
              <a href="/contact" className="hover:bg-green-700 px-3 py-2 rounded-md">Contact</a>
              <a href="/login" className="bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-50">Login</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-green-700 p-2 rounded-md">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 px-2 pt-2 pb-3">
              <a href="/" className="hover:bg-green-700 px-3 py-2 rounded-md">Home</a>
              <a href="/upload" className="hover:bg-green-700 px-3 py-2 rounded-md">Upload</a>
              <a href="/prediction" className="hover:bg-green-700 px-3 py-2 rounded-md">Predict</a>
              <a href="/dashboard" className="hover:bg-green-700 px-3 py-2 rounded-md">Dashboard</a>
              <a href="/about" className="hover:bg-green-700 px-3 py-2 rounded-md">About Us</a>
              <a href="/contact" className="hover:bg-green-700 px-3 py-2 rounded-md">Contact</a>
              <a href="/login" className="bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-50 text-center">Login</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;