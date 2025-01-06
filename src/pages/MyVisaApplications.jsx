import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import VisaApplicationCard from "../components/VisaApplicationCard";
import LoadingSpinner from "../components/LoadingSpinner";

const MyVisaApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      const fetchMyApplications = async () => {
        setIsLoading(true); // Start spinner
        try {
          const response = await axios.get(`https://visa-navigator-server-murex.vercel.app/api/visa-applications?email=${user.email}`);
          setApplications(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          toast.error("Failed to fetch your applications. Please try again.");
        }
        finally {
          setIsLoading(false); // Stop spinner
        }
      };
      fetchMyApplications();
    }
  }, [user, navigate]);

  const handleCancel = async (applicationId) => {
    try {
      await axios.delete(`https://visa-navigator-server-murex.vercel.app/api/visa-applications/${applicationId}`);
      setApplications((prevApps) => prevApps.filter((app) => app._id !== applicationId));
      toast.success("Application cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel application. Please try again.");
    }
  };

  const filteredApplications = Array.isArray(applications)
    ? applications.filter((app) => {
        // const visaType = app.visaType?.toLowerCase() || ""; // Safely handle undefined
        const country= app.country?.toLowerCase() || ""; // Safely handle undefined
        return (
          // visaType.includes(searchTerm.toLowerCase()) ||
          country.includes(searchTerm.toLowerCase())
        );
      })
    : [];
    if (isLoading) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    }

  return (
    <div className="max-w-lg mx-auto px-4 sm:max-w-4xl lg:max-w-6xl lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">My Visa Applications</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by  country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredApplications.length === 0 ? (
          <p className="text-center col-span-full">No applications found.</p>
        ) : (
          filteredApplications.map((application) => (
            <VisaApplicationCard
              key={application._id}
              application={application}
              onCancel={() => handleCancel(application._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;
