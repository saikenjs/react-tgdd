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
      .get<Manufacturer[]>('/manufacturer')
      .then(({ data }) => setManufacturer(data));
  }, []);

  return (
    <Select
      placeholder="Select manufacturer"
      loading={!manufacturer}
      options={manufacturer}
      fieldNames={{ label: 'manufacturerName', value: 'manufacturerId' }}
      {...props}
    />
  );
}
