import React from 'react';
import { BadgePercent } from 'lucide-react';

const ProductCard = ({ product, onAdd }) => {
  const { name, price, img, desc, tag } = product;
  return (
    <div className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative">
        <img src={img} alt={name} className="h-40 w-full object-cover" />
        {tag && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-600/90 px-2 py-1 text-xs font-medium text-white">
            <BadgePercent className="h-3 w-3" /> {tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">₹{price.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="rounded-full bg-emerald-600 text-white text-sm px-4 py-2 hover:bg-emerald-700 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ products, onAdd }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Popular Dishes</h2>
        <p className="text-sm text-gray-500 mt-1">Freshly prepared, delivered fast.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;