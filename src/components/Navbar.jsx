import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Navbar = ({ onCartClick, cartCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">R</div>
          <span className="text-xl font-semibold tracking-tight">RestoShop</span>
        </div>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition"
        >
          <ShoppingCart className="h-5 w-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;