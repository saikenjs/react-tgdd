import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import AdminHome from './pages/admin/AdminHome';
import CartPage from './pages/CartPage';
import { Home } from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/product-detail', element: <ProductDetailPage /> },
  { path: '*', element: <Navigate to="/" /> },

  // Admin
  { path: '/admin', element: <AdminHome /> },
];

export function App() {
  const router = useRoutes(routes);

  return router;
}
