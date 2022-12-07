import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUri } from "../../redux/Spotify/discover";
import { FaPlayCircle, FaHeadphonesAlt } from "react-icons/fa";

const SongCard = ({ track, token }) => {
  const [activeSong, setactiveSong] = useState(null);
  const handlePlayClick = (track) => {
    dispatch(fetchUri(track.uri));
    setactiveSong(track.name);
  };

  const dispatch = useDispatch();
  const discover = useSelector((state) => state.discover);

  return (
    <div className="shadow-xl flex p-4 flex-col w-[250px] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg  bg-black/10">
      <div className="relative w-full h-56 group">
        <div
          onClick={() => handlePlayClick(track)}
          className={`cursor-pointer absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong === track.name && track.uri === discover.uri
              ? "flex bg-black bg-opacity-50"
              : "hidden"
          }`}
        >
          {activeSong === track.name && track.uri === discover.uri ? (
            <FaHeadphonesAlt
              size={25}
              className="text-gray-300 animate-bounce"
            />
          ) : (
            <FaPlayCircle size={30} className="text-gray-300" />
          )}
        </div>
        <img className="h-[224px]" src={track.album.images[0].url} />
      </div>
      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-lg truncate">{track.name}</p>
        <p className="test-sm truncate text-black-300 mt-1">
          {track.artists[0].name}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
