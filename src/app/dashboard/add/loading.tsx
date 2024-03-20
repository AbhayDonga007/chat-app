import { FunctionComponent } from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FunctionComponent<loadingProps> = () => {
  return (
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton width={500} height={30}/>
      </div>
      <div className="mt-6">
        <div className="grid gap-4">
          <Skeleton width={300} height={20}/>
          <div className="flex">
            <Skeleton width={850} height={40}/>
          </div>
          <Skeleton width={200} height={25}/>
        </div>
      </div>
    </div>
  );
};

export default loading;
