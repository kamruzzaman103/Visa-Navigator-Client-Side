import { useState,useEffect  } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const AddVisa = () => {
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
    userEmail: "", // To associate visa with logged-in user
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setVisaData((prevData) => ({ ...prevData, userEmail: user.email }));
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisaData({ ...visaData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setVisaData({
        ...visaData,
        requiredDocuments: [...visaData.requiredDocuments, value],
      });
    } else {
      setVisaData({
        ...visaData,
        requiredDocuments: visaData.requiredDocuments.filter((doc) => doc !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to add a visa.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://visa-navigator-server-murex.vercel.app/api/visas", // Backend endpoint for adding visa
        visaData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Visa added successfully!");
        setVisaData({
          countryImage: "",
          countryName: "",
          visaType: "",
          processingTime: "",
          requiredDocuments: [],
          description: "",
          ageRestriction: "",
          fee: "",
          validity: "",
          applicationMethod: "",
          userEmail: user.email, // Reset with logged-in user email
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding visa. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm lg:max-w-lg mx-auto my-8 p-4 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Visa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Country Image URL</label>
          <input
            type="text"
            name="countryImage"
            value={visaData.countryImage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country Name</label>
          <input
            type="text"
            name="countryName"
            value={visaData.countryName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Visa Type</label>
          <select
            name="visaType"
            value={visaData.visaType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Visa Type</option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Official Visa">Official Visa</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Processing Time</label>
          <input
            type="text"
            name="processingTime"
            value={visaData.processingTime}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Required Documents</label>
          <div className="flex flex-wrap gap-4">
            {["Valid passport", "Visa application form", "Recent passport-sized photograph"].map(
              (doc, idx) => (
                <div key={idx}>
                  <label>
                    <input
                      type="checkbox"
                      value={doc}
                      onChange={handleCheckboxChange}
                      checked={visaData.requiredDocuments.includes(doc)}
                    />
                    <span className="ml-2">{doc}</span>
                  </label>
                </div>
              )
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={visaData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age Restriction</label>
          <input
            type="number"
            name="ageRestriction"
            value={visaData.ageRestriction}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fee</label>
          <input
            type="number"
            name="fee"
            value={visaData.fee}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Validity</label>
          <input
            type="text"
            name="validity"
            value={visaData.validity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Application Method</label>
          <input
            type="text"
            name="applicationMethod"
            value={visaData.applicationMethod}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Visa"}
        </button>
      </form>
    </div>
  );
};

export default AddVisa;

