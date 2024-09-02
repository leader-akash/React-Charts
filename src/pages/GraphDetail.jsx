import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {   FaClock, FaPlus } from 'react-icons/fa';
import { FaMinusCircle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GraphDetailHeader from "../components/GraphDetailHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphDetail = () => {
  const params = useParams();
  const index = params.id; 
  const [graphData, setGraphData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("graphData")) || [];
    const selectedGraph = data[index];
    if (selectedGraph) {
      setGraphData(selectedGraph);

      const total = selectedGraph.rows.reduce(
        (sum, row) => sum + parseFloat(row.price),
        0
      );
      setTotalPrice(total);
    }
  }, [index]);

  if (!graphData) return <div>Loading...</div>;

  const chartData = {
    labels: graphData.rows.map((row) => row.date),
    datasets: [
      {
        label: graphData.type,
        data: graphData.rows.map((row) => row.price),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-6">Graph Details</h2>
        <button
          className="bg-gray-400 text-white"
          onClick={() => navigate("/list")}
        >
          Back
        </button>
      </div>
      <div className="flex justify-between">
        <div className="w-3/4">
          <GraphDetailHeader />
          <div className="flex justify-between items-center">
            <div className="mb-3">
            <h2 className="text-2xl font-bold ">{graphData.type}</h2>
            <p className='text-gray-400'>{graphData.description}</p>
            </div>
            <div className="flex items-center space-x-4 text-gray-600">
              <FaPlus className=" cursor-pointer" />
              <FaClock className=" cursor-pointer" />
              <FaMinusCircle className=" cursor-pointer" />
              <MdOutlineMenu className="cursor-pointer" />
            </div>
          </div>

          <Line data={chartData} />
        </div>

        {/* Right side: Total Price  */}
        <div className="w-1/4 bg-gray-100 p-6 ml-6 rounded-lg shadow-inner">
          <div className="text-center text-xl font-bold mb-6">
            {totalPrice.toFixed(2)} USD/MT
          </div>
          <div className="border-t border-b py-4">
            <div className="text-sm text-gray-500">W-o-W Change</div>
            <div className="text-lg font-semibold">N/A</div>
          </div>
          <div className="border-b py-4">
            <div className="text-sm text-gray-500">M-o-M Change</div>
            <div className="text-lg font-semibold">13.61%</div>
          </div>
          <div className="border-b py-4">
            <div className="text-sm text-gray-500">Q-o-Q Change</div>
            <div className="text-lg font-semibold">27.48%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphDetail;
