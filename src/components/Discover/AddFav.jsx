import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { map, set } from "zod";

const AddFav = ({ user, uri, song }) => {
  const [added, setAdded] = useState(null);
  const [track, settrack] = useState(null);

  const handleClickLike = async () => {
    await supabase.from("User_Favorites").insert([
      {
        type: `favSongs`,
        userSpotify: `${user}`,
        favorite_list: `${uri}`,
      },
    ]);
    setAdded(true);
    settrack(uri);
  };

  useEffect(() => {
    const data = localStorage.getItem(`${uri}`);
    if (data !== null) setAdded(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(track, JSON.stringify(added));
  }, [added, track]);

  const handleDelete = async () => {
    await supabase
      .from("User_Favorites")
      .delete()
      .match({ userSpotify: `${user}`, favorite_list: `${uri}` });
    setAdded(false);
  };

  return (
    <div>
      {added ? (
        <AiFillHeart onClick={handleDelete} size={23} />
      ) : (
        <AiOutlineHeart onClick={handleClickLike} size={23} />
      )}
    </div>
  );
};

export default AddFav;
