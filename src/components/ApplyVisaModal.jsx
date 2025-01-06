import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ApplyVisaModal = ({ visa, email, onClose }) => {
  const [formData, setFormData] = useState({
    country: visa.countryName,
    countryImage: visa.countryImage,
    visaType: visa.visaType,
    processingTime: visa.processingTime,
    validity: visa.validity,
    applicationMethod: visa.applicationMethod,
    firstName: "",
    lastName: "",
    email: email || "",
    appliedDate: new Date().toISOString().split("T")[0],
    fee: visa.fee,
    visaId: visa._id,
  });


  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit visa application
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://visa-navigator-server-murex.vercel.app/api/visa-applications", formData);
      toast.success("Visa application submitted successfully!");
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error applying for visa:", error);
      toast.error("Failed to apply for visa. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Apply for {visa.countryName} Visa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
          <input
            type="text"
            name="appliedDate"
            value={formData.appliedDate}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
          <input
            type="text"
            name="fee"
            value={`$${formData.fee}`}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Apply
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-red-600 hover:text-red-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApplyVisaModal;
