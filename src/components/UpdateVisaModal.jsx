import  { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateVisaModal = ({ visa, onClose, onVisaUpdated }) => {
  const [formData, setFormData] = useState({
    countryName: visa.countryName,
    visaType: visa.visaType,
    processingTime: visa.processingTime,
    fee: visa.fee,
    validity: visa.validity,
    description: visa.description,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated visa details
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedVisa = await axios.put(`https://visa-navigator-server-murex.vercel.app/api/visas/${visa._id}`, formData);
      onVisaUpdated(updatedVisa.data);
    } catch (error) {
      toast.error("Failed to update visa. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Update Visa</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="countryName"
            value={formData.countryName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="processingTime"
            value={formData.processingTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Update
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

export default UpdateVisaModal;
