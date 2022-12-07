import React, { useState } from "react";
import { getCount } from "../../redux/dbQueryThunks/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { supabase } from "../../supabaseClient";

const Card = () => {
  const [categoryPicked, setCategoryPicked] = useState(0);
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const colors = [
    "bg-blue-500",
    "bg-pink-400",
    "bg-green-500",
    "bg-red-400",
    "bg-gray-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-blue-700",
  ];
  const getCards = async () => {
    try {
      let { data } = await supabase.from("Categories").select("*");
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getCount(categoryPicked));
    if (categories.length < 1) {
      getCards();
    }
  }, [categoryPicked]);

  const pickThreeCate = (event) => {
    if (categoryPicked < 3) {
      setCategoryPicked(categoryPicked + 1);
      setGenres([...genres, event.currentTarget.innerText]);
      if (genres.includes(event.currentTarget.innerText)) {
        setGenres(
          genres.filter((genre) => genre !== event.currentTarget.innerText)
        );
        setCategoryPicked(categoryPicked - 1);
      }
    } else {
      if (genres.includes(event.currentTarget.innerText)) {
        setGenres(
          genres.filter((genre) => genre !== event.currentTarget.innerText)
        );
        setCategoryPicked(categoryPicked - 1);
      }
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center absolute space-x-5 flex-wrap ">
        {categories.map((category, idx) => (
          <div
            key={category.id}
            className={
              genres.includes(category.name)
                ? `scale-125 ${colors[idx]} p-5 rounded-lg w-40 group `
                : `transition ease-in-out dcategoryay-0 ${colors[idx]} hover:scale-105 duration-300 p-5 rounded-lg w-40 group `
            }
            onClick={pickThreeCate}
          >
            <img src={category.img} className="w-full rounded shadow" />
            <h3 id="name" className="text-gray-200 font-bold mt-5">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
