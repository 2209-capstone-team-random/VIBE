import React from "react";

const Edit = () => {
  return (
    <form action="" method="" id="editForm" className="flex justify-center">
      <div className="flex flex-col w-96 mt-20">
        <h1 className="flex justify-center text-2xl font-semi-bold mb-6">
          Edit Profile
        </h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Username</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Username</span>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Bio</span>
          </label>
          <label className="input-group input-group-vertical">
            <span>Bio</span>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
            ></textarea>
          </label>
        </div>
        <div className="grid justify-center">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your favorite genre #1</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Select Genre
              </option>
              <option>Rock</option>
              <option>Pop</option>
              <option>EDM</option>
              <option>Hip Hop</option>
              <option>Latin</option>
              <option>Indie</option>
              <option>Country</option>
              <option>R&B</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your favorite genre #2</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Select Genre
              </option>
              <option>Rock</option>
              <option>Pop</option>
              <option>EDM</option>
              <option>Hip Hop</option>
              <option>Latin</option>
              <option>Indie</option>
              <option>Country</option>
              <option>R&B</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your favorite genre #3</span>
            </label>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Select Genre
              </option>
              <option>Rock</option>
              <option>Pop</option>
              <option>EDM</option>
              <option>Hip Hop</option>
              <option>Latin</option>
              <option>Indie</option>
              <option>Country</option>
              <option>R&B</option>
            </select>
          </div>
          <div className="form-control">
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

export default Edit;
