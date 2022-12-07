import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const AddFav = ({ user, uri }) => {
  const [added, setAdded] = useState(null);
  const [song, setsong] = useState(null);

  const handleClickLike = async () => {
    await supabase.from("User_Favorites").insert([
      {
        type: `favSongs`,
        userSpotify: `${user}`,
        favorite_list: `${uri}`,
      },
    ]);
    setAdded(true);
  };

  const handleDelete = async () => {
    await supabase
      .from("User_Favorites")
      .delete()
      .match({ userSpotify: `${user}`, favorite_list: `${uri}` });
    setAdded(false);
  };
  useEffect(() => {}, [added, song]);
  console.log(song, added);
  return (
    <div>
      {added && song ? (
        <AiFillHeart onClick={handleDelete} size={23} />
      ) : (
        <AiOutlineHeart onClick={handleClickLike} size={23} />
      )}
    </div>
  );
};

export default AddFav;
