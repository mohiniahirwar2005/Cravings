import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";
import {
  MdOutlineAddAPhoto,
  MdOutlineLockReset,
} from "react-icons/md";
import PasswordChangeModal from "../commonModals/PasswordChangeModal";

const RiderSetting = () => {
  const { user, setUser } = useAuth();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingRider, setEditingRider] = useState(false);

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

  const [riderData, setRiderData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    drivingLicense: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    address: "",
    emergencyContact: "",
  });



  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleRiderChange = (e) => {
    const { name, value } = e.target;

    setRiderData((prev) => ({
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

      const response = await api.put("/user/edit-profile", payload);

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
        err.response?.data?.message || "Failed to update profile"
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

    setProfilePicPreview(URL.createObjectURL(file));
    setProfilePic(file);
  };

  

  const handleSaveRider = async () => {
    try {
      setIsLoading(true);

      // Backend API lagne ke baad endpoint change kar sakti ho
      // await api.put("/rider/edit-profile", riderData);

      setEditingRider(false);

      toast.success("Rider information updated successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update rider information"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-y-auto h-full p-6 space-y-2">

        {/* ================= PROFILE INFORMATION ================= */}

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

            {/* PROFILE IMAGE */}

            <div className="relative">

              <div className="w-20 h-20">

                {user?.photo?.url || profilePicPreview ? (
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
                    {user?.fullName?.charAt(0)?.toUpperCase() ||
                      "R"}
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

              <ProfileInput
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                editing={editingProfile}
                onChange={handleProfileChange}
              />

              <ProfileInput
                label="Email"
                name="email"
                value={formData.email}
                editing={false}
                onChange={handleProfileChange}
              />

              <ProfileInput
                label="Phone"
                name="phone"
                value={formData.phone}
                editing={editingProfile}
                onChange={handleProfileChange}
              />

            </div>

          </div>

        </div>

        {/* ================= RIDER INFORMATION ================= */}

        <div className="bg-(--color-base-200) rounded-lg p-4">

          <div className="flex justify-between items-center border-b border-gray-400 pb-2">

            <h3 className="text-lg font-semibold">
              Rider Information
            </h3>

            {!editingRider ? (
              <button
                onClick={() => setEditingRider(true)}
                className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
              >
                <MdEdit />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">

                <button
                  onClick={handleSaveRider}
                  disabled={isLoading}
                  className="bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => setEditingRider(false)}
                  className="bg-(--color-secondary) text-(--color-secondary-content) px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

          <div className="grid grid-cols-3 gap-x-2 gap-y-3 mt-3">

            <RiderInput
              label="Vehicle Number"
              name="vehicleNumber"
              value={riderData.vehicleNumber}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="Vehicle Type"
              name="vehicleType"
              value={riderData.vehicleType}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="Driving License"
              name="drivingLicense"
              value={riderData.drivingLicense}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="City"
              name="city"
              value={riderData.city}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="State"
              name="state"
              value={riderData.state}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="Pin Code"
              name="pinCode"
              value={riderData.pinCode}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="Address"
              name="address"
              value={riderData.address}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="Country"
              name="country"
              value={riderData.country}
              editing={editingRider}
              onChange={handleRiderChange}
            />

            <RiderInput
              label="Emergency Contact"
              name="emergencyContact"
              value={riderData.emergencyContact}
              editing={editingRider}
              onChange={handleRiderChange}
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




const ProfileInput = ({
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
        className={`w-full px-2 py-1 border rounded ${
          editing
            ? "border-(--color-secondary)"
            : "border-gray-500"
        }`}
      />

    </div>
  );
};




const RiderInput = ({
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
        value={value}
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

export default RiderSetting;

