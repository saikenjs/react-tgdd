import { Select } from 'antd';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

export function StoreSelector(props: Props) {
  return (
    <Select
      placeholder="Select store"
      options={[
        { label: 'Store 1', value: 1 },
        { label: 'Store 2', value: 2 },
      ]}
      {...props}
    />
  );
}
