
import { FunctionComponent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading: FunctionComponent = () => {
  return (
    <div className="flex flex-col w-full">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <Skeleton width={500} height={30} />
        </div>
        <div className="flex">
          <Skeleton width={900} height={30} />
        </div>
        <Skeleton width={900} height={70} />
        <Skeleton width={900} height={70} />
        <Skeleton width={900} height={70} />
      </main>
    </div>
  );
};

export default loading;
