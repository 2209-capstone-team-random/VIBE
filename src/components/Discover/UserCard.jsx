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
      setpic(data[0].url);
      console.log(data[0].url);
    };
    getImage();
  }, []);

  return (
    <div className="shadow-xl flex p-4 m-4 flex-col w-[200px] h-[250px] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer bg-black/10">
      <div className="flex flex-wrap justify-center">
        <Link to={`/${""}`}>
          <img
            className="shadow p-2 w-auto rounded-full h-auto  border-none"
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
