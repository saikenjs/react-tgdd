import { useRecoilState } from 'recoil';
import { api } from '../api';
import { productsAtom } from '../recoil/atoms/ProductsAtom';

export const useUpdateListProduct = () => {
  const [products, setProducts] = useRecoilState(productsAtom);

  const fetchProducts = async () =>
    await api
      .get('/productForCus')
      .then(({ data }) => setProducts(data))
      .catch(err => {
        throw new Error(err);
      });

  return {
    fetchProducts,
    products,
    setProducts,
  };
};
