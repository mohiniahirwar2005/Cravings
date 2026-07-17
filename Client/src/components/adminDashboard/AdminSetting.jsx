import React, { useState } from "react";
import {
  MdEdit,
  MdOutlineLockReset,
  MdOutlineAddAPhoto,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";

import toast from "react-hot-toast";

import PasswordChangeModal from "../commonModals/PasswordChangeModal";

const AdminSetting = () => {
  const { user, setUser } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(false);

  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [adminData, setAdminData] = useState({
    adminId: "",
    department: "",
    adminRole: "",
    city: "",
    state: "",
    country: "",
    address: "",
    pinCode: "",
    emergencyContact: "",
  });


  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAdminChange = (e) => {
    const { name, value } = e.target;

    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      const payload = new FormData();

      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email.toLowerCase());
      payload.append("phone", formData.phone);

      if (profilePic) {
        payload.append("displayPic", profilePic);
      }

      const response = await api.put(
        "/common/edit-profile",
        payload
      );

      setUser(response.data.data);

      sessionStorage.setItem(
        "cravingUser",
        JSON.stringify(response.data.data)
      );

      setEditingProfile(false);
      setProfilePic(null);
      setProfilePicPreview(null);

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };



  const handleCancelProfile = () => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });

    setProfilePic(null);
    setProfilePicPreview(null);
    setEditingProfile(false);
  };



  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };



  const handleSaveAdmin = async () => {
    try {
      setIsLoading(true);



      setEditingAdmin(false);

      toast.success("Admin information updated successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update admin information"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-y-auto h-full p-6 space-y-2">
       

        <div className="bg-(--color-base-200) rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Profile Information
            </h3>

            {!editingProfile ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingProfile(true)}
                  className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                >
                  <MdEdit />
                  Edit
                </button>

                <button
                  onClick={() =>
                    setIsPasswordChangeModalOpen(true)
                  }
                  className="flex items-center gap-2 border border-(--color-primary) text-(--color-primary) px-3 py-1 rounded text-sm hover:bg-(--color-primary) hover:text-(--color-primary-content)"
                >
                  <MdOutlineLockReset />
                  Change Password
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  onClick={handleCancelProfile}
                  disabled={isLoading}
                  className="bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
           

            <div className="relative">
              <div className="w-20 h-20">
                {profilePicPreview || user?.photo?.url ? (
                  <img
                    src={
                      profilePicPreview ||
                      user?.photo?.url
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-(--color-primary)"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-200 border-2 border-(--color-primary) flex items-center justify-center text-4xl text-gray-500">
                    {user?.fullName
                      ?.charAt(0)
                      ?.toUpperCase() || "A"}
                  </div>
                )}
              </div>

              {editingProfile && (
                <div className="absolute bottom-0 right-0 border p-2 rounded-full bg-(--color-base-200)">
                  <label
                    htmlFor="profilePic"
                    className="cursor-pointer"
                  >
                    <MdOutlineAddAPhoto className="text-xl" />
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    id="profilePic"
                    className="hidden"
                    onChange={handleProfilePicChange}
                  />
                </div>
              )}
            </div>

            {/* PROFILE INPUTS */}

            <div className="grid grid-cols-3 gap-4 flex-1">
              <InputField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                editing={editingProfile}
                onChange={handleProfileChange}
              />

              <InputField
                label="Email"
                name="email"
                value={formData.email}
                editing={false}
                onChange={handleProfileChange}
              />

              <InputField
                label="Phone"
                name="phone"
                value={formData.phone}
                editing={editingProfile}
                onChange={handleProfileChange}
              />
            </div>
          </div>
        </div>



        <div className="bg-(--color-base-200) rounded-lg p-4">
          <div className="flex justify-between items-center border-b border-gray-400 pb-2">
            <h3 className="text-lg font-semibold">
              Admin Information
            </h3>

            {!editingAdmin ? (
              <button
                onClick={() => setEditingAdmin(true)}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              >
                <MdEdit />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveAdmin}
                  disabled={isLoading}
                  className="bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => setEditingAdmin(false)}
                  disabled={isLoading}
                  className="bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-x-2 gap-y-3 mt-3">
            <AdminInput
              label="Admin ID"
              name="adminId"
              value={adminData.adminId}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="Department"
              name="department"
              value={adminData.department}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="Admin Role"
              name="adminRole"
              value={adminData.adminRole}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="City"
              name="city"
              value={adminData.city}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="State"
              name="state"
              value={adminData.state}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="Country"
              name="country"
              value={adminData.country}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="Address"
              name="address"
              value={adminData.address}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="Pin Code"
              name="pinCode"
              value={adminData.pinCode}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />

            <AdminInput
              label="Emergency Contact"
              name="emergencyContact"
              value={adminData.emergencyContact}
              editing={editingAdmin}
              onChange={handleAdminChange}
            />
          </div>
        </div>
      </div>

  

      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          open={isPasswordChangeModalOpen}
          onClose={() =>
            setIsPasswordChangeModalOpen(false)
          }
        />
      )}
    </>
  );
};



const InputField = ({
  label,
  name,
  value,
  editing,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1">
        {label}
      </label>

      <input
        type={name === "email" ? "email" : "text"}
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={!editing}
        className={`w-full px-2 py-1 border rounded ${
          editing
            ? "border-(--color-secondary)"
            : "border-gray-500"
        }`}
      />
    </div>
  );
};

// ================= ADMIN INPUT =================

const AdminInput = ({
  label,
  name,
  value,
  editing,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={!editing}
        className={`w-full px-2 py-1 border rounded bg-transparent ${
          editing
            ? "border-(--color-secondary)"
            : "border-gray-500"
        }`}
      />
    </div>
  );
};

export default AdminSetting;

