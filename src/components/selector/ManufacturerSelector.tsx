import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Manufacturer } from '../../types/Manufacturer';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

export function ManufacturerSelector(props: Props) {
  const [manufacturer, setManufacturer] = useState<Manufacturer[]>();

  useEffect(() => {
    api
      .get<Manufacturer[]>('/admin/manufacturer')
      .then(({ data }) => setManufacturer(data));
  }, []);

  return (
    <Select
      className="min-w-[150px]"
      placeholder="Select manufacturer"
      loading={!manufacturer}
      options={manufacturer}
      fieldNames={{ label: 'manufacturerName', value: 'manufacturerId' }}
      {...props}
    />
  );
}
