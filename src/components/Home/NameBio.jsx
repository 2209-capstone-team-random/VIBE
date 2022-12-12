import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../redux/dbQueryThunks/user";

export default function NameBio({ session, userId }) {
  const dispatch = useDispatch();
  const display_name = session?.user.user_metadata.name;
  const [userData, setUserData] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("spotifyId", userId);
      setUserData(data);
    };
    getUser();

    const getImg = async () => {
      const { data, error } = await supabase
        .from("Profile_Image")
        .select("url")
        .eq("userSpotify", userId);
      setUserImg(data);
    };
    getImg();
  }, []);

  return (
    <div className="flex border border-blue-200 mx-10 bg-opacity/20 my-20 rounded-xl p-8 ">
      <div className="avatar online h-40 mt-3">
        <div className="rounded-full">
          <img src={userImg[0]?.url} />
        </div>
      </div>
      <div className="flex-col flex justify-center">
        <h2 className="font-semibold -right-[4%] relative text-3xl mb-4">
          {userData[0]?.display_name}
        </h2>
        <div className="mx-10 relative w-[40%] p-10 mb-10  text-lg">
          Bio : {userData[0]?.bio}
        </div>
      </div>
    </div>
  );
}
