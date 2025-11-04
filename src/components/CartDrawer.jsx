import React from 'react';
import { X, Plus, Minus, BadgePercent } from 'lucide-react';

const CartDrawer = ({
  open,
  onClose,
  items,
  increment,
  decrement,
  remove,
  subtotal,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  discount,
  total,
  onCheckout,
}) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex h-[calc(100%-4rem)] flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover border"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2">
                        <button
                          onClick={() => decrement(item.id)}
                          className="rounded-full border p-1 hover:bg-gray-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          className="rounded-full border p-1 hover:bg-gray-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Coupon */}
            <div className="mt-6 rounded-lg border p-3">
              <div className="flex items-center gap-2 mb-2">
                <BadgePercent className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Discount Coupon</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g., WELCOME10)"
                  className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={onApplyCoupon}
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
                  disabled={items.length === 0}
                >
                  Apply
                </button>
              </div>
              {discount && (
                <p className="mt-2 text-sm text-emerald-700">Applied: {discount.label}</p>
              )}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t px-4 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="text-emerald-700">-₹{discount ? discount.amount.toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="mt-2 w-full rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;