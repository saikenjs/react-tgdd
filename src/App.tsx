import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { CategoryManagement } from './pages/admin/CategoryManagement';
import { ManufacturerManagement } from './pages/admin/ManufacturerManagement';
import { OrderHistory } from './pages/OrderHistory';
import { OrderManagement } from './pages/admin/OrderManagement';
import ProductManagement from './pages/admin/ProductManagement';
import CartPage from './pages/CartPage';
import { CategoryPage } from './pages/CategoryPage';
import { Home } from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import { SearchResultPage } from './pages/SearchResultPage';
import { StoreManagement } from './pages/admin/StoreManagement';

const routes: RouteObject[] = [
  // Customer
  { path: '/', element: <Home /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/search', element: <SearchResultPage /> },
  { path: '/product-detail/:id', element: <ProductDetailPage /> },
  { path: '/category/:id', element: <CategoryPage /> },
  { path: '/order-history', element: <OrderHistory /> },
  { path: '*', element: <Navigate to="/" /> },

  // Admin
  { path: '/admin/product-management', element: <ProductManagement /> },
  { path: '/admin/category-management', element: <CategoryManagement /> },
  { path: '/admin/order-management', element: <OrderManagement /> },
  { path: '/admin/store-management', element: <StoreManagement /> },
  {
    path: '/admin/manufacturer-management',
    element: <ManufacturerManagement />,
  },
  { path: '/admin/*', element: <ProductManagement /> },
];

export function App() {
  const router = useRoutes(routes);

  return router;
}
