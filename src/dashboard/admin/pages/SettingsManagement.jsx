import React, { useState } from 'react';

const SettingsManagement = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    visibility: 'public',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-8">
          User Profile Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Profile Information Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700">Change Password</label>
              <div className="mt-2 space-y-4">
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Current Password"
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm New Password"
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>

            {/* Profile Picture Section */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="mt-2 flex items-center space-x-6">
                <div className="h-28 w-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-white shadow-xl">
                  <img
                    src={profileImage || '#'}
                    alt="Profile preview"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 rounded-lg shadow-md text-sm font-medium text-white hover:from-blue-600 hover:to-blue-700 transition duration-300">
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-sm text-red-600 hover:text-red-700 transition duration-200"
                  >
                    Remove Photo
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500">JPG, PNG or GIF up to 2MB</p>
            </div>
          </div>

          {/* Account Settings Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Profile Visibility</h4>
                  <p className="text-sm text-gray-500">Control who can see your profile information</p>
                </div>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-200"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email updates about your account</p>
                </div>
                <button
                  type="button"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                >
                  Configure
                </button>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsManagement;
