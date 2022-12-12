import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
const VibesList = ({ vibes, ownId }) => {
  const navigate = useNavigate();
  const [imgList, setImgList] = useState([]);
  const [dictionary, setDictionary] = useState({});
  // const [img, setImg] = useState("");

  // const getProfileImage = async (userSpotify) => {
  //   try {
  //     const { data: img } = await supabase
  //       .from("Profile_Image")
  //       .select("url")
  //       .eq({ userSpotify });
  //     setImg(img);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (vibes.length < 1) {
  //     let images = vibes.map((vibe) => {
  //       getProfileImage(vibe.vibeSpotify);
  //     });
  //     console.log(images);
  //   }
  // }, [vibes]);

  useEffect(() => {
    try {
      if (imgList.length < 1) {
        getImg();
      } else {
        const newObj = {};
        imgList.forEach((img) => {
          newObj[img.spotifyId] = img.Profile_Image[0]?.url;
        });
        setDictionary(newObj);
      }
    } catch (err) {
      console.log(err);
    }
  }, [imgList]);

  console.log("vibe", vibes);
  console.log("dictionary", dictionary);
  console.log("imglist", imgList);

  const getImg = async () => {
    const { data, error } = await supabase.from("User").select(`
    spotifyId,
    "Profile_Image" (
      url
    )
  `);
    setImgList(data);
  };

  return (
    <div className="  border-2 border-black m-10 p-5 dark:border-white">
      <ul className="menu bg-base-100 w-56 dark:bg-zinc-600 ">
        {vibes.map((vibe) => {
          return (
            <li key={vibe.id}>
              <a href={`../profile/${vibe.vibeSpotify}`}>
                <div className="avatar online ">
                  <div className="rounded-full h-12">
                    <img src={dictionary[vibe.vibeSpotify]} />
                  </div>
                </div>
                {vibe.vibeSpotify}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VibesList;
