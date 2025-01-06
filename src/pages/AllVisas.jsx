import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const AllVisas = () => {
  

  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  // Fetch all visas
  useEffect(() => {
    const fetchVisas = async () => {
      setIsLoading(true); // Start spinner
      try {
        const response = await axios.get("https://visa-navigator-server-murex.vercel.app/api/visas");
        const visaData = response.data;
        setVisas(visaData);
        setFilteredVisas(visaData);
      } catch (error) {
        console.error("Error fetching visas:", error);
        toast.error("Failed to fetch visas. Please try again.");
      } finally {
        setIsLoading(false); // Stop spinner
      }
    };
    fetchVisas();
  }, []);

  // Filter visas by type
  const handleFilterChange = (e) => {
    const visaType = e.target.value;
    setFilter(visaType);

    if (visaType === "") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter((visa) => visa.visaType === visaType);
      setFilteredVisas(filtered);
    }
  };

  // Show spinner while loading
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">All Visas</h1>

      {/* Filter Dropdown */}
      <div className="mb-8 text-center">
        <label htmlFor="filter" className="text-lg font-semibold mr-4">
          Filter by Visa Type:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
        </select>
      </div>

      {/* Visas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(filteredVisas) && filteredVisas.length > 0 ? (
          filteredVisas.map((visa) => (
            <div
              key={visa._id}
              className="border rounded-lg shadow-lg p-4 flex flex-col"
            >
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{visa.countryName}</h2>
              <p className="text-gray-700 mb-2">
                Visa Type: <span className="font-semibold">{visa.visaType}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Processing Time:{" "}
                <span className="font-semibold">{visa.processingTime}</span>
              </p>
              <p className="text-gray-700 mb-4">
                Fee: <span className="font-semibold">${visa.fee}</span>
              </p>
              <button
                onClick={() => navigate(`/visa-details/${visa._id}`)}
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded"
              >
                See Details
              </button>
            </div>
          ))
        ) : (
          <p>No visas available</p>
        )}
      </div>
    </div>
  );
};

export default AllVisas;
