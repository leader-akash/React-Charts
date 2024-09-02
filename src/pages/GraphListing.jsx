import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphListing = () => {
  const [graphData, setGraphData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("graphData")) || [];
    setGraphData(data);
  }, []);

  const handleViewGraph = (index) => {
    navigate(`/view-graph/${index}`);
  };

  const handleDeleteGraph = (index) => {
    const newGraphData = [...graphData];
    newGraphData.splice(index, 1);
    setGraphData(newGraphData);
    localStorage.setItem("graphData", JSON.stringify(newGraphData));
  };

  return (
    <div className="w-[80vw] mx-auto p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-6">Graph Listings</h2>
        <button
          className="bg-gray-400 text-white"
          onClick={() => navigate("/add-graph")}
        >
          Back
        </button>
      </div>
      {
        !graphData?. length  && 
        <p className="text-lg flex justify-center">No data available</p>
      }
      <div className=" grid space-x-4  grid-cols-1 lg:grid-cols-2">
        { graphData.map((graph, index) => {
          const data = {
            labels: graph.rows.map((row) => row.date), // X-axis labels: all dates
            datasets: [
              {
                label: graph.type,
                data: graph.rows.map((row) => row.price), // Y-axis data: all prices
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
                tension: 0.1,
              },
            ],
          };

          return (
            <div key={index} className="mb-6 p-4 border-2 rounded">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{graph.type}</h3>
                  <p className="text-gray-400">{graph.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleViewGraph(index)}
                    className="bg-blue-500 text-white p-2 rounded mr-2 hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteGraph(index)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <Line data={data} />
            </div>
          );
        })
      
      }
      </div>

    </div>
  );
};

export default GraphListing;
