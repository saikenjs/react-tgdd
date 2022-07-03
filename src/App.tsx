import { RouteObject, useRoutes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '*', element: <Navigate to="/" /> },
];

export function App() {
  const router = useRoutes(routes);

  return router;
}
