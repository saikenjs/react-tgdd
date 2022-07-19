import { CategorySelector } from '../../components/selector/CategorySelector';
import { ManufacturerSelector } from '../../components/selector/ManufacturerSelector';
import { StoreSelector } from '../../components/selector/StoreSelector';
import AdminLayout from '../../layouts/AdminLayout';

export function CategoryManagement() {
  return (
    <AdminLayout>
      <CategorySelector />
      <ManufacturerSelector />
      <StoreSelector />
    </AdminLayout>
  );
}
