import React, { useEffect, useState, useContext } from "react";
import Api from "../../service/api";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Swal from "sweetalert2";
import CulinaryReviewContext from "../../contexts/CulinaryReviewContext";
import AuthContext from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext)
  const { profile, loading } = useContext(CulinaryReviewContext)
  
  if (!user) {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorized',
      text: 'Your session has expired. Please log in again.',
      confirmButtonText: 'Login',
      confirmButtonColor: '#3FA2F6',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl ">Loading...</h1>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto pt-20 px-4 py-8">
        <Link to="/" className="flex items-center gap-2 ml-4 mb-8 mt-8 text-blue-500 hover:text-blue-700">
          <AiOutlineArrowLeft size={20} />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {profile && (
            <>
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="rounded-full w-48 h-48 object-cover border border-black"
                />
              ) : (
                <img
                  src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                  alt={profile.full_name}
                  className="rounded-full w-48 h-48 object-cover border border-black"
                />
              )}            
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
