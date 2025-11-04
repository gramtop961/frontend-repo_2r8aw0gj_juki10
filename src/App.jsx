import React, { useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';

const initialProducts = [
  {
    id: 'p1',
    name: 'Margherita Pizza',
    price: 299,
    img: 'https://images.unsplash.com/photo-1601924582971-b0c5be3b3a92?q=80&w=1200&auto=format&fit=crop',
    desc: 'Classic delight with 100% real mozzarella cheese and basil.',
    tag: 'Chef’s pick',
  },
  {
    id: 'p2',
    name: 'Paneer Tikka Wrap',
    price: 199,
    img: 'https://images.unsplash.com/photo-1625944959515-530bde4df8ab?q=80&w=1200&auto=format&fit=crop',
    desc: 'Smoky paneer tikka wrapped with fresh veggies and zingy sauce.',
    tag: '10% off',
  },
  {
    id: 'p3',
    name: 'Veggie Burger',
    price: 179,
    img: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=1200&auto=format&fit=crop',
    desc: 'Crispy patty with fresh lettuce, tomatoes and special house sauce.',
  },
  {
    id: 'p4',
    name: 'Pasta Alfredo',
    price: 249,
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
    desc: 'Silky alfredo sauce tossed with fettuccine and herbs.',
  },
  {
    id: 'p5',
    name: 'Sushi Platter',
    price: 499,
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
    desc: 'Assorted rolls with fresh fillings served with soy and wasabi.',
    tag: 'New',
  },
  {
    id: 'p6',
    name: 'Chocolate Brownie',
    price: 129,
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1200&auto=format&fit=crop',
    desc: 'Gooey center, crisp top, served warm. A perfect finish.',
  },
];

function App() {
  const [products] = useState(initialProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const checkoutRef = useRef(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.qty, 0),
    [cart]
  );

  const discount = useMemo(() => {
    if (!coupon) return { amount: 0, label: '' };
    let amount = 0;
    if (coupon.type === 'percent') {
      amount = Math.min(subtotal * (coupon.value / 100), subtotal);
    } else if (coupon.type === 'flat') {
      amount = Math.min(coupon.value, subtotal);
    }
    return { amount, label: coupon.label };
  }, [coupon, subtotal]);

  const total = useMemo(() => Math.max(subtotal - discount.amount, 0), [subtotal, discount]);

  const handleAdd = (product) => {
    setCartOpen(true);
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increment = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decrement = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    // Demo-only coupon rules (will move to backend later)
    const rules = {
      WELCOME10: { type: 'percent', value: 10, label: 'WELCOME10 (10% off)' },
      FOODIE20: { type: 'percent', value: 20, label: 'FOODIE20 (20% off)' },
      SAVE100: { type: 'flat', value: 100, label: 'SAVE100 (₹100 off)' },
    };
    const found = rules[code];
    if (!found) {
      setCoupon(null);
      alert('Invalid coupon code');
      return;
    }
    if (subtotal <= 0) {
      alert('Add items to cart before applying a coupon.');
      return;
    }
    setCoupon(found);
  };

  const goToCheckout = () => {
    setCartOpen(false);
    if (checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderPlaced = ({ payment, name }) => {
    alert(`Order placed!\nCustomer: ${name}\nPayment: ${payment.toUpperCase()}\nAmount: ₹${total.toFixed(2)}`);
    // Reset cart & coupon in this demo
    setCart([]);
    setCoupon(null);
    setCouponCode('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar onCartClick={() => setCartOpen(true)} cartCount={cart.reduce((a, b) => a + b.qty, 0)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Order delicious food with a simple, fast checkout
            </h1>
            <p className="mt-3 text-gray-600 max-w-prose">
              A clean, Shopify-like ordering experience for your restaurant. Add items to cart, apply coupons, and pay via Cash on Delivery, Card, or UPI.
            </p>
            <div className="mt-6 inline-flex gap-3">
              <button
                onClick={() => {
                  const list = document.getElementById('menu');
                  if (list) list.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full bg-emerald-600 text-white px-5 py-2 font-medium hover:bg-emerald-700"
              >
                Browse Menu
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="rounded-full border border-gray-300 bg-white px-5 py-2 font-medium hover:shadow"
              >
                View Cart
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop"
              alt="Restaurant dishes"
              className="rounded-2xl shadow-lg border"
            />
          </div>
        </div>
      </section>

      <div id="menu">
        <ProductList products={products} onAdd={handleAdd} />
      </div>

      <div ref={checkoutRef}>
        <Checkout
          items={cart}
          subtotal={subtotal}
          discount={discount}
          total={total}
          onOrderPlaced={handleOrderPlaced}
        />
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        increment={increment}
        decrement={decrement}
        remove={remove}
        subtotal={subtotal}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        onApplyCoupon={applyCoupon}
        discount={discount}
        total={total}
        onCheckout={goToCheckout}
      />

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} RestoShop</span>
          <span>Coupons & offers section is ready for future backend integration.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
