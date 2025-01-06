import { useState } from "react";

const VisaApplicationCard = ({ application, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    country,
    countryImage,
    visaType,
    processingTime,
    fee,
    validity,
    applicationMethod,
    appliedDate,
    applicantName,
    email,
  } = application;

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    onCancel();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border rounded-lg shadow p-4">
      <img src={countryImage} alt={country} className="w-full h-40 object-cover rounded" />
      <h2 className="text-lg font-bold mt-4">{country}</h2>
      <p>Visa Type: {visaType}</p>
      <p>Processing Time: {processingTime}</p>
      <p>Fee: {fee}</p>
      <p>Validity: {validity}</p>
      <p>Application Method: {applicationMethod}</p>
      <p>Applied Date: {new Date(appliedDate).toLocaleDateString()}</p>
      <p>Applicant: {application.firstName} {application.lastName}</p>
      <p>Email: {email}</p>
      <button
        onClick={handleCancelClick}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cancel
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Cancel Application</h3>
            <p>Are you sure you want to cancel this application?</p>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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

export default VisaApplicationCard;

