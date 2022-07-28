import { Empty } from 'antd';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './skeleton/ProductSkeleton';

interface Props {
  products?: Product[];
  className?: string;
}

export function GridProduct({ products, className }: Props) {
  if (products?.length === 0) return <Empty />;

  return (
    <div className={`container grid grid-cols-5 gap-4 ${className ?? ''}`}>
      {products?.map((product, idx) => (
        <ProductCard key={idx} product={product} />
      ))}
      {!products && [1, 2, 3, 4, 5].map(idx => <ProductSkeleton key={idx} />)}
    </div>
  );
}
