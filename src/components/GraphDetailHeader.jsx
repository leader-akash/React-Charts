import { FaHome, FaBell, FaClock, FaPlus } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const GraphDetailHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white  rounded-t-lg">
      <div className="flex items-center space-x-4">
        <FaHome className="text-blue-900 cursor-pointer" />
        <button className="text-sm font-semibold text-gray-600 border-b-2 border-transparent hover:text-blue-900 hover:border-blue-900 focus:outline-none">
          1Y
        </button>
        <button className="text-sm font-semibold text-gray-600 border-b-2 border-transparent hover:text-blue-900 hover:border-blue-900 focus:outline-none">
          2Y
        </button>
        <button className="text-sm font-semibold text-gray-600 border-b-2 border-transparent hover:text-blue-900 hover:border-blue-900 focus:outline-none">
          5Y
        </button>
        <button className="text-sm font-semibold text-gray-600 border-b-2 border-transparent hover:text-blue-900 hover:border-blue-900 focus:outline-none">
          10Y
        </button>
        <button className="text-sm font-semibold text-gray-600 border-b-2 border-transparent hover:text-blue-900 hover:border-blue-900 focus:outline-none">
          All
        </button>
      </div>
      <div className="flex items-center space-x-4 text-gray-600">
        <FiRefreshCw className=" cursor-pointer" />
        <FaPlus className=" cursor-pointer" />
        <FaClock className=" cursor-pointer" />
        <FaBell className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default GraphDetailHeader;
