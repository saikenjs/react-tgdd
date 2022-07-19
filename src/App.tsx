import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import AdminHome from './pages/admin/AdminHome';
import { CategoryManagement } from './pages/admin/CategoryManagement';
import ProductManagement from './pages/admin/ProductManagement';
import CartPage from './pages/CartPage';
import { Home } from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/product-detail/:id', element: <ProductDetailPage /> },
  { path: '*', element: <Navigate to="/" /> },

  // Admin
  { path: '/admin/*', element: <AdminHome /> },
  { path: '/admin/product-management', element: <ProductManagement /> },
  { path: '/admin/category-management', element: <CategoryManagement /> },
];

export function App() {
  const router = useRoutes(routes);

  return router;
}
