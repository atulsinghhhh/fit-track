import React, { useContext, useState, useEffect } from 'react';
import { authDataProvider } from '../Context/AuthContext';
import axios from 'axios';

function Profile() {
  const { user, baseUrl } = useContext(authDataProvider);

  const [formData, setFormData] = useState({
    fullName: '',
    weight: '',
    height: '',
    dailyCalorieTarget: '',
    goal: '',
    profilePic: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        weight: user.weight || '',
        height: user.height || '',
        dailyCalorieTarget: user.dailyCalorieTarget || '',
        goal: user.goal || '',
        profilePic: user.profilePic || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      setFormData((prev) => ({ ...prev, profilePic: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) form.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`${baseUrl}/auth/profile-update`, form, {
        withCredentials: true,
      });

      console.log('Profile updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-10 items-start">
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  typeof formData.profilePic === 'string'
                    ? formData.profilePic
                    : user?.profilePic
                }
                alt="Profile"
              />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-center">{user?.fullName}</h2>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="btn btn-outline btn-sm mt-4"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <div className="w-full md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-lg">{formData.fullName || '-'}</p>
              )}
            </div>

            <div className="form-control">
              {isEditing ? (
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-lg">{formData.weight || '-'} kg</p>
              )}
            </div>

            <div className="form-control">
              {isEditing ? (
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-lg">{formData.height || '-'} cm</p>
              )}
            </div>

            <div className="form-control">
              {isEditing ? (
                <input
                  type="number"
                  name="dailyCalorieTarget"
                  value={formData.dailyCalorieTarget}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-lg">{formData.dailyCalorieTarget || '-'} kcal</p>
              )}
            </div>

            <div className="form-control">
              {isEditing ? (
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              ) : (
                <p className="text-lg">{formData.goal || '-'}</p>
              )}
            </div>

            {isEditing && (
              <div className="form-control">
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleChange}
                  className="file-input file-input-bordered w-full"
                />
              </div>
            )}

            {isEditing && (
              <button type="submit" className="btn btn-primary w-full mt-4">
                Save 
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
