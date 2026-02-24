'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export type Product = {
  id: number;
  name: string;
  price: string;
  primaryImage: string;
  secondaryImage: string;
  category: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.7rem] bg-[#ebecef]">
        <Image
          src={product.primaryImage}
          alt={`${product.name} studio image`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Image
          src={product.secondaryImage}
          alt={`${product.name} lifestyle image`}
          fill
          className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="pt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">{product.category}</p>
        <h3 className="mt-2 font-serif text-xl text-charcoal">{product.name}</h3>
        <p className="mt-1 text-sm tracking-wide text-charcoal/70">{product.price}</p>
      </div>
    </motion.article>
  );
}
