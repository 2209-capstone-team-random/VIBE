import React, { useState } from "react";
import edm from "../../assets/edm.jpeg";
import Nirvana from "../../assets/nirvana.jpeg";
import taylor from "../../assets/taylor.jpeg";
import snoop from "../../assets/snoop.jpeg";
import latin from "../../assets/latin.jpeg";
import starboy from "../../assets/starboy.jpeg";
import { getCount } from "../../redux/dbQueryThunks/user";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const categories = [
  { id: 1, name: "ROCK", color: "bg-blue-500", img: Nirvana },
  { id: 2, name: "POP", color: "bg-pink-400", img: taylor },
  { id: 3, name: "EDM", color: "bg-green-500", img: edm },
  { id: 4, name: "HIP HOP", color: "bg-blue-700", img: snoop },
  { id: 5, name: "LATIN", color: "bg-orange-500", img: latin },
  {
    id: 6,
    name: "COUNTRY",
    color: "bg-red-400 ",
    img: "https://picsum.photos/id/65/250/250",
  },
  { id: 7, name: "R&B", color: "bg-red-500", img: starboy },
  {
    id: 8,
    name: "INDIE",
    color: "bg-gray-500",
    img: "https://picsum.photos/id/334/250/250",
  },
];

const Card = () => {
  const [categoryPicked, setCategoryPicked] = useState(0);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCount(categoryPicked));
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
                ? `scale-125 ${category.color} p-5 rounded-lg w-40 group `
                : `transition ease-in-out dcategoryay-0 ${category.color} hover:scale-105 duration-300 p-5 rounded-lg w-40 group `
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
