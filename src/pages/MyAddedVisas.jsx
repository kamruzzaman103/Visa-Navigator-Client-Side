import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import VisaCard from "../components/VisaCard";
import UpdateVisaModal from "../components/UpdateVisaModal";
import LoadingSpinner from "../components/LoadingSpinner"; // Import your spinner component

const MyAddedVisas = () => {
  const { user } = useAuth();
  const [myVisas, setMyVisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [visaToUpdate, setVisaToUpdate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchMyVisas = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`https://visa-navigator-server-murex.vercel.app/api/visas`);
          const userVisas = response.data.filter((visa) => visa.userEmail === user.email);
          setMyVisas(userVisas);
        } catch (error) {
          toast.error("Failed to fetch your visas. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchMyVisas();
    }
  }, [user, navigate]);

  const handleDelete = async (visaId) => {
    try {
      await axios.delete(`https://visa-navigator-server-murex.vercel.app/api/visas/${visaId}`);
      setMyVisas((prevVisas) => prevVisas.filter((visa) => visa._id !== visaId));
      toast.success("Visa deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete visa. Please try again.");
    }
  };

  const handleUpdate = (visa) => {
    setVisaToUpdate(visa);
    setIsUpdateModalOpen(true);
  };

  // Show spinner if data is loading
  if (isLoading) {
    return (
      <div >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">My Added Visas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(myVisas) && myVisas.length > 0 ? (
          myVisas.map((visa) => (
            <VisaCard
              key={visa._id}
              visa={visa}
              onUpdate={() => handleUpdate(visa)}
              onDelete={() => handleDelete(visa._id)}
            />
          ))
        ) : (
          <p className="text-center col-span-full">You have not added any visas yet.</p>
        )}
      </div>

      {isUpdateModalOpen && visaToUpdate && (
        <UpdateVisaModal
          visa={visaToUpdate}
          onClose={() => setIsUpdateModalOpen(false)}
          onVisaUpdated={(updatedVisa) => {
            setMyVisas((prevVisas) =>
              prevVisas.map((visa) =>
                visa._id === updatedVisa._id ? updatedVisa : visa
              )
            );
            setIsUpdateModalOpen(false);
            toast.success("Visa updated successfully!");
          }}
        />
      )}
    </div>
  );
};

export default MyAddedVisas;
