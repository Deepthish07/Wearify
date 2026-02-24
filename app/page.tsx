'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard, { Product } from '@/components/ProductCard';

const products: Product[] = [
  {
    id: 1,
    name: 'Cashmere Wrap Coat',
    price: '$1,240',
    category: 'Outerwear',
    primaryImage:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1100&q=80'
  },
  {
    id: 2,
    name: 'Silk Column Dress',
    price: '$980',
    category: 'Evening',
    primaryImage:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1100&q=80'
  },
  {
    id: 3,
    name: 'Structured Leather Tote',
    price: '$760',
    category: 'Accessories',
    primaryImage:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1100&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1100&q=80'
  },
  {
    id: 4,
    name: 'Tailored Wool Set',
    price: '$1,420',
    category: 'Essentials',
    primaryImage:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1100&q=80'
  }
];

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const total = useMemo(
    () =>
      cartItems
        .reduce((sum, item) => sum + Number(item.price.replace(/[$,]/g, '')), 0)
        .toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
    [cartItems]
  );

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
    setCartOpen(true);
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
      <header className="fixed inset-x-0 top-0 z-40 mx-auto mt-4 w-[calc(100%-1.5rem)] max-w-6xl rounded-full border border-white/40 bg-white/35 px-5 py-3 backdrop-blur-xl md:w-[calc(100%-3rem)] md:px-8">
        <nav className="flex items-center justify-between">
          <span className="font-serif text-xl tracking-[0.2em] text-charcoal">AURA</span>
          <ul className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-charcoal/75 md:flex">
            <li>New Arrivals</li>
            <li>Collections</li>
            <li>Atelier</li>
          </ul>
          <button
            onClick={() => setCartOpen(true)}
            className="text-xs uppercase tracking-[0.18em] text-charcoal transition hover:text-champagne"
          >
            Bag ({cartItems.length})
          </button>
        </nav>
      </header>

      <section className="relative flex min-h-screen items-end overflow-hidden px-4 pb-14 pt-28 md:px-10 md:pb-20">
        <Image
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2000&q=80"
          alt="AURA quiet luxury campaign"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.25 }}
          className="relative z-10 max-w-2xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-bone/85">AURA Spring Edition</p>
          <h1 className="font-serif text-4xl leading-tight text-bone text-balance md:text-6xl">
            Elevated essentials for the modern wardrobe.
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mt-8 rounded-full bg-champagne px-7 py-3 text-xs uppercase tracking-[0.2em] text-charcoal soft-lift"
          >
            Shop Collection
          </motion.button>
        </motion.div>
      </section>

      <section className="bg-bone px-4 py-16 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between"
        >
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">Featured Pieces</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-charcoal/55">Curated in limited drops</p>
        </motion.div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {products.map((product) => (
            <div key={product.id} className="mb-10 break-inside-avoid">
              <ProductCard product={product} />
              <button
                onClick={() => addToCart(product)}
                className="mt-4 text-xs uppercase tracking-[0.18em] text-charcoal/70 transition hover:text-champagne"
              >
                Add to Bag
              </button>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-40 bg-charcoal/45"
              aria-label="Close cart drawer"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#f7f6f3] px-6 py-7"
            >
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-serif text-2xl">Your Bag</h3>
                <button onClick={() => setCartOpen(false)} className="text-xs uppercase tracking-[0.18em] text-charcoal/70">
                  Close
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-charcoal/60">Your selection is empty. Discover refined staples above.</p>
                ) : (
                  cartItems.map((item, i) => (
                    <div key={`${item.id}-${i}`} className="rounded-2xl bg-white/80 p-4">
                      <p className="font-serif text-lg">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.15em] text-charcoal/50">{item.category}</p>
                      <p className="mt-2 text-sm">{item.price}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-charcoal/10 pt-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">Estimated total</span>
                  <span className="font-medium text-charcoal">{total}</span>
                </div>
                <button className="w-full rounded-full bg-charcoal py-3 text-xs uppercase tracking-[0.2em] text-bone">
                  Checkout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
