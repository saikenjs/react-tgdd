import { capitalize } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Link to="/product-detail">
      <div className="bg-white rounded-md p-[10px] h-full flex flex-col">
        <img className="block mb-4 aspect-square" src={product.image} />
        <span className="block my-3 text-lg grow">
          {capitalize(product.productName)}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">
            {product.unitPrice.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
          {product.salePrice !== 0 && (
            <span className="block px-1 font-bold text-red-500 bg-red-100 rounded">
              -{product.salePrice}%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
