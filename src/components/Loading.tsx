import { Spin } from 'antd';
import React from 'react';

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
      <Spin size="large" />
    </div>
  );
}
