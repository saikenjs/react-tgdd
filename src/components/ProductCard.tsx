import { capitalize, round } from 'lodash';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface Props {
  product: Product;
  disabled?: boolean;
}

export function ProductCard({ product, disabled }: Props) {
  return (
    <Link
      className={disabled ? 'pointer-events-none' : ''}
      to={`/product-detail/${product.productId}`}
    >
      <div className="bg-white rounded-md p-[10px] h-full flex flex-col">
        <img className="block mb-4 aspect-square" src={product.image} />
        <span className="block my-3 text-lg grow">
          {capitalize(product.productName)}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {(product.salePrice || product.unitPrice).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
          {product.salePrice !== 0 && (
            <span className="block px-1 font-bold text-red-500 bg-red-100 rounded">
              -{100 - round((product.salePrice * 100) / product.unitPrice, 0)}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
