import { FunctionComponent } from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FunctionComponent<loadingProps> = () => {
  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton width={500} height={30}/>
      </div>
      <div className="space-y-4">
        <Skeleton width={900} height={30}/>
        <div className="flex items-center px-4 py-3 bg-white rounded-lg shadow">
            <Skeleton width={900} height={50}/>
        </div>
        <div className="flex items-center px-4 py-3 bg-white rounded-lg shadow">
            <Skeleton width={900} height={50}/>
        </div>
        <div className="flex items-center px-4 py-3 bg-white rounded-lg shadow">
            <Skeleton width={900} height={50}/>
        </div>
      </div>
    </main>
  );
};

export default loading;
