import { Select } from 'antd';

export function LocationSelector() {
  return (
    <Select
      className="min-w-[150px]"
      options={[
        { label: 'Location 1', value: 1 },
        { label: 'Location 2', value: 2 },
        { label: 'Location 3', value: 3 },
      ]}
    />
  );
}
