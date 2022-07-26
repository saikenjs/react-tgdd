import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Store } from '../../types/Store';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

export function StoreSelector(props: Props) {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    api.get<Store[]>('/store').then(({ data }) => {
      setStores(data);
    });
  }, []);

  return (
    <Select
      className="min-w-[150px] w-full"
      placeholder="Select store"
      options={stores.filter(e => e.status)}
      fieldNames={{ label: 'storeName', value: 'storeId' }}
      {...props}
    />
  );
}
