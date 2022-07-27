/* eslint-disable no-nested-ternary */
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useState } from 'react';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
}

export function UploadImage({ value, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <Upload
      maxCount={1}
      listType="picture-card"
      action="https://api.imgbb.com/1/upload"
      data={{ key: 'd0abe88065f9d724e5d8649eb5aed35c' }}
      name="image"
      showUploadList={false}
      onChange={info => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          onChange?.(info.file.response.data.image.url);
          setLoading(false);
        }
      }}
    >
      {loading ? (
        <LoadingOutlined />
      ) : value ? (
        <img src={value} className="max-w-full max-h-full" />
      ) : (
        <PlusOutlined />
      )}
    </Upload>
  );
}
