export interface Product {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  salePrice: number;
  description: string;
  rate: number;
  status: boolean;
  image: string;
  categoryId: number;
  manufacturerId: number;
  storeId: number;
}
