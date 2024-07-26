import React, { useEffect, useState } from "react";
import Api from "../../service/api";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";

const Profile = () => {
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const response = await Api.get('/api/profile/me');
      setProfile(response.data.data);
    } catch (error) {
      console.error("Error can't get profile", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) {
    return Swal.showLoading();
  }

  if (!token) {
    return (
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
      })
    );
};

  return (
    <div className="container mx-auto mt-8 px-4 py-8">
      <Link to="/" className="flex items-center gap-2 ml-4 mb-8 mt-8 text-blue-500 hover:text-blue-700">
        <AiOutlineArrowLeft size={20} />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src={profile.avatar_url}
          alt={profile.full_name}
          className="rounded-full w-48 h-48 object-cover border border-black"
        />
        <p className="text-xl font-medium">{profile.full_name}</p>
        <p className="text-lg font-medium">Bio :</p>
        <p className="text-base">{profile.bio}</p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/edit-profile"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
