"use client";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import MainLayout from "../components/MainLayout";

interface User {
  id: string;
  fullName: string;
  email: string;
  vehicleId: string;
  vehicleMake: string;
  vehicleModel: string;
  insuranceStart: string;
  insuranceEnd: string;
  status: string;
}

const Profile = () => {
  // Simulate the admin/manager's profile data
  const adminData = {
    fullName: "Admin User",
    email: "adminuser@example.com",
    role: "Admin",
  };

  // Simulate a list of users (could be fetched from an API or database)
  const usersData: User[] = [
    {
      id: "1",
      fullName: "John Doe",
      email: "johndoe@example.com",
      vehicleId: "ABC1234",
      vehicleMake: "Toyota",
      vehicleModel: "Corolla",
      insuranceStart: "2023-01-15",
      insuranceEnd: "2024-01-15",
      status: "Active",
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "janesmith@example.com",
      vehicleId: "XYZ5678",
      vehicleMake: "Honda",
      vehicleModel: "Civic",
      insuranceStart: "2023-02-01",
      insuranceEnd: "2024-02-01",
      status: "Expired",
    },
  ];

  // State to handle the form input for editing user details
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<User | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      console.log("Updated user profile:", formData);
      setEditingUserId(null);
    }
  };

  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setFormData({ ...user });
  };

  const cancelEditing = () => {
    setEditingUserId(null);
    setFormData(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        {/* Admin Profile Header */}
        <h1 className="text-3xl font-semibold text-center mb-6">
          Admin Profile
        </h1>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={adminData.fullName}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                value={adminData.email}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <input
                type="text"
                value={adminData.role}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Users List */}
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="space-y-4">
          {usersData.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
              {editingUserId === user.id ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Editable Fields */}
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData?.fullName || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData?.email || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Vehicle ID
                      </label>
                      <input
                        type="text"
                        name="vehicleId"
                        value={formData?.vehicleId || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Vehicle Make
                      </label>
                      <input
                        type="text"
                        name="vehicleMake"
                        value={formData?.vehicleMake || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData?.vehicleModel || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Insurance Start
                      </label>
                      <input
                        type="date"
                        name="insuranceStart"
                        value={formData?.insuranceStart || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Insurance End
                      </label>
                      <input
                        type="date"
                        name="insuranceEnd"
                        value={formData?.insuranceEnd || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        value={formData?.status || ""}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">
                        Full Name: {user.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Email: {user.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Vehicle ID: {user.vehicleId}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Vehicle Make: {user.vehicleMake}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Vehicle Model: {user.vehicleModel}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Insurance Start: {user.insuranceStart}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Insurance End: {user.insuranceEnd}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Status: {user.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => startEditing(user)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md mt-4 flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
