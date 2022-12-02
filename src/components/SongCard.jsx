const SongCard = ({ track }) => {
  const activeSong = "test";
  return (
    <div className="flex p-4 flex-col w-[250px] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer bg-white/5">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong.name === track.name
              ? "flex bg-black bg-opacity-100"
              : "hidden"
          }`}
        ></div>
        <img src={track.album.images[0].url} />
      </div>
      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-lg truncate">{track.name}</p>
        <p className="test-sm truncate text-gray-300 mt-1">
          {track.artists[0].name}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
