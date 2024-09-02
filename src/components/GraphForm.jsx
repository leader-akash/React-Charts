import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GraphForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    rows: [{ price: "", date: "" }],
  });

  const navigate = useNavigate();

  const handleAddRow = () => {
    setFormData({
      ...formData,
      rows: [...formData.rows, { price: "", date: "" }],
    });
  };

  const handleRemoveRow = (index) => {
    const newRows = [...formData.rows];
    newRows.splice(index, 1);
    setFormData({ ...formData, rows: newRows });
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    if (name === "type" || name === "description") {
      setFormData({ ...formData, [name]: value });
    } else {
      const newRows = [...formData.rows];
      newRows[index][name] = value;
      setFormData({ ...formData, rows: newRows });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingGraphData =
      JSON.parse(localStorage.getItem("graphData")) || [];
    const updatedGraphData = [...existingGraphData, formData];
    localStorage.setItem("graphData", JSON.stringify(updatedGraphData));
    setFormData({
      type: "",
      description: "",
      rows: [{ price: "", date: "" }],
    });
    toast.success("Graph added successfully");
  };

  return (
    <div className="w-[50vw]  max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Manage Product Price Trends</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={(e) => handleInputChange(null, e)}
            placeholder="Graph Name"
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange(null, e)}
            placeholder="Description"
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </div>

        {formData.rows.map((row, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              type="number"
              name="price"
              value={row.price}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="New Price"
              className="w-1/2 p-2 mr-4 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={row.date}
              onChange={(e) => handleInputChange(index, e)}
              className="w-1/2 p-2 mr-4 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
            >
              <span className="text-xl">-</span>
            </button>
          </div>
        ))}

        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={handleAddRow}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-700"
          >
            <span className="text-xl">+</span>
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-900 text-white p-3 rounded hover:bg-blue-800 w-full"
        >
          Add Changes
        </button>
      </form>

      <button
        className="mt-4 border-none bg-gray-500 text-white p-3 rounded hover:bg-gray-600 w-full"
        onClick={() => navigate("/list")}
      >
        See Graph Listing
      </button>
    </div>
  );
};

export default GraphForm;
