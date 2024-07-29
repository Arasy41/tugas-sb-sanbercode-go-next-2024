import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";
import CulinaryReviewContext from "../../contexts/CulinaryReviewContext";

const EditProfile = () => {
  const { 
    profile, 
    previewUrl, 
    handleFileChange, 
    handleChange, 
    handleSubmit, 
    loadingProfile 
  } = useContext(CulinaryReviewContext);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "You're not authorized",
        text: "Please login first",
        confirmButtonText: "Login",
        confirmButtonColor: "#3FA2F6",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  }, [token]);

  if (loadingProfile) {
    return Swal.showLoading();
  }

  return (
    <div className="container mx-auto mt-8 px-4 py-8">
      <Link to="/profile" className="flex items-center gap-2 ml-4 mb-8 mt-8 text-blue-500 hover:text-blue-700">
        <AiOutlineArrowLeft size={20} />
        Back to Profile
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto" encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="avatar">Avatar</label>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            id="avatar"
            name="avatar"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
