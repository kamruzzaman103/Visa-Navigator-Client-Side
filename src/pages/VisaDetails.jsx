import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

import ApplyVisaModal from "../components/ApplyVisaModal";
import LoadingSpinner from "../components/LoadingSpinner";

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(user.email);
  

  // Fetch visa details
  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const response = await axios.get(`https://visa-navigator-server-murex.vercel.app/api/visas/${id}`);
        setVisa(response.data);
      } catch (error) {
        console.error("Error fetching visa details:", error);
        toast.error("Failed to fetch visa details. Please try again.");
      }
    };

    fetchVisaDetails();
  }, [id]);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (user === null) {
      navigate("/login", { state: { from: `/visa/${id}` } });
    }
  }, [user, navigate, id]);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  if (!visa) {
    return <LoadingSpinner/>
  }

  return (
    <div className="max-w-sm mx-auto px-2 sm:max-w-xl lg:max-w-2xl lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Visa Details</h1>
      

      <div className="flex flex-col md:flex-row items-center gap-10 border-2 border-solid p-6 rounded-lg">
        <img
          src={visa.countryImage}
          alt={visa.countryName}
          className="w-64 h-40 object-cover rounded mb-4 md:mb-0"
        />
        <div className="flex flex-col md:flex-1">
          <h2 className="text-2xl font-semibold mb-2">{visa.countryName}</h2>
          <p className="text-gray-700 mb-2">
            Visa Type: <span className="font-semibold">{visa.visaType}</span>
          </p>
          <p className="text-gray-700 mb-2">
            Processing Time: <span className="font-semibold">{visa.processingTime}</span>
          </p>
          <p className="text-gray-700 mb-2">
            Fee: <span className="font-semibold">${visa.fee}</span>
          </p>
          <p className="text-gray-700 mb-4">
            Validity: <span className="font-semibold">{visa.validity}</span>
          </p>
          <button
            onClick={handleApplyClick}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Apply for the visa
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ApplyVisaModal
          visa={visa}
          onClose={() => setIsModalOpen(false)}
          email={user.email}
        />
      )}
    </div>
  );
};

export default VisaDetails;
