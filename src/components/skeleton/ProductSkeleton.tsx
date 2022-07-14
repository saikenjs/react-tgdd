import { Skeleton } from 'antd';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-md p-[10px] h-full flex flex-col">
      <Skeleton.Avatar active shape="square" size={207} className="mb-6" />

      <Skeleton active title paragraph={false} />

      <div className="flex items-center gap-2 grow">
        <Skeleton
          active
          paragraph={false}
          className="text-lg font-bold text-red-600"
        />
        <Skeleton
          active
          paragraph={false}
          className="block w-10 px-1 font-bold text-red-500 bg-red-100 rounded"
        />
      </div>
    </div>
  );
}
