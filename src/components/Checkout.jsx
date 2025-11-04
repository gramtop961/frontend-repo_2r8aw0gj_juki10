import React, { useState } from 'react';
import { CreditCard, Wallet, Banknote, Check } from 'lucide-react';

const PaymentOption = ({ id, label, icon: Icon, selected, onChange }) => (
  <label
    htmlFor={id}
    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${selected ? 'border-emerald-600 ring-2 ring-emerald-200' : 'hover:border-gray-300'}`}
  >
    <input
      id={id}
      type="radio"
      name="payment"
      className="hidden"
      checked={selected}
      onChange={onChange}
    />
    <Icon className="h-5 w-5 text-emerald-600" />
    <span className="font-medium">{label}</span>
  </label>
);

const Checkout = ({ items, subtotal, discount, total, onOrderPlaced }) => {
  const [payment, setPayment] = useState('cod');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      alert('Please fill in name, phone, and delivery address.');
      return;
    }
    if (payment === 'upi' && !upiId) {
      alert('Please enter a valid UPI ID.');
      return;
    }
    if (payment === 'card' && (!card.number || !card.name || !card.expiry || !card.cvv)) {
      alert('Please complete card details.');
      return;
    }

    onOrderPlaced({ payment, name, phone, address, upiId, card });
  };

  return (
    <section id="checkout" className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-semibold">Delivery Details</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery Address"
                className="sm:col-span-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={3}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Payment Method</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <PaymentOption
                id="cod"
                label="Cash on Delivery"
                icon={Banknote}
                selected={payment === 'cod'}
                onChange={() => setPayment('cod')}
              />
              <PaymentOption
                id="card"
                label="Credit/Debit Card"
                icon={CreditCard}
                selected={payment === 'card'}
                onChange={() => setPayment('card')}
              />
              <PaymentOption
                id="upi"
                label="UPI"
                icon={Wallet}
                selected={payment === 'upi'}
                onChange={() => setPayment('upi')}
              />
            </div>

            {payment === 'upi' && (
              <div className="mt-4">
                <input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="UPI ID (e.g., username@bank)"
                  className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {payment === 'card' && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  placeholder="Card Number"
                  className="sm:col-span-2 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  placeholder="Name on Card"
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  value={card.expiry}
                  onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  placeholder="MM/YY"
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  value={card.cvv}
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  placeholder="CVV"
                  className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h4 className="font-semibold mb-4">Order Summary</h4>
            <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {items.map((it) => (
                <li key={it.id} className="flex justify-between text-sm">
                  <span>
                    {it.name} × {it.qty}
                  </span>
                  <span>₹{(it.qty * it.price).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-emerald-700">-₹{discount ? discount.amount.toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={items.length === 0}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Check className="h-5 w-5" /> Place Order
            </button>
            <p className="mt-2 text-[11px] text-gray-500">Coupon and offers are for demo only in this preview. In production, they'll be validated by the server.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;