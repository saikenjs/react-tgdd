import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Category } from '../../types/Category';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

export function CategorySelector(props: Props) {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    api.get<Category[]>('/admin/category').then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <Select
      className="min-w-[150px]"
      placeholder="Select category"
      loading={!categories}
      options={categories}
      fieldNames={{ label: 'categoryName', value: 'categoryId' }}
      {...props}
    />
  );
}
