import React from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditProfile = ({ token, session }) => {
  const spotifyId = session?.user.user_metadata.sub;
  console.log(spotifyId);
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameForm = {};
    const bioForm = {};
    const submitForm = [nameForm, bioForm];

    if (e.target.display_name.value)
      nameForm.display_name = e.target.display_name.value;
    if (e.target.bio.value) bioForm.bio = e.target.bio.value;

    const updateForm = async () => {
      const { data, error } = await supabase
        .from('User')
        .update({ bio: bioForm.bio })
        .match({ spotifyId: spotifyId })
        .select();

      // const { data, error } = await supabase
      //   .from('User')
      //   .upsert([...submitForm], { upsert: true })
      //   .match({ spotifyId: spotifyId });
      console.log(data);
    };
    updateForm();
  };

  return (
    <form id="editForm" className="flex justify-center" onSubmit={handleSubmit}>
      <div className="flex flex-col w-96 mt-20">
        <h1 className="flex justify-center text-2xl font-semi-bold mb-6">
          Edit Profile
        </h1>
        <div className="form-control">
          <label className="input-group input-group-vertical">
            <span>Username</span>
            <input
              type="text"
              placeholder="Username"
              name="display_name"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control mt-4">
          <label className="input-group input-group-vertical">
            <span>Bio</span>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              name="bio"
            ></textarea>
          </label>
        </div>
        <div className="grid justify-center">
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Profile Pic</span>
            </label>
            <label className="input-group input-group-vertical">
              <input
                type="file"
                className="file-input file-input-bordered file-input-md w-full max-w-xs"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            form="editForm"
            value="Submit"
            className="btn btn-secondary w-60 mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
