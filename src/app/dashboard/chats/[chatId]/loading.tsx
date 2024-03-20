import { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FunctionComponent<loadingProps> = () => {
  return (
    <main className="flex-1">
      <div className="flex items-center gap-4 p-4">
        <div className="relative">
          <Skeleton className="rounded-full" width={35} height={35} />
        </div>
        <div className="leading-none">
          <Skeleton width={500} height={35} />
        </div>
      </div>
      <div className="flex flex-col h-[calc(100%-64px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-end justify-start">
            <div className="max-w-xs rounded-lg p-2">
              <Skeleton width={500} height={70} />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="max-w-xs rounded-lg p-2">
              <Skeleton width={300} height={50} />
            </div>
          </div>
          <div className="flex items-end justify-start">
            <div className="max-w-xs rounded-lg p-2">
              <Skeleton width={300} height={40} />
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="max-w-xs rounded-lg p-2">
              <Skeleton width={200} height={30} />
            </div>
          </div>
        <div className="border-t p-4 flex items-center">
            <Skeleton width={900} height={60} />
        </div>
        </div>
      </div>
    </main>
  );
};

export default loading;
