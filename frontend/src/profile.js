import React, { useState } from "react";
function profile({ onComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    photo: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePhotoUpload = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    onComplete();
  };
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Build Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write a short bio"
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
              rows={3}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default profile;
