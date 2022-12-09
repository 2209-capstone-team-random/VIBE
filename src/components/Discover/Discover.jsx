import React, { useState, useEffect } from 'react';
import { fetchTopTracks, fetchUserGenre } from '../../redux/Spotify/discover';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from './SongCard';
import UserCard from './UserCard';
import Player from '../Home/Player';
import { supabase } from '../../supabaseClient';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import NavBar from '../Home/Navbar';

const Discover = ({ token, session }) => {
  const user = session?.user?.user_metadata?.name;

  const dispatch = useDispatch();

  const [pickedGenre, setPickedGenre] = useState(null);
  const [categories, setCategories] = useState([]);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const fetchCatagories = async () => {
      const { data } = await supabase.from('Categories').select();
      setCategories(data);
    };

    dispatch(fetchUserGenre(displayName));
    dispatch(fetchTopTracks(pickedGenre, token));
    fetchCatagories();
  }, [pickedGenre]);

  const handleClick = async (genre) => {
    setPickedGenre(
      genre.name.toLowerCase() === 'r&b' ? 'r-n-b' : genre.name.toLowerCase()
    );
    setDisplayName(genre.name);
  };

  const { list } = useSelector((state) => state.discover);
  const { users } = useSelector((state) => state.discover);

  return (
    <div className="flex flex-col  ">
      <NavBar />
      <h2 className="font-semibold text-5xl justify-center flex m-3 p-3 text-left">
        Vibe Hive
      </h2>
      <div className="w-full shadow-xl bg-white dark:bg-white/20 p-10 flex flex-wrap justify-center sm:flex-row flex-col m-3 font-semibold">
        {genres.map((genre, i) => {
          return (
            <div
              key={i}
              onClick={() => handleClick(genre)}
              className={
                pickedGenre === genre.name
                  ? `scale-80  ${genre.color} p-5 rounded-lg w-40 group `
                  : `transition ease-in-out m-3 delay-0 ${genre.color} shadow-2xl hover:scale-105 duration-300 p-3 rounded-lg w-[130px] group `
              }
            >
              <img src={genre.img} className="w-full rounded shadow" />
              <h3 className="text-gray-200 font-semibold mt-5">
                {' '}
                {genre.name}
              </h3>
            </div>
          );
        })}
      </div>
      {users.length ? (
        <h2 className="p-3 animate-bounce mb-5 mt-11 text-5xl text-center font-bold">
          Future Vibees
        </h2>
      ) : (
        ''
      )}
      <div className={' overflow-hidden z-0'}>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className={
            !users.length
              ? 'flex m-10  p-3 mySwiper w-[80%]  rounded-2xl overflow-x-auto'
              : 'flex m-10 p-3 w-[80%]  mySwiper rounded-2xl shadow-xl bg-gray-100 overflow-x-auto'
          }
        >
          {users
            ? users.map((user, i) => {
                return (
                  <SwiperSlide key={i}>
                    <UserCard
                      className="flex px-4 py-16 bg-base-200"
                      key={i}
                      user={user}
                    />
                  </SwiperSlide>
                );
              })
            : ''}
        </Swiper>
      </div>
      <h2 className="animate-bounce mt-11 text-5xl text-center font-bold">
        {displayName}
      </h2>
      <div
        className={
          !list.tracks
            ? 'flex flex-wrap justify-center m-20 p-10 rounded-2xl gap-8'
            : 'flex flex-wrap justify-center m-20 p-10 rounded-2xl gap-8 bg-blue-100 shadow-2xl'
        }
      >
        {list.tracks
          ? list.tracks.map((track, i) => {
              return (
                <SongCard token={token} user={user} key={i} track={track} />
              );
            })
          : ''}
      </div>{' '}
      <div className="fixed w-full bottom-0 z-11 bg-blur text-white">
        <Player token={token} />
      </div>
    </div>
  );
};

export default Discover;
