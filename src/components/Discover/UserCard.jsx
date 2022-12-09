import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const UserCard = ({ user }) => {
  const [pic, setpic] = useState("");

  useEffect(() => {
    const getImage = async () => {
      const { data, error } = await supabase
        .from("Profile_Image")
        .select("url")
        .eq("userSpotify", `${user.userSpotify}`);
      setpic(data);
    };
    getImage();
  }, []);

  return (
    <div className="shadow-xl  p-4 m-4 mb-10 w-[200px] h-[250px] bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer bg-blue-100 hover:bg-blue-200">
      <div className="flex flex-wrap justify-center">
        <Link to={`/profile/${user.userSpotify}`}>
          <img
            className="shadow  p-2 bg-white w-auto rounded-full h-auto  border-none"
            src={pic}
          />
        </Link>
      </div>
      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-2xl truncate">{user.userSpotify}</p>

        <p className="test-sm truncate text-black-300 mt-1">
          {user.catA}.{user.catB}.{user.catC}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
