import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, UpdateProfile } = useAuthStore();
  const { users, isUserLoading, getUsers } = useChatStore();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await UpdateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-10 flex justify-center ">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-10 border-t-2 border-b-2 border-r-2 border-l-2 border-black/10">

        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-black mb-6">Profile</h1>
          <div className="relative group">
            <img
              src={selectedImage || authUser?.profilepic || "/avatar.png"}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 object-cover border-white shadow-md transition duration-300 group-hover:scale-105"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer hover:scale-110 transition duration-200 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-6 h-6 text-black" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                disabled={isUpdatingProfile}
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {isUpdatingProfile && (
            <p className="text-green-500 mt-2 text-sm font-medium">Uploading...</p>
          )}
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-md ml-2 font-bold text-black mb-3">Username</h2>
            <div className="rounded-3xl px-4 py-2 bg-black/10 backdrop-blur-2xl text-black shadow-md ">
              {authUser?.username}
            </div>
          </div>
          <div>
            <h2 className="text-md ml-2 font-bold black mb-3">Email</h2>
            <div className="rounded-3xl px-4 py-2 bg-black/10 backdrop-blur-2xl text-black shadow-md ">
              {authUser?.email}
            </div>
          </div>
          <div>
            <h2 className="text-md ml-2 font-bold text-black mb-3">Account Status</h2>
            <div className="rounded-3xl px-4 py-2 bg-black/10 backdrop-blur-2xl text-green-600 shadow-md ">
              Active
            </div>
          </div>
          <div>
            <h2 className="text-md ml-2 font-bold text-black mb-3">Created At</h2>
            <div className="rounded-3xl px-4 py-2 bg-black/10 backdrop-blur-2xl text-black shadow-md ">
              {authUser?.createdAt &&
              new Date(authUser.createdAt).toLocaleDateString("en-US",{
                year:"numeric",
                month:"long",
                day:"numeric"
              })}
            </div>
          </div>
          
        </div>

        <div className="mt-6 ">
          <h1 className="mb-7 text-3xl font-semibold text-green-600">Friends </h1>
          {isUserLoading ? (
            <p className="text-gray-500">Fetching Friends...</p>
          ) : Array.isArray(users) && users.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-4 bg-teal-50  rounded-xl p-4 shadow-sm hover:shadow-md transition hover:scale-105 ease-in-out"
                >
                  <img
                    src={user.profilepic || "/avatar.png"}
                    alt={user.username}
                    className="w-14 h-14 rounded-full object-cover border border-white shadow"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{user.username}</p>
                    <p className="text-sm text-gray-500">Friend</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No friends found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
