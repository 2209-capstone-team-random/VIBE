import React, { useState } from 'react';
import { getCount } from '../../redux/dbQueryThunks/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const Card = () => {
  const [catePicked, setCatePicked] = useState(0);
  const [categories, setCategories] = useState([]);
  const [genre, setGenre] = useState([]);
  const dispatch = useDispatch();

  const getCards = async () => {
    try {
      let { data } = await supabase.from('Categories').select('*');
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getCount(catePicked));
    console.log(catePicked);
    if (categories.length < 1) {
      getCards();
    }
  }, [catePicked, categories]);

  const pickThreeCate = (event) => {
    if (catePicked < 3) {
      setCatePicked(catePicked + 1);
      setGenre([...genre, event.currentTarget.innerText]);
      if (genre.includes(event.currentTarget.innerText)) {
        setGenre(genre.filter((el) => el !== event.currentTarget.innerText));
        setCatePicked(catePicked - 1);
      }
    } else {
      if (genre.includes(event.currentTarget.innerText)) {
        setGenre(genre.filter((el) => el !== event.currentTarget.innerText));
        setCatePicked(catePicked - 1);
      }
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center absolute space-x-5 flex-wrap ">
        {categories.map((el) => (
          <div
            key={el.id}
            className={
              genre.includes(el.cat)
                ? `scale-125 ${el.color} p-5 rounded-lg w-40 group `
                : `transition ease-in-out delay-0 ${el.color} hover:scale-105 duration-300 p-5 rounded-lg w-40 group `
            }
            onClick={pickThreeCate}
          >
            <img src={el.img} className="w-full rounded shadow" />
            <h3 id="name" className="text-gray-200 font-bold mt-5">
              {el.cat}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
