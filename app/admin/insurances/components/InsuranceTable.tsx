"use client";

import { useState, FormEvent } from "react";
import MainLayout from "../../components/MainLayout";

interface InsuranceData {
  vehicleId: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  status: string;
  premium: number;
}

const initialData: InsuranceData[] = [
  {
    vehicleId: "ABC1234",
    ownerName: "Tinashe Phiri",
    startDate: "2023-01-15",
    endDate: "2024-01-15",
    status: "Active",
    premium: 1200,
  },
  {
    vehicleId: "AEF5678",
    ownerName: "Lucky T. Yasini",
    startDate: "2023-06-20",
    endDate: "2024-06-20",
    status: "Expired",
    premium: 1500,
  },
  // Add more entries as needed
];

const InsuranceTable: React.FC = () => {
  const [insuranceData, setInsuranceData] =
    useState<InsuranceData[]>(initialData);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRecord: InsuranceData = {
      vehicleId: formData.get("vehicleId") as string,
      ownerName: formData.get("ownerName") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      status: formData.get("status") as string,
      premium: parseFloat(formData.get("premium") as string),
    };

    setInsuranceData([...insuranceData, newRecord]);
    setShowForm(false);
    e.currentTarget.reset();
  };

  const handleDelete = (idx: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setInsuranceData(insuranceData.filter((_, index) => index !== idx));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Insurance Records
          </h2>
          <button
            onClick={toggleForm}
            className={`px-4 py-2 rounded text-white ${
              showForm
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {showForm ? "Cancel" : "Add Record"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="vehicleId"
                placeholder="Vehicle ID"
                required
                className="p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                required
                className="p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="startDate"
                placeholder="Start Date"
                required
                className="p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                required
                className="p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                required
                className="p-3 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
              <input
                type="number"
                name="premium"
                placeholder="Premium"
                required
                className="p-3 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add Record
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Vehicle ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Owner Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Start Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  End Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Premium
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {insuranceData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 border-t border-gray-200"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {item.vehicleId}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {item.ownerName}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {item.startDate}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {item.endDate}
                  </td>
                  <td
                    className={`py-3 px-4 text-sm font-semibold ${
                      item.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    ${item.premium.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTable;
