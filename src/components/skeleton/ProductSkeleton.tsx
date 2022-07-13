import { Skeleton } from 'antd';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-md p-[10px] h-full flex flex-col">
      <Skeleton.Image className="block mb-4 aspect-square" />

      <Skeleton paragraph={{ rows: 1 }} className="block mb-3 grow" />

      <div className="flex items-center gap-2">
        <Skeleton
          paragraph={{ rows: 1 }}
          className="text-lg font-bold text-red-600"
        />
        <Skeleton
          paragraph={false}
          className="block px-1 font-bold text-red-500 bg-red-100 rounded"
        />
      </div>
    </div>
  );
}
