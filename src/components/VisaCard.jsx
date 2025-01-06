
import { useState } from "react";

const VisaCard = ({ visa, onUpdate, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(); // Trigger the delete action
    setIsDeleteModalOpen(false); // Close the modal
  };

  return (
    <div className="border rounded-lg p-4">
      <img
        src={visa.countryImage}
        alt={visa.countryName}
        className="w-full h-32 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{visa.countryName}</h3>
      <p className="text-gray-700 mb-2">Visa Type: {visa.visaType}</p>
      <p className="text-gray-700 mb-2">Processing Time: {visa.processingTime}</p>
      <p className="text-gray-700 mb-2">Fee: ${visa.fee}</p>
      <p className="text-gray-700 mb-4">Validity: {visa.validity}</p>

      <div className="flex justify-between">
        <button
          onClick={onUpdate}
          className="bg-yellow-500 text-white py-1 px-4 rounded"
        >
          Update
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-red-500 text-white py-1 px-4 rounded"
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this visa card?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white py-1 px-4 rounded"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white py-1 px-4 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaCard;
