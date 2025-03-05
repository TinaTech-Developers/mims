import React from "react";

interface InsuranceData {
  vehicleId: string;
  ownerName: string;
  startDate: string;
  endDate: string;
  status: string;
  premium: number;
}

const insuranceData: InsuranceData[] = [
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
  // Add more data entries here
];

const InsuranceTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Vehicle ID
            </th>
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Owner Name
            </th>
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Insurance Start
            </th>
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Insurance End
            </th>
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Status
            </th>
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Premium
            </th>
            <th className="py-3 px-4 text-left text-sm  font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {insuranceData.map((insurance, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 text-sm text-gray-700">
                {insurance.vehicleId}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {insurance.ownerName}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {insurance.startDate}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                {insurance.endDate}
              </td>
              <td
                className={`py-3 px-4 text-sm font-semibold ${
                  insurance.status === "Active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {insurance.status}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                ${insurance.premium}
              </td>
              <td className="py-3 px-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Edit | Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsuranceTable;
