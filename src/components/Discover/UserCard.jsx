import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { set } from "zod";
import { supabase } from "../../supabaseClient";

const UserCard = ({ user }) => {
  const [pic, setpic] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const { data, error } = await supabase
        .from("Profile_Image")
        .select("url")
        .match({ userSpotify: `${user.userSpotify}` });
      if (!data.length) {
        console.error("no picture to show");
        setpic(null);
      }
      setpic(data[0].url);
    };
    getImage();
  });

  return (
    <Link to={`/profile/${user.userSpotify}`}>
      <div className="shadow-xl gap-3 p-5 m-4 mb-10 w-[200px] h-[280px] bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer bg-blue-100 hover:bg-blue-200 dark:bg-gray-600 dark:hover:bg-gray-500">
        <div className="flex flex-wrap avatar h-40 online justify-center">
          <img
            className="shadow  p-2 bg-white w-auto rounded-full h-auto  border-none"
            src={pic}
          />
        </div>
        <div className="mt-4 dark:text-white/90 flex flex-col pt-5 ">
          <p className="font-semibold text-2xl truncate">{user.userSpotify}</p>
          <p className="test-sm truncate text-black-300 mt-1">
            {user.catA}.{user.catB}.{user.catC}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
